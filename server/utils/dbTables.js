const createUsersTable = async () => {
	let conn = null;
	try {
		conn = await db.createConection();

		let SqlQuery = `
		CREATE TABLE IF NOT EXISTS users (
			id INT AUTO_INCREMENT, 
			username VARCHAR(255), 
			email VARCHAR(255), 
			password VARCHAR(255),
			userRole BOOLEAN DEFAULT FALSE,
			superAdmin BOOLEAN DEFAULT FALSE,
			isAvatarImageSet BOOLEAN DEFAULT FALSE,
			avatarImage longtext,
			registerDate datetime,
			updateDate datetime,
			PRIMARY KEY (id)
		) `;
		await db.query(SqlQuery, null, "create", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

const createMessagesTable = async () => {
	let conn = null;
	try {
		conn = await db.createConection();

		let SqlQuery = `
		CREATE TABLE IF NOT EXISTS messages (
    		id INT AUTO_INCREMENT, 
    		sender_id INT, 
    		receiver_id INT,
			group_id INT,
    		text LONGTEXT,
    		date DATETIME, 
    		PRIMARY KEY (id),
    		FOREIGN KEY (sender_id) REFERENCES users(id),
    		FOREIGN KEY (receiver_id) REFERENCES users(id),
			FOREIGN KEY (group_id) REFERENCES groups(id)
		) `;
		await db.query(SqlQuery, null, "create", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

const createGroupsTable = async () => {
	let conn = null;
	try {
		conn = await db.createConection();

		let SqlQuery = `
		CREATE TABLE IF NOT EXISTS groups (
    		id INT AUTO_INCREMENT PRIMARY KEY,
    		group_name VARCHAR(255) NOT NULL,
    		description TEXT,
    		creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		); `;
		await db.query(SqlQuery, null, "create", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

const createMembershipTable = async () => {
	let conn = null;
	try {
		conn = await db.createConection();

		let SqlQuery = `
		CREATE TABLE IF NOT EXISTS group_membership (
    		id INT AUTO_INCREMENT PRIMARY KEY,
    		group_id INT,
    		user_id INT,
    		FOREIGN KEY (id_group) REFERENCES groups(id),
    		FOREIGN KEY (id_user) REFERENCES users(id)
		); `;
		await db.query(SqlQuery, null, "create", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

module.exports = {
	createUsersTable,
	createMessagesTable,
	createGroupsTable,
	createMembershipTable,
};
