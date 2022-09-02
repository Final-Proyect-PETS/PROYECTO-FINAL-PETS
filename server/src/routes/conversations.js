const { Router } = require("express");
const Conversation = require("../models/conversation");
const verifyToken = require("../utils/middlewares/validateToken.js");

const router = Router();

router.post("/conversations", verifyToken, async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    next(error);
  }
});

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
