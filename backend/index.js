const express = require('express');
const cors = require('cors'); // Add CORS middleware
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 3001;
const url = 'mongodb://127.0.0.1/mern'; // Assuming a local MongoDB instance

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Student = mongoose.model('Student', studentSchema);

const app = express();

// CORS Middleware Configuration (adjust as needed)
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from your React development server
    credentials: true, // Allow cookies for authenticated requests (if applicable)
  })
);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route to handle POST requests for creating students
app.post('/create', async (req, res) => {
  try {
    const newStudent = new Student({
      name: req.body.name,
      email: req.body.email,
    });

    await newStudent.save();

    res.status(201).send("Student created successfully!"); // Use created status code

  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating student. Please try again later."); // More informative error message
  }
});

// Route to retrieve all students
app.get('/', async (req, res) => {
  try {
    const currentStudents = await Student.find();
    res.status(200).json(currentStudents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving students. Please try again later.");
  }
});

// Route to retrieve a student by ID
app.get('/edit/:id', async (req, res) => {
  try {
    const  {id } = req.params; // Extract ID from request parameters

    const student = await Student.find({ _id: id });

    if (!student) {
      return res.status(404).send("Student not found."); // Handle case where student is not found
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving student. Please try again later.");
  }
 
});
app.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters
    const { name, email } = req.body; // Destructure name and email from request body

    const updatedStudent = await Student.findByIdAndUpdate(id, {
      name,
      email,
    });

    if (!updatedStudent) {
      return res.status(404).send("Student not found."); // Handle case where student is not found
    }

    res.status(200).json(updatedStudent); // Send the updated student data
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating student. Please try again later.");
  }
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const deletedStudent = await Student.findByIdAndDelete(id);

  if (!deletedStudent) {
    return res.status(404).send("Student not found."); // Handle case where student is not found
  }

  // Optional: Send a success message or the deleted student data
  res.status(200).send("Student deleted successfully!"); // Or res.status(200).json(deletedStudent);
});


mongoose
  .connect(url)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    // Consider retry logic or a more graceful fallback mechanism
    process.exit
  })