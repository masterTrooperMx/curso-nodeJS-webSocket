

const socketController = (client) => {
    console.log('cliente conectado', client.id);

    client.on('enviar-mensaje', (data, fun) => { 
        const id = 12345;
        fun(id); 
        // enviar mensaje
        client.broadcast.emit('enviar-mensaje', data);
    });

    client.on('disconnect', () => { 
        console.log('cliente desconectado', client.id); 
    });
};

module.exports = {
    socketController
}