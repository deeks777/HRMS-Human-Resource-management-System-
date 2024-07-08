import React, { useState } from 'react';
import '../styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add_department = () => {
    const [department, setDepartment] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();

        axios.post('http://localhost:3000/auth/Add_department', {department})
        .then(result => {
            if(result.data.AddingStatus){
                navigate('/dashboard/Departments')
            }else{
                alert(result.data.Error );
            }

        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75 '>
        <div className='p-3 border rounded w-25 '>
            <h2>Add Departments</h2>
            <form onSubmit={handleSubmit}>
                <div className='mt-3'>
                    <label htmlFor="Department"><strong>Department:</strong></label>
                    <input onChange={(e) => setDepartment(e.target.value)} 
                            className='form-control rounded-0 mb-3'  
                            type="text" 
                            name="department" 
                            autoComplete='off' 
                            placeholder='Enter Department' />
                </div>
                <button className='btn btn-success w-100'>Add</button>
            </form>
        </div>
    </div>
  )
}

export default Add_department