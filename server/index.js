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
const connection = require("./src/db.js")

//ver forma de hacer un force true para mongoose
<<<<<<< HEAD
connection();
=======
const connection = require("./src/db.js");
connection(); 
>>>>>>> fd52d4a99d893ec847d7f71a13cb6eb2417ef60b
server.listen(3001, () => console.log("listening at port 3001 "));
