// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const clients = [];

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.push(ws);

  const clientsData = {size: wss.clients.size, type: "incomingClientConnect", key: uuidv4()};

  const clientsDataString = JSON.stringify(clientsData) //stringify the JSON object

  clients.forEach((client) => { //send the message to eag client
    if (client.readyState == ws.OPEN) {
      client.send(clientsDataString);
    }
  });

  console.log('testing testing 1 2 3: ',wss.clients.size);

  ws.on('message', function incoming(message) {
    const msgParse = JSON.parse(message); //take incoming msg string and parse it
    msgParse.key = uuidv4(); //add a unique key

    //console.log('User', msgParse.username, 'said', msgParse.content, 'key:', msgParse.key, 'type:', msgParse.type);

    if (msgParse.type === "postMessage") {
      msgParse.type = "incomingMessage"//change the type to "incomingMessage"
    } else if (msgParse.type === "postNotification") {
      msgParse.type = "incomingNotification"//change the type to "incomingNotification"
    }

    const msgString = JSON.stringify(msgParse) //stringify the JSON object

    clients.forEach((client) => { //send the message to eag client
      if (client.readyState == ws.OPEN) {
        client.send(msgString);
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    const clientsDisconnect = {size: wss.clients.size, type: "incomingClientDisconnect", key: uuidv4()};

    const clientsDisconnectString = JSON.stringify(clientsDisconnect) //stringify the JSON object

    clients.forEach((client) => { //send the message to eag client
      if (client.readyState == ws.OPEN) {
        client.send(clientsDisconnectString);
      }
    });
  });
});

