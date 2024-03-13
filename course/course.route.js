import express from "express";
import Course from "./course.model.js";
import {
  courseValidationSchema,
  paginationDataValidationSchema,
} from "./course.validation.js";
import mongoose from "mongoose";

const router = express.Router();

//add course
router.post("/course/add", async (req, res) => {
  // extract course from req.params
  const newCourse = req.body;

  try {
    await courseValidationSchema.validate(newCourse);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  // save course
  await Course.create(newCourse);

  // send res
  return res.status(200).send({ message: "course is added successfully." });
});

//edit course by id
router.put("/course/edit/:id", async (req, res) => {
  // extract course id from req.params
  const courseId = req.params.id;

  // check for valid mongo id
  const isValidMongooId = mongoose.isValidObjectId(courseId);

  // if not valid mongo id, throw error
  if (!isValidMongooId) {
    return res.status(400).send({ message: "Invalid mongoo id." });
  }

  // find course by id
  const course = await Course.findOne({ _id: courseId });

  // if not course, throw error
  if (!course) {
    return res.status(404).send({ message: "Course doesnot exist." });
  }

  // extract new values from req.body
  const newValues = req.body;

  try {
    // validate new values
    await courseValidationSchema.validate(newValues);
  } catch (error) {
    // if validation fails, throw error
    return res.status(400).send({ message: error.message });
  }

  // edit course
  await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        ...newValues,
      },
    }
  );

  // send response
  return res.status(200).send({ message: "Course is edited successfully." });
});

// delete course by id
router.delete("/course/delete/:id", async (req, res) => {
  // extract course id from req.params
  const courseId = req.params.id;

  // check valid mongo if from course id
  const isValidMongooId = mongoose.isValidObjectId(courseId);

  //if not valid mongo id, throw error
  if (!isValidMongooId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  //find course by id
  const course = await Course.findOne({ _id: courseId });

  // if not course, throw error
  if (!course) {
    return res.status(404).send({ message: "course does not exist." });
  }

  // delete course
  await Course.deleteOne({ _id: courseId });

  // send res
  return res.status(200).send({ message: "Course is deleted successfully." });
});

// get course list
router.get("/course/list", async (req, res) => {
  // extract pagination data from req.body
  const paginationData = req.body;

  // validate pagination data
  let validateData;
  try {
    validateData = await paginationDataValidationSchema.validate(
      paginationData
    );
  } catch (error) {
    // if validation fails,throw error
    return res.status(400).send({ message: error.message });
  }

  // calculate skip
  const skip = (validateData.page - 1) * validateData.limit;

  // find courses
  const courses = await Course.aggregate([
    {
      $match: {},
    },
    {
      $skip: skip,
    },
    {
      $limit: validateData.limit,
    },
    {
      $project: {
        name: 1,
        price: 1,
        duration: 1,
        tutorName: 1,
      },
    },
  ]);

  // send response
  return res.status(200).send({ message: "Success", courseList: courses });
});

export default router;
