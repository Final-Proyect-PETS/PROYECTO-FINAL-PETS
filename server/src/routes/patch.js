const { Router } = require("express");
const User = require("../models/users");
const Pets = require("../models/pets");
const {
  patchPet,
  patchUser,
  likePet,
} = require("../utils/controllers/patch.js");
const { send_mail } = require("../routes/send-email");
const verifyToken = require("../utils/middlewares/validateToken");
const nodemailer = require("nodemailer");
const { NMAILER_PASSWORD2 } = process.env;
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
    place_longitude,
    place_latitude,
    gender,
    isAdopted,
    deleted,
    interestedUsers,
    likes,
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
      place_longitude,
      place_latitude,
      gender,
      isAdopted,
      deleted,
      interestedUsers,
      likes
    );

    res.status(201).send(petPatch);
  } catch (error) {
    next(error);
  }
});

router.patch("/users/:id", verifyToken, async (req, res, next) => {
  const _id = req.params.id;
  console.log(_id);
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    image,
    telephone,
    about,
    place,
    deleted,
    interestedUsers,
    place_longitude,
    place_latitude,
    blogmessage,
  } = req.body;
  console.log(req.body);
  try {
    const userPatch = await patchUser(
      _id,
      first_name,
      last_name,
      username,
      email,
      password,
      image,
      telephone,
      about,
      place,
      deleted,
      interestedUsers,
      place_longitude,
      place_latitude,
      blogmessage
    );
    console.log(userPatch);
    res.status(201).send(userPatch);
  } catch (error) {
    next(error);
  }
});

router.patch("/adopt", verifyToken, async (req, res, next) => {
  try {
    const { petId, userId, ownerId } = req.body;
    const user = await User.findOne({ _id: userId });

    await Pets.updateOne(
      { _id: petId },
      { $set: { user: userId, isAdopted: true } }
    );
    await User.updateOne(
      { _id: userId },
      { $set: { pets: [...user.pets, petId] } }
    );
    await User.updateOne({ _id: ownerId }, { $pull: { pets: petId } });

    const newpet = await Pets.findOne({ _id: petId });
    const oldOwner = await User.findOne({ _id: ownerId });
    const newOwner = await User.findOne({ _id: userId });
    console.log(oldOwner.email);
    console.log(newOwner.email);
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "happytailshp@gmail.com",
          pass: `${NMAILER_PASSWORD2}`,
        },
      });
      const mailOptions = {
        from: "'HappyTails'<happytailshp@gmail.com>",
        to: `${newOwner.email}`,
        subject: "Felicitaciones!",
        text: `Has adoptado correctamente a ${newpet.name}`,
      };
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error("Ha ocurrido un error", err);
        } else {
          console.error("Response", response);
          res.status(200).json("El email para la adopcion ha sido enviado");
        }
      });
    } catch (err) {
      console.error(err);
    }
    try {
      const transporter2 = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "happytailshp@gmail.com",
          pass: `bmkymaiygycduxmw`,
        },
      });
      const mailOptions2 = {
        from: "'HappyTails'<happytailshp@gmail.com>",
        to: `${oldOwner.email}`,
        subject: "Felicitaciones!",
        text: `Han adoptado correctamente a ${newpet.name}`,
      };
      transporter2.sendMail(mailOptions2, (err, response) => {
        if (err) {
          console.error("Ha ocurrido un error", err);
        } else {
          console.error("Response", response);
          res.status(200).json("El email para la adopcion ha sido enviado");
        }
      });
    } catch (err) {
      console.error(err);
    }
    res.status(200).send("ADOPTED SSUCCESS");
  } catch (error) {
    next(error);
  }
});

router.patch("/interestedUsers", verifyToken, async (req, res, next) => {
  try {
    const {
      userId,
      ownerId,
      petId,
      owner_email,
      adopter_email,
      adopter_telephone,
      message,
      adopter_username,
      adopter_name,
      pet_name,
      link,
    } = req.body;

    const user = await User.findById({ _id: ownerId });

    if (
      user.interestedUsers.filter(
        (e) => e.interestedUser === userId && e.petId === petId
      ).length
    ) {
      res.send("Ya mandaste la solicitud de adopcion");
    } else {
      const petAndUserIds = {
        interestedUser: userId,
        petId,
        viewState: false,
      };
      await User.updateOne(
        { _id: ownerId },
        { $push: { interestedUsers: petAndUserIds } }
      );

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
      res.send("OK");
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/viewing", async (req, res, next) => {
  const { id, interestedId, petId } = req.body;
  const { petId2, userId, ownerId } = req.body;

  if (interestedId) {
    const user = await User.findOne({ _id: id });
    let loquecambia = user.interestedUsers.filter(
      (e) => e.interestedUser === interestedId && e.petId === petId
    );
    loquecambia[0].viewState = true;
    let el_resto = user.interestedUsers
      .filter((e) => e.interestedUser !== interestedId || e.petId !== petId)
      .concat(loquecambia);

    await User.updateOne({ _id: id }, { $set: { interestedUsers: el_resto } });
  }
  if (ownerId) {
    const owner = await User.findOne({ _id: ownerId });
    let cambia = owner.likesPets.filter(
      (e) => e.likesPets === userId && e.petId2 === petId2
    );
    cambia[0].support = true;
    let resto = owner.likesPets
      .filter((e) => e.likesPets !== userId || e.petId2 !== petId2)
      .concat(cambia);
    await User.updateOne({ _id: ownerId }, { $set: { likesPets: resto } });
  }
  res.status(200).send("notification viewed");
});
//
router.patch("/likes", verifyToken, async (req, res, next) => {
  try {
    const { petId, userId, ownerId } = req.body;
    let user = await User.findOne({ _id: ownerId });
    console.log(req.body);
    if (
      user.likesPets.filter((e) => e.userId === userId && e.petId === petId)
        .length
    ) {
      res.status(403).send("Ya mandaste un like perro");
    } else {
      let support = false;
      const petAndUserIds = { userId, petId, support };
      await User.updateOne(
        { _id: ownerId },
        { $push: { likesPets: petAndUserIds } }
      );
      // let user2 = await User.findOne({ _id: ownerId });
      // await Pets.updateOne({ _id: petId }, { $push: { likes: petAndUserIds } });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/reportedPets", async (req, res, next) => {
  const { informer, reportedPet } = req.body;
  console.log(req.body.informer);
  res.send("ok");
});

router.patch("/reportedUsers", verifyToken, async (req, res, next) => {});

router.patch("/likepets", verifyToken, async (req, res, next) => {
  try {
    const { id, likeName } = req.body;
    const petPatch = await likePet(id); //likename=FLORE   pets.likes=[likename1,florre]

    if (!petPatch.likes.includes(likeName)) {
      await petPatch.update({ $push: { likes: likeName } });
    } else await petPatch.update({ $pull: { likes: likeName } });

    console.log(petPatch.likes);
    res.status(201).send(petPatch);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
