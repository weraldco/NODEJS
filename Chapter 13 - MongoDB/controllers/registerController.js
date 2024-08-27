const User = require('../model/Users');

const fsPromise = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd) {
		return res
			.status(400)
			.json({ message: `Error: username and password are required` });
	}
	const duplicate = await User.findOne({ username: user }).exec();
	if (duplicate) return res.sendStatus(409);
	try {
		const hashPwd = await bcrypt.hash(pwd, 10);
		const newUser = await User.create({
			username: user,
			password: hashPwd,
		});

		console.log(newUser);

		res.status(201).json({ success: `New user ${user} created!` });
	} catch (err) {
		res.status(500).json({ message: `${err.message}` });
	}
};

module.exports = { handleNewUser };
