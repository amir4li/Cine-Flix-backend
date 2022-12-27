const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name!"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email!"],
        unique: true,
        lowercasw: true,
        validate: [validator.isEmail, "Please provide a valid email."]
    },
    password: {
        type: String,
        required: [true, "Please provid a password."],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password."],
        validate: {
            // THIS ONLY WORKS ON SAVE !!!
            validator: function(el) {
                return el === this.password;
            },
            message: "Passwords are not the same."
        }
    }
});

userSchema.pre("save", async function(next) {
    // ONLY RUN THIS FUNCTION IF PASSWORD WAS ACTUALLY MODIFIED
    if(!this.isModified("password")) return next();

    // HASHING THE PASSWORD
    this.password = await bcrypt.hash(this.password, 12);

    // DELETE passwordConfirm FIELD
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

const User = mongoose.model("User", userSchema);

module.exports = User;

