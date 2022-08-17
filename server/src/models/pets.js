const mongoose = require("mongoose");
const Schema = mongoose.Schema;

 
const petsSchema = new Schema({
    name: String,
    image: String,
    type: String,
    description: String,
    size: String,
    age: Number,
    vaccination: String,
    castrated: Boolean,
    place: String,
    dateAdded: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.ObjectId, ref: "User" }
}, {
    timestamps: true
}
);

const Pet = mongoose.model("Pet", petsSchema);

module.exports = Pet;