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
      reported_pets,
      reported_users,
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

const findPet = async (findPet) => {
  try {
    connection();
    const onePet = await Pets.findOne({ _id: findPet });
    return onePet;
  } catch (error) {
    console.error(error);
  }
};

const findUser = async (findUser) => {
  try {
    connection();
    const oneUser = await User.findOne({ _id: findUser });
    return oneUser;
  } catch (error) {
    console.error(error);
  }
};

const getAdmins = async () => {
  try {
    connection();
  } catch (err) {
    console.error(err);
  }
  try {
    const arrayUsers = await User.find({ deleted: false });
    let adminsFound = arrayUsers.filter((u) => u.isAdmin);
    if (adminsFound.length > 0) return adminsFound;
    if ((adminsFound.length = 0))
      return "No se encontraron coincidencias con la busqueda";
    else return arrayUsers;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { patchPet, patchUser, likePet, findPet, findUser, getAdmins };
