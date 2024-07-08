import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add_employee = () => {

    const [name, setName] = useState({
        fname:'',
        lname:'',
        email:'',
        password:'',
        salary:'',
        address:'',
        department_id:'',
        imageFile:''
    })

    const [department, setDepartment] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/departments')
            .then(result => {
                if(result.data.Status){
                    setDepartment(result.data.Result);
                }else{
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('fname', name.fname);
        formData.append('lname', name.lname);
        formData.append('email', name.email);
        formData.append('password', name.password);
        formData.append('address', name.address);
        formData.append('salary', name.salary);
        formData.append('department_id', name.department_id);
        formData.append('imageFile', name.imageFile);


        axios.post('http://localhost:3000/auth/add_employee', formData)
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard/employee');
            }else{
                alert(result.data.Error);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center mt-3 '>
            <div className='p-3 border rounded w-50 '>
                <h3 className='text-center'>Add Employee</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label className='form-label' htmlFor="FirstName"><strong>First Name:</strong></label>
                        <input  
                                onChange={(e) => setName({...name, fname:e.target.value})}
                                className='form-control rounded-0 mb-3'  
                                type="text" 
                                id='FirstName'
                                placeholder='Enter First Name' />
                    </div>
                    <div className='col-12'>
                        <label className='form-label' htmlFor="LastName"><strong>Last Name:</strong></label>
                        <input 
                                onChange={(e) => setName({...name, lname:e.target.value})}
                                className='form-control rounded-0 mb-3'  
                                type="text" 
                                id="lName" 
                                autoComplete='off' 
                                placeholder='Enter Last Name' />
                    </div>
                    <div className='col-12'>
                        <label className='form-label' htmlFor="Email"><strong>Email:</strong></label>
                        <input 
                                onChange={(e) => setName({...name, email:e.target.value})}
                                className='form-control rounded-0 mb-3'  
                                type="text" 
                                name="email" 
                                autoComplete='off' 
                                placeholder='Enter Email' />
                    </div>
                    <div className='col-12'>
                        <label className='form-label' htmlFor="Password"><strong>Password:</strong></label>
                        <input 
                                onChange={(e) => setName({...name, password:e.target.value})}
                                className='form-control rounded-0 mb-3'  
                                type="text" 
                                name="password" 
                                autoComplete='off' 
                                placeholder='Enter Password' />
                    </div>
                    <div className='col-12'>
                        <label className='form-label' htmlFor="Salary"><strong>Salary:</strong></label>
                        <input 
                                onChange={(e) => setName({...name, salary:e.target.value})}
                                className='form-control rounded-0 mb-3'  
                                type="text" 
                                name="salary" 
                                autoComplete='off' 
                                placeholder='Enter Salary' />
                    </div>
                    <div className='col-12'>
                        <label className='form-label' htmlFor="Address"><strong>Address:</strong></label>
                        <input 
                                onChange={(e) => setName({...name, address:e.target.value})}
                                className='form-control rounded-0 mb-3'  
                                type="text" 
                                name="Address" 
                                autoComplete='off' 
                                placeholder='Enter Address' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="SelectDepartment"><strong>Select Department:</strong></label>
                        <select 
                            onChange={(e) => setName({...name, department_id :e.target.value})}
                            name='department' 
                            id='department' 
                            className='form-select mb-3' >
                            {department.map(d => {
                            return <option key={d.id} value={d.id}>{d.Name}</option>})}
                        </select>
                    </div>
                    <div className='col-12'>
                        <label htmlFor="SelectImage"><strong>Select File:</strong></label>
                        <input 
                            onChange={(e) => setName({...name, imageFile :e.target.files[0]})}
                            type="file"
                            className='form-control rounded-0 mb-3'
                            name='SelectImage' />
                    </div>
                    <div className='col-12'>
                    <button className='btn btn-primary w-100'>Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
      )
}

export default Add_employee