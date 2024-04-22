const dao = require("../services/dao/userDao");
const md5 = require("md5");
const path = require("path");

const userRegister = async (req, res, next) => {
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

const userLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		console.log(req.body);

		let user = await dao.getUserByEmail(email);
		if (user.length <= 0) return res.status(404).send("Usuario no registrado");

		const clientPassword = md5(password);
		[user] = user;

		if (user.password !== clientPassword) return res.sendStatus(401);

		delete user.password;

		res.status(201).json({ user, status: true });
	} catch (error) {
		next(error);
	}
};

const setAvatar = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const { image } = req.body;
		// let userData = await dao.getUserByEmail(userId);
		// [userData] = userData;

		if (image) {
			const images = !image.length ? [image] : image;

			const user = await dao.setAvatar(userId, image);

			if (!user) return res.json({ status: false });

			const userObj = {
				isAvatarImageSet: true,
				avatarImage: image,
			};

			const updatedUser = await dao.updateUser(userId, userObj);

			if (!updatedUser) return res.json({ status: false });

			let userData = await dao.getUserById(userId);
			[userData] = userData;

			return res.json({
				isSet: userData.isAvatarImageSet,
				image: userData.avatarImage,
			});
		}

		// if (user.isAvatarImageSet) return res.json({ isSet: true });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	userRegister,
	userLogin,
	setAvatar,
};
