const googlelogin = require("../utils/controllers/googlelogin");
const { Router } = require("express");
const router = Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  process.env.O_AUTH_CLIENT
);

router.post("/logingoogle", async (req, res, next) => {
  const { tokenId } = req.body;
  try {
    client
      .verifyIdToken({
        idToken: tokenId,
        audience:
          process.env.O_AUTH_CLIENT,
      })
      .then((response) => {
        const { email_verified, given_name, family_name, email, name } =
          response.payload;
        if (email_verified) {
          User.findOne({ email }).exec(async (err, user) => {
            if (err) {
              return res.status(400).json({
                error:
                  "Algo salio mal en el user.findOne linea 16 controllers/googlelogin",
                err,
              });
            } else {
              if (user) {
                let id = user._id;
                const token = jwt.sign({ id: id }, process.env.SECRET_KEY);
                console.log(token);
                res
                  .header("token", token)
                  .json({ error: null, data: { token }, id: { id } });
              } else {
                try {
                  let newUser = new User({
                    first_name: given_name,
                    last_name: family_name,
                    email: email,
                    username: name,
                  });
                  await newUser.save();
                  let id = newUser._id;
                  const token = jwt.sign(
                    { id: newUser._id },
                    process.env.SECRET_KEY
                  );
                  res
                    .header("token", token)
                    .json({ error: null, data: { token }, id: { id } });
                } catch (error) {
                  next(error);
                }
              }
            }
          });
        }
      });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
