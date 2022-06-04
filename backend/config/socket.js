module.exports = (http) => {
    const connection = require('../database/db');
    const util = require('util');
    const query = util.promisify(connection.query).bind(connection);
    
    const io = require('socket.io')(http, {});
    var users = [];
     
        
    io.on('connection', (socket) => {
        // attach incoming listener for new user
        socket.on("user_connected", function (object) {
            // save in array
            users[object.usuarioSesion.toString()] = socket.id;

            // socket ID will be used to send message to individual person
    
            // notify all connected clients
            // io.emit("user_connected", object.nombre);
        });
        socket.on("send_message",async function (data) {
            // send event to receiver
            var socketId = users[data.usuarioQueRecibe];

            io.to(socketId).emit("new_message", data);
            await query(
                `INSERT INTO chat  (usuarioQueEnvia,usuarioQueRecibe,mensaje,fecha) VALUES (
               ${data.usuarioQueEnvia},'${data.usuarioQueRecibe}','${data.mensaje}','${data.date}');`
            )
        });
        

        // socket.on('disconnect', () => {
        //     console.log('User disconnected.');
        // });
    });
}