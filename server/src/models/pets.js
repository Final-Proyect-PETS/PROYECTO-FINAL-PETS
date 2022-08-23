const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const petsSchema = new Schema({
    name: String,
    image: String,
    type: { type: String, enum: ["dog", "cat", "other"], lowercase: true },
    description: String,
    size: { type: String, enum: ["small", "medium", "big"], lowercase: true },
    age: Number,
<<<<<<< HEAD
    available: Boolean,
    vaccination: String,
=======
    gender: { type: String, enum: ["female", "male"], lowercase: true },
    vaccination: { type: String, enum: ["yes", "no", "unknown"], lowercase: true },
>>>>>>> 6a3a9205c5a19f3730b8b7568aab661a4f9346d6
    castrated: Boolean,
    place: String,
    imagePool: [String],
    deleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.ObjectId, ref: "User" }
}, {
    timestamps: true
});

const Pet = mongoose.model("Pet", petsSchema);

module.exports = Pet;