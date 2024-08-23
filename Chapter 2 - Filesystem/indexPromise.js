const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
	try {
		const data = await fsPromises.readFile(
			path.join(__dirname, 'files', 'starter.txt'),
			'utf8'
		);
		console.log(data);

		await fsPromises.writeFile(
			path.join(__dirname, 'files', 'replyPromise.txt'),
			'Hey man dude!'
		);
		await fsPromises.appendFile(
			path.join(__dirname, 'files', 'replyPromise.txt'),
			data
		);

		await fsPromises.rename(
			path.join(__dirname, 'files', 'replyPromise.txt'),
			path.join(__dirname, 'files', 'promiseReply.txt')
		);
	} catch (err) {
		console.error(err);
	}
};
fileOps();
