const connection = require("../db")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
const router = Router();

router.get("/", async (req, res, next) => {
    try {
        res.send("Hola mundo")
    } catch (error) {
        next(error);
    }
}),
    module.exports = router;