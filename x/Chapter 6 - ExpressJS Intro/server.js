const express = require('express');
const app = express();

const path = require('path');
const PORT = process.env.PORT || 3500;

app.get('^/$|index(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
	res.redirect(301, 'new-page.html');
});

app.get(
	'/hello(.html)?',
	(req, res, next) => {
		console.log('Attempting to load hello.html');
		next();
	},
	(req, res) => {
		res.send('Hello World');
	}
);

const one = (req, res, next) => {
	setTimeout(() => {
		console.log('One');
		next();
	}, 1000);
};
const two = (req, res, next) => {
	setTimeout(() => {
		console.log('Two');
		next();
	}, 1000);
};
const three = (req, res) => {
	setTimeout(() => {
		console.log('Three');
		res.send('Finished');
	}, 1000);
};

app.get('/chaining(.html)?', [one, two, three]);
app.get('/*', (req, res) => {
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
