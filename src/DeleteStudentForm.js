// import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteStudentForm = () => {
  const { rollNo } = useParams();
  const navigate = useNavigate(); // Use useNavigate to redirect

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://5d62-2401-4900-675d-9181-c142-7843-4a83-8796.ngrok-free.app/student/${rollNo}`);
      if(response.data.message === "Student deleted successfully"){
        alert("Student deleted successfully");
        navigate('/students'); // Redirect to the students list
      }
    } catch (error) {
      console.log("Error deleting student"); // Or use a more detailed error message
      navigate('/students');
    }
  };
  handleDelete();
};

export default DeleteStudentForm;