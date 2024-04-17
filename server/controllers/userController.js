const dao = require("../services/dao/userDao");

const register = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		console.log(req.body);
		const usernameCheck = await dao.getUserByUsername(username);
		console.log(usernameCheck);

		if (usernameCheck.length < 0)
			return res
				.status(409)
				.json({ msg: "Username already in use", status: false });

		const emailCheck = await dao.getUserByEmail(email);
		if (emailCheck.length)
			return res
				.status(409)
				.json({ msg: "Email already in use", status: false });

		const newUser = {
			username,
			email,
			password,
		};

		const user = await dao.createUser(newUser);
		delete user.password;

		res.status(201).json({ user, status: true });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	register,
};
