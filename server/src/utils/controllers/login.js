require('dotenv').config()
const jwt = require("jsonwebtoken");
const User = require("../../models/users");


async function login(email, password) {
    const user = await User.findOne({ email: email });
    if (!user) return "Usuario no encontrado"
    const passwordIsValid = await user.comparePassword(password, user.password);
    if (!passwordIsValid) return "Contraseña incorrecta"
    const token = jwt.sign({ id: user._id, }, process.env.SECRET_KEY);
    return token
}

module.exports = login 