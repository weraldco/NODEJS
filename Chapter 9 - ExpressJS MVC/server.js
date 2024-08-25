const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger, logEvents } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

// Custom middleware
app.use(logger);

// Allowed all the site from whitelist to access api from your site.
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// serve static files
// express.static('folder path')
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

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
