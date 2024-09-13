import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function Create() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  function showaddAlert () {
    Swal.fire({
      title: "Create student",
      text: "do you want to create student?",
      showCancelButton: true,
  confirmButtonText: "reate",
      icon: "info",
      timer:5000,

    }).then((result) =>{
      if(result.isConfirmed){
        handleAdd();
        window.location='/list';
      }

    });
    
  }

  const handleAdd = async () => {
    try {
      const response = 
      axios({
        method: 'post',
        url: 'http://localhost:3001/create/',
        data: {
          name:name ,
          email: email
        }
      });
   

      
     
      
     
      // Optionally clear the form or show a success message
    
    } catch (error) {
      console.error('Error creating student:', error);
      // Handle errors gracefully, e.g., display an error message to the user
      console.log(name);
     
    }
   
  };
 
  

  return (
    <div>
      <center className='text-danger mt-2'>
        <h3>Create Student</h3>
      </center>
      <center>
        <div className="col-md-3 mt-4">
         
          <label htmlFor="S_name" className="form-label">Name</label>
          <input
            type="text"
            className='form-control'
            id='S_name'
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="S_email" className="form-label">Email</label>
          <input
            type="text"
            className='form-control'
            id='S_Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className='btn btn-success mt-2' onClick={showaddAlert}>
            Create Student
          </button>
        </div>
        
      </center>
    </div>
  );
}

export default Create;
