const { Router } = require("express");
const nodemailer = require("nodemailer");
const User = require("../models/users");
const router = Router();
const { NMAILER_PASSWORD2 } = process.env;

router.post("/sendemail", async (req, res) => {
  try {
    const { userId, ownerId, petId } = req.body;

    const user = await User.findOne({ _id: ownerId });

    if (
      user.interestedUsers.map(
        (e) => e[0]._id === userId && e[1]._id === petId
      ).length

    ) {
      console.log(user.interestedUsers.map(e => e[0]._id === userId && e[1]._id === petId).length)
      res.send("Ya mandaste la solicitud de adopcion");
    } else {
      const {
        owner_email,
        adopter_email,
        adopter_telephone,
        message,
        adopter_username,
        adopter_name,
        pet_name,
        link,
      } = req.body;

      let transporter = nodemailer.createTransport({
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

  <h1>El usuario <a href="${link}">${adopter_username}</a> esta interesado en adoptar a ${pet_name}.
              La informacion del usuario es la siguiente:</h1> 
              <ul>
              <li>Nombre: ${adopter_name}</li>
              <li> Email: ${adopter_email}</li>
              <li>Telefono: ${adopter_telephone}</li>
              </ul>
                              <p>${message}</p>
                              Atentamente HT`;



      let info = await transporter.sendMail({
        from: "'HappyTails'<happytailshp@gmail.com>",
        to: owner_email,
        subject: "Contacto de adopción",
        html: contentHTML,
      });

      console.log("message sent", info.messageId);
      res.send("OK");
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
