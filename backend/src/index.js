import app from './app.js';

const http = require("http");
const server = http.createServer(app);
const port = 3000;

server.listen(port);
console.log('Server on port ' + port);