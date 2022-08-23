const jwt = require('jsonwebtoken')
require('dotenv').config()

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    const token = req.headers["token"]
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verified
        next()
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'token no es válido' })
    }
}

module.exports = verifyToken;