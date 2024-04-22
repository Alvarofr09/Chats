const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

const db = require("./services/db");
const userRouter = require("./routers/userRoutes");

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
			username VARCHAR(255), 
			text longtext, 
			PRIMARY KEY (id)
		) `;
		await db.query(SqlQuery, null, "create", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

// Instanciamos la libreria express-fileupload (para subir archivos)
app.use(
	fileUpload({
		createParentPath: true, // Crea la carpeta donde almacenamos las imagenes si no ha sido creada
		limits: { fieldSize: 20 * 1024 * 1024 }, // Limitamos el tamaño de la imagen a 20mb
		abortOnLimit: true, // Interrumpimos la subida de la imagen si excede el limite
		responseOnLimit: "Imagen demasiado grande", // Enviaremos un mensaje de respuesta cuando se interrumpe la carga
		uploadTimeout: 0, // Indicamos el tiempo de respuesta si se interrumpe la carga de la imagen
	})
);

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

createUsersTable();
createMessagesTable();

app.use("/api/auth", userRouter);

// const conn = db.createConection();

const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
