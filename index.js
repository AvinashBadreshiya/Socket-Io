const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { socketbind } = require('./class/router.class');
io = module.exports = new Server(server);
loginClass = module.exports = require('./class/loginclass');
routerClass = module.exports = require('./class/router.class');
chatClass = module.exports = require('./class/chat.class');
const config = { DB_NAME : "socket" }
var MongoClient = require('mongodb').MongoClient;
MongoId=module.exports = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/'+config.DB_NAME; 
MongoClient.connect(url, function(err, client) {
    msgdb = module.exports = client.db(config.DB_NAME);
});
app.use('/assets', express.static(__dirname + '/assets'));


app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    routerClass.socketbind(socket);
    
    socket.on('disconnect',()=>{
        console.log('User Disconnect');
    });
});

server.listen(5000, () => {
    console.log('listening on *:5000');
});