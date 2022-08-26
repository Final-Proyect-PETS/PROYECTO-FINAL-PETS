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
      interestedUsers,
    });

    await post.save();
    return post;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { register };
