class Sockets {
    constructor(io) {
        this.io = io;
        this.socketsEvents();
        // clientes = 
    }

    socketsEvents() {
        // this.io.engine.on("headers", (headers) => {
        //     headers["Access-Control-Allow-Private-Network"] = true;
        // })
        // io.engine.on("headers", (headers, request) => {
        //     if (!request.headers.cookie) return;
        // });
        // on conection
        this.io.on('connection', (socket) => {
            // console.log(socket.id);
            console.log('Cliente conectado');
        })
    }
}

export default Sockets;