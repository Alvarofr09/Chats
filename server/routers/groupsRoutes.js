const express = require("express");
const {
	createGroup,
	addToGroup,
	getAllGroups,
} = require("../controllers/groupsController");

const groupRouter = express.Router();

groupRouter.post("/create-group", createGroup);
groupRouter.post("/add-to-group", addToGroup);
groupRouter.post("/get-groups", getAllGroups);

module.exports = groupRouter;
