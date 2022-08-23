const User = require("../../models/users");

const register = (first_name, last_name, username, email, password, image, telephone, about) => {
    try {
        const post = new User({
            first_name,
            last_name,
            username,
            email,
            password,
            image,
            telephone,
            about
        });

        post.save().then(per => per);
    } catch (error) {
        console.error(error);
    }
}

module.exports = register