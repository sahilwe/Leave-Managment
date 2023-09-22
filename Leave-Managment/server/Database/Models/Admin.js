const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("not valid email")
            }
        }
    },

    
});

adminSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.dateUpdated = currentDate;
    if (!this.datecreated) {
      this.datecreated = currentDate;
    }
    next();
  });

// model
const admin = new mongoose.model("Admin",adminSchema);

module.exports = admin;