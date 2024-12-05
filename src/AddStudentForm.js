import React, { useState } from 'react';
import axios from 'axios';
import "./AddStudentForm.css"

const StudentForm = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    rollNo: '',
    scores: {
      Java: '',
      CPP: '',
      Python: '',
      GenAI: '',
      FSD: '',
    },
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in studentData.scores) {
      setStudentData((prevData) => ({
        ...prevData,
        scores: {
          ...prevData.scores,
          [name]: value,
        },
      }));
    } else {
      setStudentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://5d62-2401-4900-675d-9181-c142-7843-4a83-8796.ngrok-free.app/student', studentData);
      setMessage(`Success: ${response.data.message}`);
    } catch (err) {
      setMessage(`Error: ${err.response ? err.response.data.message : err.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Student Form</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rollNo">Roll No:</label>
          <input
            id="rollNo"
            type="text"
            name="rollNo"
            value={studentData.rollNo}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        {['Java', 'CPP', 'Python', 'GenAI', 'FSD'].map((subject) => (
          <div key={subject} className="form-group">
            <label htmlFor={subject}>{`${subject} Score:`}</label>
            <input
              id={subject}
              type="number"
              name={subject}
              value={studentData.scores[subject]}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        ))}
        <div className="form-group">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default StudentForm;
