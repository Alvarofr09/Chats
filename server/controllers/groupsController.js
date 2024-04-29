const dao = require("../services/dao/groupsDao");

const createGroup = async (req, res, next) => {
	try {
		const { group_name, description } = req.body;

		const groupData = {
			group_name,
			description,
		};

		const data = await dao.createGroup(groupData);

		if (!data)
			return res
				.status(500)
				.json({ message: "Error al enviar el mensaje", status: false });

		return res.json({ message: "Grupo creado correctamente", status: true });
	} catch (error) {
		next(error);
	}
};

const joinGroup = async (req, res, next) => {
	try {
		const { group_id, user_id } = req.body;

		const membershipData = {
			group_id,
			user_id,
		};

		const data = await dao.joinGroup(membershipData);

		if (!data)
			return res
				.status(500)
				.json({ message: "Error al enviar el mensaje", status: false });

		return res.json({ message: "Grupo creado correctamente", status: true });
	} catch (error) {
		next(error);
	}
};

const getAllGroups = async (req, res, next) => {
	try {
		const { user_id } = req.body;

		const groups = await dao.getAllGroups(user_id);

		if (groups.length === 0)
			return res
				.status(500)
				.json({ message: "No estas en ningun grupo", status: false });

		return res.json(groups);
	} catch (error) {
		next(error);
	}
};

module.exports = { createGroup, joinGroup, getAllGroups };
