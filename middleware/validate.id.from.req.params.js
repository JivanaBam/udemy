import mongoose from "mongoose";

export const validateMongoIdFromReqParams = (req, res, next) => {
  // extract student id from req.paramas
  const studentId = req.params.id;

  //check for valid mongo id
  const isValidMongoId = mongoose.isValidObjectId(studentId);

  // if invalid monogo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ meassage: "Invalid mongo id." });
  }

  // call next function
  next();
};
