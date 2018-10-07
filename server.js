const WebSocket = require('ws');

let numClients = 0;

// start server
// https://github.com/websockets/ws
const wss = new WebSocket.Server({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: { // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    clientMaxWindowBits: 10, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
    // should not be compressed.
  },
});

// start connection with a client
// (this is invoked for each established connection)
wss.on('connection', (ws) => {
  const interval = 1500;
  let tmMessage = 0;

  // OK let's rock!
  // (invoked below actually)
  const init = () => {
    numClients += 1;
    console.log(`Connected. I have ${numClients} connection(s)!`);

    // send the first message
    ws.send(JSON.stringify({
      message: 'Hello!',
    }));

    // set up a time to send message occasionally
    tmMessage = setInterval(() => {
      // actual payload cannot be an object
      // so you have to convert it into string
      // (You have to be careful not to include invalid data in JSON)
      const payload = {
        message: `It is now ${new Date().toString()}`,
      };
      ws.send(JSON.stringify(payload));
    }, interval);
  };

  // clean up everything for this connection
  ws.on('close', () => {
    numClients -= 1;
    console.log(`Disconnected. I have ${numClients} connection(s)!`);
    clearTimeout(tmMessage);
  });

  init();
});

// just say something
console.log('Com\'on!');
