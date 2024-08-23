const fs = require('fs');

if (!fs.existsSync('./new')) {
	fs.mkdir('./new', (err) => {
		if (err) throw err;
		console.log('New directory created..');
	});
} else {
	console.log('Directory already exist.');
	fs.rmdir('./new', (err) => {
		if (err) throw err;
		console.log('Directory remove completely..');
	});
}
