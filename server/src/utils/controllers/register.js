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
  place_longitude,
  place_latitude,
  donations,
  interestedUsers,
  reported_pets,
  reported_users
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
      place_longitude,
      place_latitude,
      donations,
      interestedUsers,
      reported_pets,
      reported_users,
    });

    await post.save();
    return post;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { register };
