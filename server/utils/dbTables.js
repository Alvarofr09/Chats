const db = require("../services/db");

const createUsersTable = async () => {
	let conn = await db.createConection();
	try {
		const SqlQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        username VARCHAR(255), 
        email VARCHAR(255), 
        password VARCHAR(255),
        userRole BOOLEAN DEFAULT FALSE,
        isImageSet BOOLEAN DEFAULT FALSE,
        image TEXT,
        seguidores INT DEFAULT 0,
        registerDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) `;
		await db.query(SqlQuery, null, "create", conn);
	} finally {
		await conn.end();
	}
};

const createGroupsTable = async () => {
	let conn = await db.createConection();
	try {
		const SqlQuery = `
        CREATE TABLE IF NOT EXISTS grupos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            group_name VARCHAR(255) ,
            description TEXT,
            price INT,
            image TEXT,
            creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ); `;
		await db.query(SqlQuery, null, "create", conn);
	} finally {
		await conn.end();
	}
};

const createMessagesTable = async () => {
	let conn = await db.createConection();
	try {
		const SqlQuery = `
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT,
        sender_id INT,
        receiver_id INT,
        group_id INT,
        text TEXT,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (sender_id) REFERENCES users(id),
        FOREIGN KEY (receiver_id) REFERENCES users(id),
        FOREIGN KEY (group_id) REFERENCES grupos(id)
      ) `;
		await db.query(SqlQuery, null, "create", conn);
	} finally {
		await conn.end();
	}
};

const createMembershipTable = async () => {
	let conn = await db.createConection();
	try {
		const SqlQuery = `
      CREATE TABLE IF NOT EXISTS grupos_membership (
        id INT AUTO_INCREMENT PRIMARY KEY,
        group_id INT,
        user_id INT,
        user_role BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (group_id) REFERENCES grupos(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      ); `;
		await db.query(SqlQuery, null, "create", conn);
	} finally {
		await conn.end();
	}
};

module.exports = {
	createUsersTable,
	createGroupsTable,
	createMessagesTable,
	createMembershipTable,
};
