const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    googleId: String,
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdming: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
)

mongoose.model('User', userSchema);