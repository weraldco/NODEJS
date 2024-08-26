const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger, logEvents } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const credetials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3500;

// Custom middleware
app.use(logger);

app.use(credetials);
// Allowed all the site from whitelist to access api from your site.
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

//middleware cookies
app.use(cookieParser());
// serve static files
// express.static('folder path')
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
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
