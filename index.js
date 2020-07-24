var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');


var clients = 0;
const user1 = "Kamya"
const clientId = `Hey ${user1} welcome!`
io.on('connection', (socket) => {
    clients++;
    socket.emit('newclientconnect', {descrption: clientId});
    socket.broadcast.emit('newclientconnect', {descrption: clients + ' clients connected!'})
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        clients--;
        socket.broadcast.emit('newclientconnect',  {description: clients + ' clients connected!'} )
    })
  });

http.listen(3000, ()=>{
    console.log('Listening on *:3000');
});