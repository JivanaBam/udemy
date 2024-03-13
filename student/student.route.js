import express from "express";
import Student from "./student.model.js";
import { addStudentValdationSchema } from "./student.validation.js";

const router = express.Router();

//add student
// router.post("/student/add", async (req, res) => {
//   // extract new student from req.body
//   const newStudent = req.body;

//   // validate new student using yup
//   let validateData;
//   try {
//     validateData = await addStudentValdationSchema.validate(newStudent);
//   } catch (error) {
//     // if validation fails, throw error
//     return res.status(400).send({ message: error.message });
//   }

//   // check if user with provided email already exists
//   const student = await Student.findOne({ email: newStudent.email });

//   // if user exists, throw error
//   if (student) {
//     return res.status(409).send({ message: "Email already exist." });
//   }

//   // create user
//   await Student.create(validateData);

//   // send response
//   return res.status(200).send({ message: "Student added successfully." });
// });

router.post(
  "/student/add",
  async (req, res, next) => {
    // extract new student from req.body
    const newStudent = req.body;

    try {
      //validate new student
      const validateData = await addStudentValdationSchema.validate(newStudent);

      // call next function
      next();
    } catch (error) {
      // if not validate, throw error
      return res.status(400).send({ message: error.message });
    }
  },

  async (req, res) => {
    // extract new student from req.body
    const newStudent = req.body;

    // check if email already used
    const student = await Student.findOne({ email: newStudent.email });

    // if email already occupied,throw error
    if (student) {
      return res.status(409).send({ message: "Email already exist." });
    }

    // create user
    await Student.create(newStudent);
    // send res
    return res.status(200).send({ message: "Student is added succcessfully." });
  }
);

export default router;
