const User = require("../../models/users");

async function register(
  first_name,
  last_name,
  username,
  email,
  password,
  image,
  telephone,
  about,
  place,
  interestedUsers,
) {
  try {
    const post = new User({
      first_name,
      last_name,
      username,
      email,
      password,
      image,
      telephone,
      about,
      place,
<<<<<<< HEAD
      interestedUsers,
      donations
=======
      interestedUsers
>>>>>>> f3559b81ce88aba04b10b66686771cfc484e2556
    });

    await post.save();
    return post;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { register };
