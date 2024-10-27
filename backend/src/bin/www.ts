
import { NODE_PORT } from '@/core/env/variables.js';
import http from 'http';
import app from 'main.js';


app.set('port', NODE_PORT);

// Create HTTP server.

const server = http.createServer(app);

// Listen on provided port, on all network interfaces.

server.listen(NODE_PORT);
server.on('error', onError);
server.on('listening', onListening);

// Event listener for HTTP server "error" event.

interface SystemError extends Error {
  address?: string
  code: string
  dest?: string
  errno: number
  info?: object
  message: string
  path?: string
  port?: number
  syscall: string
}

function onError(error: SystemError) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind =
    typeof NODE_PORT === 'string' ? 'Pipe ' + NODE_PORT : 'Port ' + NODE_PORT;

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

// Event listener for HTTP server "listening" event.

async function onListening() {
  const addr = server.address();
  const bind =
    typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  console.log('Listening on ' + bind);
}

