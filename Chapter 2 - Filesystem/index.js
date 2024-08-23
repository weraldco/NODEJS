const fs = require('fs');
const path = require('path');
fs.readFile(
	path.join(__dirname, 'files', 'starter.txt'),
	'utf8',
	(err, data) => {
		if (err) throw err;
		console.log(data.toString());
	}
);

fs.writeFile(
	path.join(__dirname, 'files', 'reply.txt'),
	'Nice to meet you',
	(err) => {
		if (err) throw err;
		console.log('Write Complete');

		fs.appendFile(
			path.join(__dirname, 'files', 'reply.txt'),
			'\n\nYes it is!',
			(err) => {
				if (err) throw err;
				console.log('Append complete!');
			}
		);

		fs.rename(
			path.join(__dirname, 'files', 'reply.txt'),
			path.join(__dirname, 'files', 'newReply.txt'),
			(err) => {
				if (err) throw err;
				console.log('Rename complete!');
			}
		);
	}
);

process.on('uncaughtException', (err) => {
	console.log(`There was an uncaught error: ${err}`);
	process.exit(1);
});
