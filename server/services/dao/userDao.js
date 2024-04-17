const moment = require("moment");
const db = require("../db");

const md5 = require("md5");

const userDao = {};

userDao.getUserByUsername = async (username) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT * FROM users WHERE username = ?",
			[username],
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

userDao.getUserByEmail = async (email) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT * FROM users WHERE email = ?",
			[email],
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

userDao.createUser = async (userData) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const userObj = {
			...userData,
			password: md5(userData.password),
			registerDate: moment().format("YYYY-MM-DD HH:mm:ss"),
		};

		return await db.query("INSERT INTO users SET ?", userObj, "insert", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};
module.exports = userDao;
