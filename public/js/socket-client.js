// script del lado del cliente cargado en su navegador web 

// referencias html
const lonline = document.querySelector('#lonline');
const loffline = document.querySelector('#loffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

// manejo del websocket cliente
console.log('inciando el guion');

const socket = io();

// listeners
socket.on('connect', () => {
    //console.log('conectado-cliente');
    lonline.style.fontSize = "x-large";
    loffline.style.fontSize = "initial";
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

socket.on('disconnect', () => {
    //console.log('desconectado-cliente');
    lonline.style.fontSize = "initial";
    loffline.style.fontSize = "x-large";
});

// listener del DOM
btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    // construyendo el objeto mensaje
    const payload = {
        mensaje,
        id: socket.id,
        fecha: new Date().getTime()
    };
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('para el server', id);
    });
});