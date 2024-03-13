import yup from "yup";

export const addStudentValdationSchema = yup.object({
  firstName: yup
    .string()
    .required()
    .trim()
    .max(45, "First name must be max 45 characters."),
  lastName: yup
    .string()
    .required()
    .trim()
    .max(45, "Last name must be max 45 characters."),
  email: yup
    .string()
    .email("Must be valid email")
    .required()
    .max(60, "Email must be at most 60 character.")
    .trim()
    .lowercase(),
  contactNumber: yup
    .string()
    .trim()
    .min(7, "Contact number must be at least 7 character.")
    .max(15, "Contact number must be at most 15 character.")
    .required(),
});
