let PORT = 8000;

let net = require('net');

var clients = [];

const requestHandler = (socket) => {
  socket.name = socket.remoteAddress + ":" + socket.remotePort
  socket.name = socket.name.slice(socket.name.indexOf('f:') + 2);
  if (!clients.includes(socket)) {
    clients.push(socket);
  } else {
    displayOnConsole(`${socket.name} has Taken`, socket)
  }

  socket.write("Welcome " + socket.name + "\n");
  displayOnConsole(`${socket.name} joined the chat`, socket);

  socket.on('data', function(data) {
    displayOnConsole(`${socket.name} > ${data}`, socket);
  });

  socket.on('end', function() {
    clients.splice(clients.indexOf(socket), 1);
    displayOnConsole(`${socket.name} left the chat.`, socket);
  });

};
const displayOnConsole = function(message, sender) {
  clients.forEach(function(client) {
    if (client === sender) {
      return
    };
    client.write(`${message}\n`);
  });
  process.stdout.write(`${message}\n`)
}

let server = net.createServer(requestHandler);
server.listen(PORT);
console.log(`Chat server running at port ${PORT}\n`);
