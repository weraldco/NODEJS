const logEvents = require('./logEvents');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

// Initialize object
const myEmitter = new MyEmitter();

// Add listener for the log
myEmitter.on('log', (msg) => logEvents(msg));

// Emit the event
setTimeout(() => {
	myEmitter.emit('log', 'My second log!');
}, 1000);
