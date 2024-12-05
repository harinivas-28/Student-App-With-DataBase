// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddStudentForm from "./AddStudentForm";
import StudentTable from "./StudentTable"; // Import the StudentTable component
import DeleteStudentForm from "./DeleteStudentForm";
import "./App.css"

function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar">
          <Link className="navbar-brand" to="/">
            Student App
          </Link>
          <div className="navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Add Student
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/students">
                  View Students
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Routes */}
        <div className="content">
          <Routes>
            <Route path="/" element={<AddStudentForm />} />
            <Route path="/students" element={<StudentTable />} />
            <Route path="/students/delete/:rollNo" element={<DeleteStudentForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
