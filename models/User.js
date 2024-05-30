const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: { unique: true },
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role:{
        type:String,
        required: true,
    },
    bookedEvents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Event'
        }
      ],
  },

  { timestamps: true }
);

async function generateHash(password) {
  const COST = 12;
  return bcrypt.hash(password, COST);
}

UserSchema.pre("save", function preSave(next) {
  const user = this;

  return generateHash(user.password)
        .then((hash) => {
        user.password = hash;
        return next();
        })
        .catch((error) => {
        return next(error);
        });
});

module.exports = mongoose.model("User", UserSchema);
