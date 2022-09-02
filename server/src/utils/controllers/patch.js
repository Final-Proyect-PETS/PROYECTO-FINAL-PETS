const User = require("../../models/users");
const Pets = require("../../models/pets");
const connection = require("../../db");

const patchPet = async (
  id,
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
  interestedUsers
) => {
  try {
    connection();
    const onePet = await Pets.findOne({ _id: id }).populate({
      path: "user",
      match: { deleted: false },
    });
    await onePet.update({
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
    });
    return onePet;
  } catch (err) {
    console.error(err);
  }
};

async function patchUser(
  id,
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
  reported_pets,
  reported_users
) {
  try {
    connection();
    const oneUser = await User.findOne({ _id: id }).populate({
      path: "pets",
      match: { deleted: false },
    });
    let userUpdate = oneUser;
    await userUpdate.update({
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
<<<<<<< HEAD
      reported_pets,
      reported_users,
=======
>>>>>>> 45c0bd01a026cdfbdbd7dc782dcc99a639f88d31
    });
    const userActualizado = User.findOne({ _id: id }).populate({
      path: "pets",
      match: { deleted: false },
    });
    return userActualizado;
  } catch (error) {
    console.error(error);
  }
}

const likePet = async (id) => {
  try {
    connection();
    const onePet = await Pets.findOne({ _id: id }).populate({
      path: "user",
      match: { deleted: false },
    });

    // await onePet.update({ $push: { likes: likes } });
    return onePet;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { patchPet, patchUser, likePet };
