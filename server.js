//Basic server setup
const PORT = process.env.PORT || 5000;
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
	console.log(" socket connected", socket.id);
});

server.listen(PORT, () => console.log("Listening on ", PORT));
