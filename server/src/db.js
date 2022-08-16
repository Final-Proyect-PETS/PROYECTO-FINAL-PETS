require("dotenv").config();


//DB connection
const mongoose = require("mongoose");

//Model
//const Persona = require("../src/models/Prueba");

const usuario = "PFHENRY_user"
const password = "BlljBxfxHrJSnYyY"

const uri = `mongodb+srv://${usuario}:${password}@cluster0.zcau31k.mongodb.net/?retryWrites=true&w=majority`;


module.exports = () => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('conectado a mongodb'))
        .catch(e => console.log('error de conexión', e))
}