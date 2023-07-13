const validator = require("validator");
import mongoose from 'mongoose';

// creating schema
export const studentSchema = new mongoose.Schema({
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


// User Config
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});


// creating collection / model (it should be capital letter)
export const UserModel = mongoose.model('User', UserSchema);
export const StudentModel = mongoose.model('Student', studentSchema);
