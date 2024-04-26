const express = require("express");
const {
	addMessage,
	getAllMessages,
} = require("../controllers/messagesController");

const messageRouter = express.Router();

messageRouter.post("/add-message", addMessage);

messageRouter.post("/getMessages", getAllMessages);

module.exports = messageRouter;
