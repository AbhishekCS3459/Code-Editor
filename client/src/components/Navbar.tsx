import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CodeIcon from "@mui/icons-material/Code";
import { Badge, LinearProgress } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { showProgressSel } from "@/selectors/showProgressSel";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";

import { useSession, signIn, signOut } from "next-auth/react";
import { sign } from "crypto";
const menuOptions = ["Home", "Problems", "Contest", "Discuss", "Interview"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const DemoMessages = [
  {
    id: 1,
    user: "John Doe",
    value: "Hello World",
    timestamp: "2023-11-24T08:30:00",
    type: "text",
  },
  {
    id: 2,
    user: "ChatGPT",
    value: "Hi John! How are you today?",
    timestamp: "2023-11-24T08:32:00",
    type: "text",
  },
  {
    id: 3,
    user: "John Doe",
    value: "I'm doing well, thank you! How about you?",
    timestamp: "2023-11-24T08:35:00",
    type: "text",
  },
  {
    id: 4,
    user: "ChatGPT",
    value: "I'm just a computer program, but I'm here to assist you!",
    timestamp: "2023-11-24T08:37:00",
    type: "text",
  },
  {
    id: 5,
    user: "John Doe",
    value: "That's interesting! What can you do?",
    timestamp: "2023-11-24T08:40:00",
    type: "text",
  },
  {
    id: 6,
    user: "ChatGPT",
    value:
      "I can help answer questions, provide information, or just chat with you. Feel free to ask me anything!",
    timestamp: "2023-11-24T08:42:00",
    type: "text",
  },
  {
    id: 7,
    user: "John Doe",
    value: "That's awesome! Can you also do calculations?",
    timestamp: "2023-11-24T08:45:00",
    type: "text",
  },
  {
    id: 8,
    user: "ChatGPT",
    value:
      "Absolutely! I can handle various calculations, from simple arithmetic to more complex equations.",
    timestamp: "2023-11-24T08:47:00",
    type: "text",
  },
  {
    id: 9,
    user: "John Doe",
    value: "Great! Can you calculate the square root of 144?",
    timestamp: "2023-11-24T08:50:00",
    type: "text",
  },
  {
    id: 10,
    user: "ChatGPT",
    value: "Sure, the square root of 144 is 12.",
    timestamp: "2023-11-24T08:52:00",
    type: "text",
  },
  {
    id: 11,
    user: "ChatGPT",
    value: "Sure, the square root of 144 is 12.",
    timestamp: "2023-11-24T08:52:00",
    type: "text",
  },
  {
    id: 12,
    user: "ChatGPT",
    value: "Sure, the square root of 144 is 12.",
    timestamp: "2023-11-24T08:52:00",
    type: "text",
  },
  {
    id: 13,
    user: "ChatGPT",
    value: "Sure, the square root of 144 is 12.",
    timestamp: "2023-11-24T08:52:00",
    type: "text",
  },
  {
    id: 14,
    user: "ChatGPT",
    value: "Sure, the square root of 144 is 12.",
    timestamp: "2023-11-24T08:52:00",
    type: "text",
  },
];

function NavBar() {
  const router = useRouter();
  const { data: session } = useSession();

  const isProgressVisible = useRecoilValue(showProgressSel);
 
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [messages, setMessages] = React.useState<string[]>([]);
  const [isLogin, setIsLogin] = React.useState<string>("Login");
  const [inputMessage, setInputMessage] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string>(
    "/static/images/avatar/2.jpg"
  );

  const socket = new WebSocket("ws://localhost:3001");

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [ismessageBar, setIsMessageBar] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleMessagesMenu = (event: React.MouseEvent<HTMLElement>) => {
    setIsMessageBar(event.currentTarget);
  };

  const handleCloseNavMenu = (page: String) => {
    router.push(`/${page === "Home" ? "" : page.toLowerCase()}`);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseUserMessage = () => {
    setIsMessageBar(null);
  };
  React.useEffect(() => {
    // Connection opened
    const handleOpen = (event: any) => {
      console.log("WebSocket connected in client");
    };

    const handleMessage = (event: any) => {
      try {
        // Check if the connection is still open
        if (socket.readyState === WebSocket.OPEN) {
          console.log("message in client: ");
          const receivedMessage = event.data;

          console.log("Message from server: ", receivedMessage);

          setMessages((prevMessages) => [
            ...prevMessages,
            `Server: ${receivedMessage}`,
          ]);
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };

    const handleError = (error: any) => {
      console.error("WebSocket error:", error);
    };

    const handleClose = (event: any) => {
      console.log("WebSocket disconnected");
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);
    socket.addEventListener("error", handleError);
    socket.addEventListener("close", handleClose);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("error", handleError);
      socket.removeEventListener("close", handleClose);
      socket.close();
    };
  }, [messages]);
  React.useEffect(() => {
    if (session?.user) {
      setIsLogin("Logout");
      setImageUrl(session?.user?.image || "");
    } else {
      setIsLogin("Login");
    }
  }, [session?.user]);

  React.useEffect(() => {
    console.log("session");
    localStorage.setItem("user", JSON.stringify(session?.user));
    console.log(session?.user);
  }, []);
  return (
    <AppBar color="success" position="static" style={{}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CodeIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontWeight: "bold",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "orange",
              textDecoration: "none",
            }}
          >
            CHEATCODE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="warning"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {menuOptions.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu(page);
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <CodeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CHEATCODE {}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {menuOptions.map((page) => (
              <MenuItem
                key={page}
                onClick={() => {
                  handleCloseNavMenu(page);
                }}
                sx={{
                  mx: 4,
                  my: 2,
                  color: "white",
                  display: "block",
                }}
                className="hover:text-gray-400 font-extrabold font-sans text-lg hover:cursor-pointer hover:underline-offset-0"
              >
                {page}
              </MenuItem>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, gap: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={imageUrl} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open Messages">
              <Badge
                color="error"
                badgeContent={92}
                onClick={handleMessagesMenu}
              >
                <MailIcon />
              </Badge>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Button
                    onClick={() => {
                      if (!session?.user) {
                        signIn();
                      } else {
                        signOut();
                      }
                    }}
                  >
                    <Typography textAlign="center">
                      {setting === "Logout" ? isLogin : setting}
                    </Typography>
                  </Button>
                </MenuItem>
              ))}
            </Menu>
            <Menu
              sx={{ mt: "45px", overflow: "auto", maxHeight: "400px" }}
              id="notificatio-ebar"
              anchorEl={ismessageBar}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(ismessageBar)}
              onClose={handleCloseUserMessage}
            >
              {DemoMessages.map((messages) => (
                <MenuItem key={messages.id} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{messages.value}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <LinearProgress color="warning" hidden={isProgressVisible} />
    </AppBar>
  );
}
export default NavBar;
function setAnchorElNav(arg0: null) {
  throw new Error("Function not implemented.");
}
