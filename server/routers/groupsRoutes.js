const express = require("express");
const {
	createGroup,
	joinGroup,
	getAllGroups,
} = require("../controllers/groupsController");

const groupRouter = express.Router();

groupRouter.post("/create-group", createGroup);
groupRouter.post("/join-group", joinGroup);

groupRouter.get("/get-groups/:id", getAllGroups);

module.exports = groupRouter;
