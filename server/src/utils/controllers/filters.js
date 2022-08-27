const Pets = require("../../models/pets");
const connection = require("../../db");

async function filtro(
  age,
  creation_date,
  vaccinated,
  castrated,
  location,
  pet_type,
  pet_size,
  gender,
  is_adopted,
) {
  connection();
  try {
    let all = await Pets.find({ deleted: false }).populate({
      path: "user",
      match: { deleted: false },
    });

    if (age === "young") {
      all = all.filter((ev) => ev.age < 6);
    }
    if (age === "adult") {
      all = all.filter((ev) => ev.age > 5 && ev.age < 10);
    }
    if (age === "old") {
      all = all.filter((ev) => ev.age > 9);
    }
    if (castrated === "true") {
      all = all.filter((ev) => ev.castrated === true);
    }
    if (castrated === "false") {
      all = all.filter((ev) => ev.castrated === false);
    }
    if (pet_size === "big") {
      all = all.filter((ev) => ev.size === "big");
    }
    if (pet_size === "medium") {
      all = all.filter((ev) => ev.size === "medium");
    }
    if (pet_size === "small") {
      all = all.filter((ev) => ev.size === "small");
    }
    if (pet_type === "cat") {
      all = all.filter((ev) => ev.type === "cat");
    }
    if (pet_type === "dog") {
      all = all.filter((ev) => ev.type === "dog");
    }
    if (pet_type === "other") {
      all = all.filter((ev) => ev.type === "other");
    }
    if (vaccinated === "yes") {
      all = all.filter((ev) => ev.vaccination === "yes");
    }
    if (vaccinated === "no") {
      all = all.filter((ev) => ev.vaccination === "no");
    }
    if (vaccinated === "unknown") {
      all = all.filter((ev) => ev.vaccination === "unknown");
    }
    if (gender === "female") {
      all = all.filter((ev) => ev.gender === "female");
    }
    if (gender === "male") {
      all = all.filter((ev) => ev.gender === "male");
    }
    if (is_adopted === "yes") {
      all = all.filter((ev) => ev.isAdopted === true);
    }
    if (is_adopted === "no") {
      all = all.filter((ev) => ev.isAdopted === false);
    }
    if (creation_date === "asc") {
      all = all.sort((a, b) => b.createdAt - a.createdAt);
    }
    if (creation_date === "desc") {
      all = all.sort((a, b) => a.createdAt - b.createdAt);
    }
    return all;
  } catch (error) {
    console.error(error);
  }
}
module.exports = { filtro };
