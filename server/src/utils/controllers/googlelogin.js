require("dotenv").config();
const User = require("../../models/users");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  process.env.O_AUTH_CLIENT
);

const googlelogin = (req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        process.env.O_AUTH_CLIENT,
    })
    .then((response) => {
      const { email_verfied, givenName, familyName, name, email } =
        response.payload;
      if (email_verfied) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({
              error:
                "Algo salio mal en el user.findOne linea 16 controllers/googlelogin",
              err,
            });
          } else {
            if (user) {
              const token = jwt.sign(
                { id: req.user._id },
                process.env.SECRET_KEY
              );
              res
                .header("token", token)
                .json({ error: null, data: { token }, id: { id } });
            } else {
              let newUser = new User({
                first_name: givenName,
                last_name: familyName,
                email: email,
                name: name,
              });
              newUser.save((err, data) => {
                if (err) {
                  return res.status(400).json({
                    error: "Algo salio mal en el newUser.save",
                    err,
                  });
                }
                const token = jwt.sign(
                  { id: data._id },
                  process.env.SECRET_KEY
                );
                res
                  .header("token", token)
                  .json({ error: null, data: { token }, id: { id } });
              });
            }
          }
        });
      }
    });
};

module.exports = googlelogin;
