const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data;
	},
};

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
	const duplicate = usersDB.users.find((u) => u.username === user);
	if (duplicate) return res.sendStatus(409);

	try {
		const hashPwd = await bcrypt.hash(pwd, 10);
		const newUser = { username: user, password: hashPwd };
		usersDB.setUsers([...usersDB.users, newUser]);

		await fsPromise.writeFile(
			path.join(__dirname, '..', 'model', 'users.json'),
			JSON.stringify(usersDB.users)
		);
		console.log(usersDB.users);
		res.status(201).json({ message: `New user ${user} has been registered.` });
	} catch (err) {
		res.status(500).json({ message: `${err.message}` });
	}
};

module.exports = { handleNewUser };
