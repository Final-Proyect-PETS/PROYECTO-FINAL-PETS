const User = require("../../models/users");
const Pets = require("../../models/pets");
const connection = require("../../db");

const patchPet = async (
  id,
  name,
  image,
  type,
  description,
  size,
  age,
  vaccination,
  castrated,
  place,
  gender,
  isAdopted
) => {
  try {
    connection();
    const onePet = await Pets.findOne({ _id: id });
    await onePet.update({
      name,
      image,
      type,
      description,
      size,
      age,
      vaccination,
      castrated,
      place,
      gender,
      isAdopted,
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
  about
) {
  try {
    connection();
    const oneUser = await User.findOne({ _id: id });
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
    });
    const userActualizado = User.findOne({ _id: id }).populate("pets");
    return userActualizado;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { patchPet, patchUser };
