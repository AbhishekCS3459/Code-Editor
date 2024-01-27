import express from "express";
import cors from "cors";
import http from "http";
import WebSocket from "ws";
import { Server as WebSocketServer } from "ws";
import javaRouter from "./route/run-java";
import pythonRouter from "./route/run-python";
import cppRouter from "./route/run-cpp";
import cRouter from "./route/run-c";
import javascriptRouter from "./route/run-javascript";
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
const app = express();
const PORT = 3001 || process.env.PORT;

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
var idx = 0;
// wss.on("connection", (ws) => {
//   console.log("New client connected");
//   // Event listener for messages from clients
//   ws.on("message", (message) => {
//     // Broadcast the message to all connected clients
//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         setInterval(() => {
//           client.send(
//             JSON.stringify(DemoMessages[idx++ % DemoMessages.length])
//           );
//         }, 1000 * 5);
//       }
//     });
//   });
//   wss.on("close", () => {
//     console.log("Client disconnected");
//   });
// });

// Set up your Express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", javaRouter);
app.use("/", pythonRouter);
app.use("/", cppRouter);
app.use("/", cRouter);
app.use("/", javascriptRouter);
app.get("/", (req, res) => {
  res.json({ message: "ok tested" });
});

// Start both the Express and WebSocket servers on the same port
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
