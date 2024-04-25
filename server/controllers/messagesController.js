// const { SignJWT } = require("jose");
// const jwt = require("jsonwebtoken");
// const md5 = require("md5");
const dao = require("../services/dao/messagesDao");

const addMessage = async (req, res, next) => {
	try {
		const { from, to, text } = req.body;

		const messageData = {
			from,
			to,
			text: text,
		};

		const data = await dao.addMessage(messageData);

		if (!data)
			return res
				.status(500)
				.json({ message: "Error al enviar el mensaje", status: false });

		return res.json({ message: "Mensaje enviado correctamente", status: true });
	} catch (error) {
		next(error);
	}
};

const getAllMessages = async (req, res, next) => {};

module.exports = { addMessage, getAllMessages };
