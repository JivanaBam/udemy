import mongoose from "mongoose";

// set rules/schema

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 45,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 45,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
    lowercase: true,
    unique: true,
  },

  contactNumber: {
    type: String,
    required: false,
    trim: true,
    maxlength: 15,
    minlength: 7,
  },

  isGraduated: {
    type: Boolean,
    required: false,
  },
});

// create table/collection/model
const Student = mongoose.model("Student", studentSchema);

export default Student;
