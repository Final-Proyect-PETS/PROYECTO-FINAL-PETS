require("dotenv").config();

//DB connection
const mongoose = require("mongoose");

//Model
//const Persona = require("../src/models/Prueba");


module.exports = () => {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((e) => console.log("error de conexión", e));
};
