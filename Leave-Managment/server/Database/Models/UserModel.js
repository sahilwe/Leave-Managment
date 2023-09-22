const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,   
    },
    phone: {
      type: String,
      required: true,
    },
    startdate: {
      type: Date,
      required: true,
    },
    enddate: {
      type: Date,
      required: true,
    },
    leavetype: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    kpurpose: {
        type: String,
        required: true,
      },
    attachment: {
      type: Buffer,
    },
    status: {
        type: String,
      },
  },
  { timestamps: true }
);
const userModel = mongoose.model("leaveform", userSchema);

module.exports = userModel;