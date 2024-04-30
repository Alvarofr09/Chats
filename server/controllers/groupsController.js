const dao = require("../services/dao/groupsDao");

const createGroup = async (req, res, next) => {
	try {
		const { group_name, description, price } = req.body;

		const groupData = {
			group_name,
			description,
			price,
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
	//TODO: Hacer que un usuario no se pueda unir a un grupo dos veces
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

		return res.json({ message: "Te has unido al grupo", status: true });
	} catch (error) {
		next(error);
	}
};

const getAllGroups = async (req, res, next) => {
	try {
		const user_id = req.params.id;

		const groups = await dao.getAllGroups(user_id);

		if (groups.length === 0)
			return res.json({ message: "No estas en ningun grupo", status: true });

		return res.json(groups);
	} catch (error) {
		next(error);
	}
};

module.exports = { createGroup, joinGroup, getAllGroups };
