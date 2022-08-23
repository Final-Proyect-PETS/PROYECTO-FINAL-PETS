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
const server = require("./src/app.js");
const connection = require("./src/db.js");

//ver forma de hacer un force true para mongoose

<<<<<<< HEAD
connection()
console.log("conectado");
=======
const connection = require("./src/db.js");
connection();
>>>>>>> 6a3a9205c5a19f3730b8b7568aab661a4f9346d6
server.listen(3001, () => console.log("listening at port 3001 "));
