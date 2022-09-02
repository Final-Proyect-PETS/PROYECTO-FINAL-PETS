const googlelogin = require("../utils/controllers/googlelogin");
const { Router } = require("express");
const router = Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");
const { NMAILER_PASSWORD2 } = process.env;
const client = new OAuth2Client(
  process.env.O_AUTH_CLIENT
);

router.post("/logingoogle", async (req, res, next) => {
  const { tokenId } = req.body;
  try {
    client
      .verifyIdToken({
        idToken: tokenId,
        audience:
          process.env.O_AUTH_CLIENT,
      })
      .then((response) => {
        const { email_verified, given_name, family_name, email, name } =
          response.payload;
        if (email_verified) {
          User.findOne({ email }).exec(async (err, user) => {
            if (err) {
              return res.status(400).json({
                error:
                  "Algo salio mal en el user.findOne linea 16 controllers/googlelogin",
                err,
              });
            } else {
              if (user) {
                let id = user._id;
                const token = jwt.sign({ id: id }, process.env.SECRET_KEY);
                res
                  .header("token", token)
                  .json({ error: null, data: { token }, id: { id } });
              } else {
                try {
                  let newUser = new User({
                    first_name: given_name,
                    last_name: family_name,
                    email: email,
                    username: name,
                  });let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                      user: "happytailshp@gmail.com",
                      pass: `${NMAILER_PASSWORD2}`,
                    },
                    tls: {
                      rejectUnauthorized: false,
                    },
                  });
              
                  let contentHTML = `
                  <img src = "https://cdn-icons-png.flaticon.com/512/194/194279.png" style="width:100px;"/>
                
                  <h1>Hola!, ${given_name} ${family_name}.🐰
                  🐻 Gracias por haber elegido Happy Tails para tus compañeros animales.🐵
                        🐈‍⬛Deseamos que todas tus mascotas encuentren su cola feliz.🐶 
                  Atentamente HT`;
              
                   await transporter.sendMail({
                    from: "'HappyTails'<happytailshp@gmail.com>",
                    to: email,
                    subject: "Bienvenido",
                    html: contentHTML,
                  });
                  await newUser.save();
                  let id = newUser._id;
                  const token = jwt.sign(
                    { id: newUser._id },
                    process.env.SECRET_KEY
                  );
                  
                  res
                    .header("token", token)
                    .json({ error: null, data: { token }, id: { id } });
                } catch (error) {
                  next(error);
                }
              }
            }
          });
        }
      });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
