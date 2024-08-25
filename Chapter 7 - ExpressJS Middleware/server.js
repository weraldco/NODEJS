const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger, logEvents } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// Custom middleware
app.use(logger);

const whiteList = ['https://www.yoursite.com'];

const corsOptions = {
	origin: (origin, callback) => {
		if (whiteList.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	optionsSuccessStatus: 200,
};

// Allowed all the site from whitelist to access api from your site.
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// serve static files
// express.static('folder path')
app.use(express.static(path.join(__dirname, 'public')));

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

app.all('*', (req, res) => {
	res.status(404);
	if (req.accepts('html')) {
		res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
	} else if (req.accepts('json')) {
		res.json({ error: '404 Not found!' });
	} else {
		res.type('txt').send('404 Not found!');
	}
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
