const Pets = require("../../models/pets");
const User = require("../../models/users");
const connection = require("../../db")

const postPet = async (id, name, image, imagePool, type, description, size, age, vaccination, castrated, place, gender) => {
    try {
        connection();
        console.log("conectado a users");
    } catch (error) {
        console.error(error);
    }
    try {
        const foundUser = await User.findById(id);

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
            user: foundUser._id,
        });
        await newPet.save();
        foundUser.pets.push(newPet._id);
        await foundUser.save();
        return newPet
    } catch (err) {
        console.error(err);
    }
}

module.exports = { postPet }