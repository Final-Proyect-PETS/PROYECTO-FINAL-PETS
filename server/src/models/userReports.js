const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    informerId: String,
    informerFirstName: String,
    informerLastName: String,
    reportedUserId: String,
    reportedFirstName: String,
    reportedLastName: String,
    reason: String,
  },
  {
    timestamps: true,
  }
);

const UserReport = mongoose.model("UserReport", messageSchema);

module.exports = UserReport;
