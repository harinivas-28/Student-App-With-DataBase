import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedStudent, setEditedStudent] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/students', {
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

      const response = await fetch(`http://localhost:5000/student/${rollNo}`, {
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
    <div className="container mx-auto p-6 max-w-5xl shadow-xl rounded-lg bg-white">
      <h3 className="text-3xl font-bold mb-6 text-blue-700">Students List</h3>
      <table className="table-auto w-full border-collapse rounded-lg shadow-md overflow-hidden" border={2}>
        <thead className="bg-blue-600 text-white">
          <tr>
            {['Name', 'Roll Number', 'Java', 'CPP', 'Python', 'GenAI', 'FSD', 'Actions'].map((header) => (
              <th key={header} className="px-4 py-3 text-center uppercase">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student.rollNo} className="hover:bg-blue-100 transition-colors">
                {['name', 'rollNo', 'Java', 'CPP', 'Python', 'GenAI', 'FSD'].map((field) => (
                  <td key={field} className="border px-4 py-3 text-center">
                    {editingRow === index ? (
                      <input
                        type="text"
                        value={editedStudent[field] || ''}
                        onChange={(e) => handleChange(e, field)}
                        className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 ${
                          field === 'name' || field === 'rollNo' ? 'bg-gray-200 cursor-not-allowed' : 'focus:ring-blue-400'
                        }`}
                        disabled={field === 'name' || field === 'rollNo'}  // Disable name and rollNo fields
                      />
                    ) : (
                      student.scores[field] || student[field]
                    )}
                  </td>
                ))}
                <td className="border px-4 py-3 text-center">
                  {editingRow === index ? (
                    <button
                      onClick={() => handleSubmit(student.rollNo)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                    >
                      Submit
                    </button>
                  ) : (
                    <>
                    <button
                        onClick={() => handleEdit(index, student)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 transition"
                      >
                        Edit
                      </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 transition">
                      <Link to={`/students/delete/${student.rollNo}`}>Delete</Link>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-6 text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;