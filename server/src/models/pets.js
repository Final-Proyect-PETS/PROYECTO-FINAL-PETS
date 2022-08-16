const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const petsSchema = new Schema({
    name: String,
    image: String,
    type: String,
    description: String,
    size: String,
    age: Integer,
    vaccination: String,
    castrated: Boolean,
    place: String,
    user: { type: mongoose.Schema.ObjectId, ref: "User" }
}, {
    timestamps: true
}
);

const Pet = mongoose.model("Pet", petsSchema);

module.exports = Pet;