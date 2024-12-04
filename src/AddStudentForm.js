import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:5000/student', studentData);
      setMessage(`Success: ${response.data.message}`);
    } catch (err) {
      setMessage(`Error: ${err.response ? err.response.data.message : err.message}`);
    }
  };

  return (
    <div>
      <h2>Student Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Roll No:</label>
          <input
            type="text"
            name="rollNo"
            value={studentData.rollNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Java Score:</label>
          <input
            type="number"
            name="Java"
            value={studentData.scores.Java}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CPP Score:</label>
          <input
            type="number"
            name="CPP"
            value={studentData.scores.CPP}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Python Score:</label>
          <input
            type="number"
            name="Python"
            value={studentData.scores.Python}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>GenAI Score:</label>
          <input
            type="number"
            name="GenAI"
            value={studentData.scores.GenAI}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>FSD Score:</label>
          <input
            type="number"
            name="FSD"
            value={studentData.scores.FSD}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StudentForm;
