const moment = require("moment");
const db = require("../db");

const messageDao = {};

messageDao.addMessage = async (messageData) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const messageObj = {
			sender_id: messageData.from,
			receiver_id: messageData.to,
			text: messageData.text,
			date: moment().format("YYYY-MM-DD HH:mm:ss"),
		};

		return await db.query(
			"INSERT INTO messages SET ?",
			messageObj,
			"insert",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

messageDao.getUserById = async (id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT * FROM users WHERE id = ?",
			[id],
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

module.exports = messageDao;
