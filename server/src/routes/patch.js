const { Router } = require("express");
const User = require("../models/users");
const Pets = require("../models/pets");
const { patchPet, patchUser } = require("../utils/controllers/patch.js");
const { send_mail } = require("../routes/send-email")
const verifyToken = require("../utils/middlewares/validateToken");
const nodemailer = require("nodemailer");
const { NMAILER_PASSWORD } = process.env;
const router = Router();

router.patch("/pets/:id", verifyToken, async (req, res, next) => {
  const _id = req.params.id;
  const {
    name,
    image,
    imagePool,
    type,
    description,
    size,
    age,
    vaccination,
    castrated,
    place,
    gender,
    isAdopted,
    deleted,
    interestedUsers,

  } = req.body;
  try {
    const petPatch = await patchPet(
      _id,
      name,
      image,
      imagePool,
      type,
      description,
      size,
      age,
      vaccination,
      castrated,
      place,
      gender,
      isAdopted,
      deleted,
      interestedUsers,
    );

    res.status(201).send(petPatch);
  } catch (error) {
    next(error);
  }
});

router.patch("/users/:id", verifyToken, async (req, res, next) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    image,
    telephone,
    about,
    deleted,
    interestedUsers,

  } = req.body;
  try {
    const userPatch = await patchUser(
      req.params.id,
      first_name,
      last_name,
      username,
      email,
      password,
      image,
      telephone,
      about,
      deleted,
      interestedUsers
    );
    res.status(201).send(userPatch);
  } catch (error) {
    next(error);
  }
});

router.patch("/adopt", verifyToken, async (req, res, next) => {
  try {
    const { petId, userId, ownerId } = req.body;
    const user = await User.findOne({ _id: userId });

    await Pets.updateOne({ _id: petId }, { $set: { user: userId, isAdopted: true } });
    await User.updateOne(
      { _id: userId },
      { $set: { pets: [...user.pets, petId] } }
    );
    await User.updateOne({ _id: ownerId }, { $pull: { pets: petId } });

    const newpet = await Pets.findOne({ _id: petId });
    const newuser = await User.findOne({ _id: userId });

    res.status(200).send("ADOPTED SSUCCESS");
  } catch (error) {
    next(error);
  }
});

router.patch("/interestedUsers", verifyToken, async (req, res, next) => {
  try {
    const { userId, ownerId, petAndUserIds, petId} = req.body

  const user = await User.findOne({ _id: ownerId });

     if ((user.interestedUsers.filter(e => e[0]._id === userId && e[1]._id === petId)).length){
    res.send("Ya mandaste la solicitud de adopcion")
    
  }else   {
    const {  owner_email,
      adopter_email,
      adopter_telephone,
      message,
      adopter_username,
      adopter_name,
      pet_name,
      link, } = req.body;
      console.log(req.body)
      
/*      await User.updateOne({ _id: user }, { $set: { interestedUsers:  userId } });  */ 
     await User.updateOne({_id: ownerId },  {$push: {interestedUsers: petAndUserIds} })
     await Pets.updateOne({_id: petId}, {$push: {interestedUsers: userId}})
/*      await User.updateOne({ _id: ownerId }, { $pull: { interestedUsers:  userId } });  */

    /* const newpet = await Pets.findOne({ _id: petId });
    const newuser = await User.findOne({ _id: userId }); */
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: "HAppYTAil5@hotmail.com",
        pass: `${NMAILER_PASSWORD}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  
    let contentHTML = `
      <img src = "https://cdn-icons-png.flaticon.com/512/194/194279.png" style="width:100px;"/>
  
      <h1>El usuario ${adopter_username} esta interesado en adoptar a ${pet_name}.
                  La informacion del usuario es la siguiente:</h1> 
                  <ul>
                  <li>Nombre: ${adopter_name}</li>
                  <li> Email: ${adopter_email}</li>
                  <li>Telefono: ${adopter_telephone}</li>
                  </ul>
                  <h4>si desea saber mas de ${adopter_name} puede comunicarse <a href="${link}">aqui</a>.
                      ${adopter_username} decidio redactar un mensaje
                                  <p>${message}</p>
                                  Atentamente HT`
                      
  
  
    let info = await transporter.sendMail({
      from: "'HappyTails'<HAppYTAil5@hotmail.com>",
      to: owner_email,
      subject: "Contacto de adopción",
      html: contentHTML,
    });
  
    console.log("message sent", info.messageId);
    res.send("OK");
  }
 } catch (error) {
    next(error);
  }});

module.exports = router;
