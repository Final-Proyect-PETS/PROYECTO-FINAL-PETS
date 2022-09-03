const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    informerId: String,
    informerFirstName: String,
    informerLastName: String,
    reportedPetId: String,
    reason: String,
  },
  {
    timestamps: true,
  }
);

const PetReport = mongoose.model("PetReport", messageSchema);

module.exports = PetReport;
