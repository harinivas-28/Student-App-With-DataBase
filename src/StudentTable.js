import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import "./StudentTable.css"

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedStudent, setEditedStudent] = useState({});

  useEffect(() => {
    fetch('https://5d62-2401-4900-675d-9181-c142-7843-4a83-8796.ngrok-free.app/api/students', {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    })
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (index, student) => {
    setEditingRow(index);
    setEditedStudent({ ...student, ...student.scores });
  };

  const handleChange = (e, field) => {
    setEditedStudent({ ...editedStudent, [field]: e.target.value });
  };

  const handleSubmit = async (rollNo) => {
    try {
      const studentData = {
        name: editedStudent.name, // These will remain the same
        rollNo: editedStudent.rollNo,
        scores: {
          Java: Number(editedStudent.Java),
          CPP: Number(editedStudent.CPP),
          Python: Number(editedStudent.Python),
          GenAI: Number(editedStudent.GenAI),
          FSD: Number(editedStudent.FSD),
        },
      };

      const response = await fetch(`https://5d62-2401-4900-675d-9181-c142-7843-4a83-8796.ngrok-free.app/student/${rollNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        const updatedStudents = students.map((student) =>
          student.rollNo === rollNo ? { ...student, ...studentData } : student
        );
        setStudents(updatedStudents);
        setEditingRow(null);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="container">
      <h3>Students List</h3>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {['Name', 'Roll Number', 'Java', 'CPP', 'Python', 'GenAI', 'FSD', 'Actions'].map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.rollNo}>
                  {['name', 'rollNo', 'Java', 'CPP', 'Python', 'GenAI', 'FSD'].map((field) => (
                    <td key={field}>
                      {editingRow === index ? (
                        <input
                          type="text"
                          value={editedStudent[field] || ''}
                          onChange={(e) => handleChange(e, field)}
                          className={field === 'name' || field === 'rollNo' ? 'disabled-input' : ''}
                          disabled={field === 'name' || field === 'rollNo'}
                        />
                      ) : (
                        student.scores[field] || student[field]
                      )}
                    </td>
                  ))}
                  <td>
                    {editingRow === index ? (
                      <button
                        onClick={() => handleSubmit(student.rollNo)}
                        className="button button-submit"
                      >
                        Submit
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(index, student)}
                          className="button button-edit"
                        >
                          Edit
                        </button>
                        <span>   </span>
                        <button className="button button-delete">
                          <Link to={`/students/delete/${student.rollNo}`}>Delete</Link>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>    
  );
};

export default StudentsTable;