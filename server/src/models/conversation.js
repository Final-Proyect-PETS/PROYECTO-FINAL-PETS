require("dotenv").config();
const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array
        }
    },
    {
        timestamps: true
    }
);

const Conversation = mongoose.model("Conversation", conversationSchema)

module.exports = Conversation