import express from "express";
import connectDB from "./connect.db.js";
import courseRoutes from "./course/course.route.js";
import studentRouters from "./student/student.route.js";

const app = express();

// to make app understand json
app.use(express.json());

// database connection
connectDB();

// register routes
app.use(courseRoutes);
app.use(studentRouters);

// port and server connection
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
