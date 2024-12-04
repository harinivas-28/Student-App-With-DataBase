const express = require("express"); 
const mongoose = require("mongoose"); 
const app = express(); 
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
 
// Connect to MongoDB 
mongoose.connect("mongodb+srv://harinivas_28:mongo_harinivas@cluster0.cikhuki.mongodb.net/studentsDB?retryWrites=true&w=majority", { 
    useNewUrlParser: true, 
  }) 
  .then(() => console.log("Connected to MongoDB")) 
  .catch((err) => console.error("MongoDB connection error:", err)); 
 
// Define Student Schema 
const studentSchema = new mongoose.Schema({ 
  name: String, 
  rollNo: String, 
  scores: { 
    Java: Number, 
    CPP: Number, 
    Python: Number, 
    GenAI: Number, 
    FSD: Number, 
  }, 
}); 
 
// Create Student Model 
const Student = mongoose.model("Student", studentSchema); 
 
// Middleware 
app.use(express.json()); 
 
app.get("/api/students", async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (err) {
      res.status(500).send("Error fetching student data");
    }
});
// Route to fetch student data by roll number 
app.get("/student/:rollNo", async (req, res) => {
    const rollNo = req.params.rollNo; // Convert to integer
    console.log("rollNo from request:", rollNo, typeof rollNo); // Log type for debugging
  
    try {
      const student = await Student.findOne({ rollNo }, { _id: 0 });
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error fetching student data", error: err });
    }
});  

app.post('/student', async (req, res)=>{
  try{
      const student = new Student(req.body);
      await student.save();
      res.status(201).json({message:"Student added successfully", student});
  } catch(err){
      res.status(400).json({message: "Failed to add student", error: err});
  }
});

app.delete('/student/:rollNo', async (req, res)=>{
  const rollNo = req.params.rollNo;
  try{
      const deletedStudent = await Student.findOneAndDelete({rollNo});
      if(deletedStudent){
          res.status(200).json({message:"Student deleted successfully", deletedStudent});
      } else {
          res.status(404).json({message: "Student not found"});
      }
  } catch(err){
      res.status(400).json({message: "Failed to delete student", error: err});
  }
});

app.put('/student/:rollNo',async (req, res)=>{
  const rollNo = req.params.rollNo;
  try{
    const updatedStudent = await Student.findOneAndUpdate(
      {rollNo},
      req.body,
      {new: true, runValidators: true}
    );
    if(updatedStudent){
      res.status(200).json({message: "Student updated successfully",updatedStudent});
    } else {
      res.status(404).json({message: "Student not found"});
    }
  } catch(err){
    res.status(400).json({message: "Failed to update student", error:err});
  }
});

app.get('/students', async (req, res)=>{
  try{
    const students = await Student.find({}, {name:1, rollNo:1, scores:1});
    const studentsWithGPA = students.map((student)=>{
      const {Java, CPP, Python, GenAI, FSD} = student.scores;
      const gpa = ((Java+CPP+Python+GenAI+FSD)/5).toFixed(2);
      return {
        name: student.name,
        rollNo: student.rollNo,
        gpa,
      };
    });
    res.status(200).json(studentsWithGPA);
  } catch(err){
    res.status(400).json({message:"Failed to fetch students", error:err});
  }
});
 
// Start the server 
const PORT = 5000; 
app.listen(PORT,'0.0.0.0', () => { 
  console.log(`Server running on http://localhost:${PORT}`); 
}); 