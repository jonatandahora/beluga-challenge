const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const redis = require('redis');
const redisClient = redis.createClient();
const multer  = require('multer')
const upload = multer({ inMemory: true})
const csv = require('csvtojson');
var server = require('http').createServer(app);
const io = require('socket.io')(server);

// handle redis errors
redisClient.on('error', (err) => {
  console.log('Error ' + err);
});

// middleware to add socket to res
app.use((req, res, next) => {
  res.io = io;
  next();
});

// parse and save csv to redis
app.post('/upload', upload.single('dataset'), (req, res, next) => {
  csv()
  .fromString(req.file.buffer.toString().toLowerCase())
  .on('end_parsed', (json) => {
    json = json.map((item) => {
      if (item.metric === 'cost') {
        item.value = item.value * -1;
      }
      return item;
    });
    redisClient.set('dataset', JSON.stringify(json))
    res.send(json)
  })
})

// websocket connection
io.on('connection', (socket) => {
  socket.on('dataset:load', (msg) => {
    redisClient.get('dataset', (err, reply) => {
      if(reply != null){
        var dataset = JSON.parse(reply.toString())
        socket.emit('dataset:loaded', dataset)
      }
    });
  })
  socket.on('filters:changed', (filters) => {
    redisClient.get('filters', (err, reply) => {
      if(reply != null){
        let filterString = filters.toString()
        if (reply != filterString) {
          socket.broadcast.emit('filters:updated', filters)
          redisClient.set('filters', JSON.stringify(filters))
        }
      } else{
        redisClient.set('filters', JSON.stringify(filters))
      }
    });
  })
});

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = server;
