const express = require("express");
const {
	addMessage,
	getAllMessages,
	getAllGroupMessages,
	getGroupMessages,
} = require("../controllers/messagesController");

const messageRouter = express.Router();

messageRouter.post("/add-message", addMessage);

messageRouter.post("/getMessages", getAllMessages);
messageRouter.post("/getGroupMessages", getGroupMessages);

module.exports = messageRouter;
