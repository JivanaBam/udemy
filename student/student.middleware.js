import { addStudentValdationSchema } from "./student.validation.js";

export const validateStudentDataFromReqBody = async (req, res, next) => {
  // extract new values from req.body
  const newValues = req.body;

  // validate new values
  try {
    const validatedData = await addStudentValdationSchema.validate(newValues);
    req.body = validatedData;

    // call next function
    next();
  } catch (error) {
    // if not validate, throw error
    return res.status(400).send({ message: error.message });
  }
};
