import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter, Link, Routes,Route} from 'react-router-dom'

function List() {
  const [students, setStudents] = useState([]); // Use plural for consistency

  const getStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };
  function showdeleteAlert (id) {
    Swal.fire({
      title: "remove student",
      text: "do you want to remove student info ?",
      showCancelButton: true,
  confirmButtonText: "save",
      icon: "warning",
      timer:5000,

    }).then((result) =>{
      if(result.isConfirmed){
        deleteStudent(id);
        Swal.fire("Deleted!", "", "success");

       
      }

    });
    
  }
  const deleteStudent = async (id) => { // Define the function with an argument 'id'
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`); // Use template literal
      getStudents(); // Refetch student data after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

 

  return (
    <div>
      <h2 className="text-warning mt-3">Student List</h2>
      {students.length > 0 ? (
        students.map((student, index) => ( // Use index as key for rendering
          <div key={index}>
            <div className="card">
           <table className="table table-responsive"> 
  <thead className='table-success'> 
    <tr>
      <th scope="row">Name</th>
      <th scope="row">Email</th>
      <th scope="row">Option</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td><Link to={`/edit/${student._id}`}><i class="bi bi-pencil-square"></i></Link><div   className='delete' onClick={() => showdeleteAlert(student._id)}><i class="bi bi-trash3-fill"></i></div></td>
    </tr>
  </tbody>
</table>
</div>
          </div>
        ))
      ) : (
        <h3>No records</h3> // Display a loading message while fetching data
      )}
    </div>
    
  );
}

export default List;
