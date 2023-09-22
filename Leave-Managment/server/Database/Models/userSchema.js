const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        trim: true
    },
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
    mobile: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    gender: {
        type: String,
        
    },
    branch: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    
    datecreated:Date,
    dateUpdated:Date

    
});

usersSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.dateUpdated = currentDate;
    if (!this.datecreated) {
      this.datecreated = currentDate;
    }
    next();
  });

// model
const users = new mongoose.model("users",usersSchema);

module.exports = users;