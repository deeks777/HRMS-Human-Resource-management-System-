import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';




const Employee_dashboard = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    const [punchedIn, setPunchedIn] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost:3000/employee/employee_detail/${id - 17324}`)
        .then(result => {
            if(result.data.Status){
                setEmployee(result.data.Result[0]);
            }else{
                alert(result.data.Error);
            }
        })
        .catch(err => console.log(err));
    }, [])

    
    const handlePunchIn = () => {
        axios.put(`http://localhost:3000/employee/employee_punch_in/${id - 17324}`)
        .then(result => {
            if(result.data.Status){
                alert(`punched In : ${result.data.Status}`)
                // setPunchedIn(true);
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err));
    }
    
    const handlePunchOut = () => {
        axios.put(`http://localhost:3000/employee/employee_punch_out/${id - 17324}`)
        .then(result => {
            if(result.data.Status){
                alert(`punched out : ${result.data.Status}`)
                // setPunchedIn(false);
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err));
    }
    
    const handleClick = () => {
        axios.get(`http://localhost:3000/employee/employee_logout`)
        .then(result => {
            if(result.data.Status){
                localStorage.removeItem('loggedIn');
                navigate('/');
            }else{
                alert(result.data.Error);
            }
        })
        .catch(err => console.log(err));
    }


  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='px-3 py-2 border rounded '>
            <div>
                <h1 className='d-flex justify-content-center'>Employee Dashboard</h1>
                    <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
                        <div className='pb-2'><strong>First Name : </strong>First Name: 
                            {employee.fname}
                        </div>
                        <div className='pb-2'><strong>Last Name: </strong> 
                            {employee.lname}
                        </div>
                        <div className='pb-2'> <strong>
                            Email: </strong>{employee.email}
                        </div>
                        <div className='pb-2'> <strong>
                            Address: </strong>{employee.address}
                        </div>
                        <div className='pb-2'> <strong>
                            Salary: </strong>RS.{employee.salary}
                        </div>
                        <div className='pb-2'>
                            <button className='btn btn-success' onClick = {handlePunchIn}>Punch In</button>
                            <button className='btn btn-warning' onClick = {handlePunchOut}>Punch Out</button>
                        </div>
                        <button className='btn btn-primary' onClick = {handleClick}>Log Out</button>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Employee_dashboard;