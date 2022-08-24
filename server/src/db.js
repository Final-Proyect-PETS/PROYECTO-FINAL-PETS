require("dotenv").config();

//DB connection
const mongoose = require("mongoose");

//Model
//const Persona = require("../src/models/Prueba");

const uri = `mongodb+srv://${process.env.usuario}:${process.env.password}@${process.env.dbname}/?retryWrites=true&w=majority`;

module.exports = () => {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("conectado a mongodb uwu"))
    .catch((e) => console.log("error de conexión", e));
};
