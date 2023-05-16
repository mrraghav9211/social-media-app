const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter a name"],
  },

  avatar: {
    public_id: String,
    url: String,
  },

  email: {
    type: String,
    require: [true, "Please Enter a email"],
    unique: [true, "Email already exists"],
  },

  password: {
    type: String,
    require: [true, "Pleases entere a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
};

module.exports = mongoose.model("User", userSchema);
