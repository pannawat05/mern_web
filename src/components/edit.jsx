import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {BrowserRouter, Link, Routes,Route} from 'react-router-dom'

function Edit() {
  const { id } = useParams(); // Destructure the parameter value

  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Store any errors

  const [newname,setNewname] = useState();
  const [newemail,setNewemail] = useState();


  const getStudents = async () => {
    setIsLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors

    try {
      const response = await axios.get(`http://localhost:3001/edit/${id}`); // Include ID in URL path
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError(error); // Store error for display
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or failure
    }
  };
  function showeditAlert () {
    Swal.fire({
      title: "Update student",
      text: "do you want to Update student info ?",
      showCancelButton: true,
  confirmButtonText: "save",
      icon: "info",
      timer:5000,

    }).then((result) =>{
      if(result.isConfirmed){
        update();
        window.location='/list';
      }

    });
    
  }
const update = () =>{
  
  const response = axios.put(`http://localhost:3001/update/${id}`,{
    name:newname,
    email : newemail
})

}
  useEffect(() => {
    getStudents();
  }, [id]); // Re-fetch data when id changes

  return (
    <div>
      <h2>{id}</h2>
      {isLoading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : students.length > 0 ? (
        students.map((student, index) => (
          <div key={index}>
           <center>
           <div className="col-md-3 mt-4">
           <label htmlFor="S_name" className="form-label">Name</label>
          <input
            type="text"
            className='form-control'
            id='S_name'
            placeholder={student.name}
            onChange={(e) => setNewname(e.target.value)}
          />
           <label htmlFor="S_email" className="form-label">Email</label>
          <input
            type="text"
            className='form-control'
            id='S_Email'
            placeholder={student.email}
            onChange={(e) => setNewemail(e.target.value)}
          />
         
           <button type="submit" className='btn btn-warning mt-2 ' onClick={showeditAlert
          }>
            update Student
          </button>
          <Link to='/list'>
          <button type="submit" className='btn btn-secondary mt-2 ms-2'>
            Cancel
          </button>
          </Link>
            </div>
           </center>
          </div>
        ))
      ) : (
        <h3>No records</h3>
      )}
    </div>
  );
}

export default Edit;
