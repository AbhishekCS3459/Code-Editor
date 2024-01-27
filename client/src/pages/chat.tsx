// import React, { useState, useEffect } from "react";

// const WebSocketComponent: React.FC = () => {
//   const [messages, setMessages] = useState<string[]>([]);
//   const [inputMessage, setInputMessage] = useState<string>("");
//   const socket = new WebSocket("ws://localhost:3001");

//   useEffect(() => {
//     // Connection opened
//     const handleOpen = (event:any) => {
//       console.log("WebSocket connected in client");
//     };

//     const handleMessage = (event:any) => {
//       try {
//         // Check if the connection is still open
//         if (socket.readyState === WebSocket.OPEN) {
//           const receivedMessage = event.data;
//           console.log("Message from server: ", receivedMessage);
//           setMessages((prevMessages) => [
//             ...prevMessages,
//             `Server: ${receivedMessage}`,
//           ]);
//         }
//       } catch (error) {
//         console.error("Error processing message:", error);
//       }
//     };

//     const handleError = (error:any) => {
//       console.error("WebSocket error:", error);
//     };

//     const handleClose = (event:any) => {
//       console.log("WebSocket disconnected");
//     };

//     socket.addEventListener("open", handleOpen);
//     socket.addEventListener("message", handleMessage);
//     socket.addEventListener("error", handleError);
//     socket.addEventListener("close", handleClose);

//     // Clean up the WebSocket connection when the component unmounts
//     return () => {
//       socket.removeEventListener("open", handleOpen);
//       socket.removeEventListener("message", handleMessage);
//       socket.removeEventListener("error", handleError);
//       socket.removeEventListener("close", handleClose);
//       socket.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     // Send a message to the server
//     if (inputMessage.trim() !== "") {
//       const message = `Client: ${inputMessage}`;
//       console.log("Sending message: ", message);
//       setMessages((prevMessages) => [...prevMessages, message]);

//       try {
//         console.log("message in client: ", inputMessage)
//         socket.send(inputMessage);
//       } catch (error) {
//         alert("WebSocket error. Please refresh this page to reconnect.");
//         console.error("Error sending message:", error);
//       }

//       setInputMessage("");
//     }
//   };

//   return (
//     <div>
//       <div>
//         <h2>WebSocket Chat</h2>
//         <div>
//           {messages.map((message, index) => (
//             <div key={index}>{message}</div>
//           ))}
//         </div>
//       </div>
//       <div>
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default WebSocketComponent;
