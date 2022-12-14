require("dotenv").config();

//DB connection
const mongoose = require("mongoose");

//Model
//const Persona = require("../src/models/Prueba");

const uri = `mongodb+srv://${process.env.DB_USUARIO}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}/?retryWrites=true&w=majority`;

module.exports = () => {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((e) => console.log("error de conexión", e));
};
