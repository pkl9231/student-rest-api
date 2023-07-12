const validator = require("validator");
import mongoose from 'mongoose';

// creating schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value: any) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
    min: 10,
  },
  address: {
    type: String,
  },
  className: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  fathersName: {
    type: String,
    required: true,
  }
});

// creating collection / model (it should be capital letter)
export const StudentModel = mongoose.model('Student', studentSchema);
