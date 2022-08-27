const Pets = require("../../models/pets");
const User = require("../../models/users");
const connection = require("../../db");

const getPets = async (name) => {
  try {
    connection();
  } catch (err) {
    console.error(err);
  }
  try {
    const arrayPets = await Pets.find({ deleted: false }).populate({
      path: "user",
      match: { deleted: false },
    });
    if (name) {
      let petFound = arrayPets.filter(
        (p) =>
          p.name?.toLowerCase().includes(name.toLowerCase()) ||
          p.place?.toLowerCase().includes(name.toLowerCase()) ||
          p.type?.toLowerCase().includes(name.toLowerCase()) ||
          p.age?.toString().includes(name)
      );
      if (petFound.length > 0) return petFound;
      if ((petFound.length = 0))
        return "No se encontrar coincidencias con tu busqueda";
      else return arrayPets;
    } else {
      return arrayPets;
    }
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async (name) => {
  try {
    connection();
  } catch (err) {
    console.error(err);
  }
  try {
    const arrayUsers = await User.find({ deleted: false }).populate({
      path: "pets",
      match: { deleted: false },
    });
    if (name) {
      let userFound = arrayUsers.filter(
        (u) =>
          u.username?.toLowerCase().includes(name.toLowerCase()) ||
          u.first_name?.toLowerCase().includes(name.toLowerCase()) ||
          u.last_name?.toLowerCase().includes(name.toLowerCase()) ||
          u.email?.toLowerCase().includes(name.toLowerCase()) ||
          u.place?.toLowerCase().includes(name.toLowerCase())
      );
      if (userFound.length > 0) return userFound;
      if ((userFound.length = 0))
        return "No se encontraron coincidencias con la busqueda";
      else return arrayUsers;
    } else {
      return arrayUsers;
    }
  } catch (error) {
    console.error(error);
  }
};

const userId = async (id) => {
  try {
    connection();
  } catch (err) {
    console.error(err);
  }
  try {
    const arrayUsers = await User.findOne({ _id: id, deleted: false }).populate(
      { path: "pets", match: { deleted: false } }
    );
    return arrayUsers;
  } catch (error) {
    console.error(error);
  }
};

const petId = async (id) => {
  try {
    connection();
  } catch (err) {
    console.error(err);
  }
  try {
    const pet = await Pets.findOne({ _id: id, deleted: false }).populate({
      path: "user",
      match: { deleted: false },
    });
    return pet;
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  getPets,
  getUsers,
  userId,
  petId,
};
