#!/usr/bin/env node

/**
 * Module dependencies.
 */
var server ={};
var app = require('../app');
var debug = require('debug')('mockface:server');
var https = require('https');
var fs = require('fs');
var open = require('open');
var path = require("path");
/**
 * Get port from environment and store in Express.
 */
var options = {
    // key: fs.readFileSync(path.join(__dirname,"..", '/cert/rong.key')),
    // cert: fs.re adFileSync(path.join(__dirname,"..",'/cert/rong.crt'))
    key: fs.readFileSync(path.join(__dirname,"..", '/cert/privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname,"..", '/cert/certificate.crt')
};

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

server.serverstart = function(severport){

  var port = normalizePort(severport || '3000');

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

  app.set('port', port);

  
  server = https.createServer(options, app).listen(port, function() {
        console.log("https server is listening on port " + port);
        var targurl = "https://127.0.0.1:"+port        
        console.log(targurl);
        open(targurl);        
  });
  

  server.on('error', onError);
  server.on('listening', onListening);

}

module.exports = server;
