//                     __
//                   .'  '.
//               _.-'/  |  \
//  ,        _.-"  ,|  /  0 `-.
//  |\    .-"       `--""-.__.'=====================-,
//  \ '-'`        .___.--._)=========================|
//   \            .'      |                          |
//    |     /,_.-'        |        ADOPTEN ︻╦̵̵͇̿̿̿̿╤──    |
//  _/   _.'(             |           O              |
// /  ,-' \  \            |        MUERAN  ︻┳═ 一   |
// \  \    `-'            |                          |
//  `-'                   '--------------------------'
const http = require('http');
// const socketio = require('socket.io');
const server = require("./src/app.js");
const connection = require("./src/db.js");
const serverr = http.createServer(server);
const { Server } = require("socket.io");
const io = new Server(serverr, {cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: [],
    credentials: true, allowEIO3: true}, transport: ['websocket'] })
io.on('connection', (socket) => {
    console.log('New User Logged In with ID '+socket.id);
})

//ver forma de hacer un force true para mongoose


connection();
serverr.listen(3001, () => console.log("listening at port 3001 "));
