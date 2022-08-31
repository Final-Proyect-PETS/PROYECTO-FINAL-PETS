const { Router } = require("express");
const Message = require("../models/message")
const verifyToken = require("../utils/middlewares/validateToken.js");
const router = Router();


router.post("/message", verifyToken, async (req, res, next) => {
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        next(error)
    }
})

router.get("/message/:conversationId", verifyToken, async (req, res, next) => {

    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (error) {
        next(error)
    }

})

module.exports = router;