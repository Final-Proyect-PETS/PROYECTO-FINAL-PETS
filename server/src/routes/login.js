const { Router } = require("express");
const login = require("../utils/controllers/login");
const User = require("../models/users");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const token = await login(req.body.email, req.body.password);
    const user = await User.findOne({ email: req.body.email });
    const id = user._id;
    res
      .header("token", token)
      .json({ error: null, data: { token }, id: { id } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
