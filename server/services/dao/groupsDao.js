const db = require("../db");

const groupDao = {};

groupDao.createGroup = async (groupData) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const groupObj = {
			group_name: groupData.group_name,
			description: groupData.description,
			creation_date: moment().format("YYYY-MM-DD HH:mm:ss"),
		};

		return await db.query("INSERT INTO groups SET ?", groupObj, "insert", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

groupDao.addToGroup = async (membershipData) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const membershipObj = {
			group_id: membershipData.group_id,
			user_id: membershipData.user_id,
		};

		return await db.query(
			"INSERT INTO group_membership SET ?",
			membershipObj,
			"insert",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

groupDao.getAllGroups = async (user_id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const sqlQuery = `
      		SELECT groups.group_name, groups.description
      		FROM groups
      		JOIN group_membership ON groups.id_group = group_membership.id_group
      		JOIN users ON group_membership.id_user = users.id_user
     		WHERE users.id_user = ?
    	`;

		return await db.query(sqlQuery, user_id, "select", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

module.exports = groupDao;
