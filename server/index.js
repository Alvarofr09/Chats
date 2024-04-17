const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./services/db");
const userRouter = require("./routers/userRoutes");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);

const conn = db.createConection();

const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
