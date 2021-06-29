import { Socket, Server } from 'socket.io';

class Sockets {

    constructor(
        private readonly io: Server,
    ) {
        this.handleSocketEvents();
    }

    handleSocketEvents(): void {
        // On connection
        this.io.on('connection', (socket: Socket) => {
            console.log('connected client: ', socket.id);
            socket.emit(
                'welcome',
                {
                    msg: 'Welcome to server',
                    date: new Date(),
                }
            );

            // listen event
            socket.on('message', (data: { msg: string }) => {
                console.log(data);

                // solo le emite al socket que emitio el mensaje
                // socket.emit('messages-from-server', { msg: data.msg });

                // emite a todos los clientes conectados al namespace
                this.io.emit('messages-from-server', { msg: data.msg });

            });

        });
    }

}

export {
    Sockets,
};