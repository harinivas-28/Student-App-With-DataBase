// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddStudentForm from "./AddStudentForm";
import StudentTable from "./StudentTable"; // Import the StudentTable component
import EditStudentForm from "./EditStudentForm";
import DeleteStudentForm from "./DeleteStudentForm";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Student App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
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

        <div>
          <Routes>
            <Route path="/" element={<AddStudentForm />} />
            <Route path="/students" element={<StudentTable />} />
            {/* Added routes for update and delete */}
          <Route path="/students/edit/:rollNo" element={<EditStudentForm />} />
          <Route path="/students/delete/:rollNo" element={<DeleteStudentForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
