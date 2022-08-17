const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    first_name: { type: String, required: true, match: [/^[a-zA-Z\s]*$/, "First name can only contain letters"] },
    last_name: { type: String, required: true, match: [/^[a-zA-Z\s]*$/, "Last name can only contain letters"] },
    username: { type: String, required: true, unique: true },
    image: String,
    email: { type: String, lowercase: true, required: [true, "Email is required"], unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"] },
    password: { type: String, required: [true, "Password is required"] },
    about: String,
    telephone: String,
    place: String,
    isAdmin: { type: Boolean, default: false },
    reviews: Number,
    pets: [
        { type: mongoose.Schema.ObjectId, ref: "Pet" }
    ]
}, {
    timestamps: true
}
);


usersSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

usersSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}


// usersSchema.methods.setPassword = function (password) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
// }
// usersSchema.methods.validPassword = function (password) {
//     const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//     return this.password === hash;
// }

const User = mongoose.model("User", usersSchema);

module.exports = User;


