const express = require("express");
const {
	addMessage,
	getAllMessages,
} = require("../controllers/messagesController");

const messageRouter = express.Router();

messageRouter.post("/add-message", addMessage);

messageRouter.post("/getmessages", getAllMessages);

module.exports = messageRouter;
