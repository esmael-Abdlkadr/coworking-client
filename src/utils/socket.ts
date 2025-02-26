import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
// "https://coworking-api-abys.onrender.com";
const socket = io(socketUrl, {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  timeout: 10000,
});

socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from Socket.IO server");
});

export default socket;
