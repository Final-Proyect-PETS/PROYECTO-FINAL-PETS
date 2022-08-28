const Pets = require("../../models/pets");
const User = require("../../models/users");
const connection = require("../../db");

const postPet = async (
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
  gender,
  interestedUsers,
) => {
  try {
    connection();
  } catch (error) {
    console.error(error);
  }
  try {
    const foundUser = await User.findById({ _id: id });

    const newPet = new Pets({
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
      interestedUsers,
      user: foundUser._id,
    });
    await newPet.save();
    foundUser.pets.push(newPet._id);
    await foundUser.save();
    return newPet;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { postPet };
