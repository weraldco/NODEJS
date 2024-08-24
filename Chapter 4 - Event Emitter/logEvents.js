const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

//Create logfiles .txt
const logEvents = async (message) => {
	const currentDate = format(new Date(), 'MM-dd-yyyy\tHH:mm:ss\t');
	const id = uuid();
	try {
		if (!fs.existsSync('./logs')) {
			await fsPromises.mkdir('./logs');
		}
		await fsPromises.appendFile(
			path.join(__dirname, 'logs', 'logs.txt'),
			`${currentDate}\t${id}\t${message}\n`
		);

		console.log('Log successfully created!');
	} catch (err) {
		console.error(err);
	}
};

module.exports = logEvents;
