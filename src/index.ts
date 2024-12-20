import WebSocket, {WebSocketServer} from "ws";
import http from 'http';

const server = http.createServer((req:any,res:any) => {
    console.log(`${new Date()} + received request for ${req.url}`);
    res.end("Hi server");
})

const wss = new WebSocketServer({server});

let userCount = 0;

wss.on('connection', function connection(socket){
    socket.on('error', console.error);

    socket.on('message', function message(data, isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data,{binary: isBinary});
            }
        });
    });

    socket.on('close',() => {
        --userCount;
    })
    
    console.log('userConnected', ++userCount);
    socket.send("Hello! Message from Server");
})

server.listen(8080, () => {
    console.log((new Date()) + 'Server is listening on port 8080');
})