const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petsSchema = new Schema(
  {
    name: String,
    image: String,
    type: { type: String, enum: ["dog", "cat", "other"], lowercase: true },
    description: String,
    size: { type: String, enum: ["small", "medium", "big"], lowercase: true },
    age: Number,
    gender: { type: String, enum: ["female", "male"], lowercase: true },
    vaccination: {
      type: String,
      enum: ["yes", "no", "unknown"],
      lowercase: true,
    },
    castrated: Boolean,
    place: String,
    place_longitude: String,
    place_latitude: String,
    imagePool: [String],
    deleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    isAdopted: { type: Boolean, default: true },
    interestedUsers: Array,
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model("Pet", petsSchema);

module.exports = Pet;
