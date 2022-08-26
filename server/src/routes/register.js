const { Router } = require("express");
const { register } = require("../utils/controllers/register.js");

const router = Router();

router.post("/", async (req, res, next) => {
  let {
    first_name,
    last_name,
    username,
    email,
    password,
    image,
    telephone,
    about,
  } = req.body;
  try {
    const postUser = await register(
      first_name,
      last_name,
      username,
      email,
      password,
      image,
      telephone,
      about
    );
    res.status(201).send(postUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
