require("dotenv").config();
const { Router } = require("express");
const Conversation = require("../models/conversation");
const verifyToken = require("../utils/middlewares/validateToken.js");

const router = Router();

router.post("/conversations", verifyToken, async (req, res, next) => {

  let existentConversation = await Conversation.findOne({ members: [req.body.senderId, req.body.receiverId] })
  let existentConversation2 = await Conversation.findOne({ members: [req.body.receiverId, req.body.senderId] })

  if (!existentConversation && !existentConversation2) {
    try {
      const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
      })
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation)
    } catch (error) {
      console.log(error)
    }
  }
  else {
    try {
      res.status(400).send("conversation already exists")
    }
    catch (error) {
      next(error)
    }
  }
})

router.get("/conversations/:userId", verifyToken, async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
