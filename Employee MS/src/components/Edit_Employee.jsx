import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';


const Edit_Employee = () => {

    const {id} = useParams();
    const [name, setName] = useState({
        fname:'',
        lname:'',
        email:'',
        salary:'',
        address:'',
        department_id:'',
    })

    const [department, setDepartment] = useState([]);

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

        axios.get('http://localhost:3000/auth/employee/' + id)
        .then(result => {
                if(result.data.Status){
                    setName({
                        ...name,
                        fname:result.data.Result[0].fname,
                        lname:result.data.Result[0].lname,
                        email:result.data.Result[0].email,
                        salary:result.data.Result[0].salary,
                        address:result.data.Result[0].address,
                        department_id:result.data.Result[0].department_id,
                    });
                }else{
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, [])

    const navigate = useNavigate();
    const handleSubmit = (event) =>{
        event.preventDefault();

        axios.put('http://localhost:3000/auth/edit_employee/' + id, name)
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard/employee')
            }else{
                alert(result.data.Error);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center mt-3 '>
            <div className='p-3 border rounded w-50 '>
                <h3 className='text-center'>Edit Employee</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label className='form-label' htmlFor="FirstName"><strong>First Name:</strong></label>
                        <input  
                                onChange={(e) => setName({...name, fname:e.target.value})}
                                className='form-control rounded-0 mb-3'  
                                value={name.fname}
                                type="text" 
                                id='FirstName'
                                placeholder='Enter First Name' />
                    </div>
                    <div className='col-12'>
                        <label className='form-label' htmlFor="LastName"><strong>Last Name:</strong></label>
                        <input 
                                onChange={(e) => setName({...name, lname:e.target.value})}
                                className='form-control rounded-0 mb-3'  
                                value={name.lname}
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
                                value={name.email}
                                type="text" 
                                name="email" 
                                autoComplete='off' 
                                placeholder='Enter Email' />
                    </div>
                    <div className='col-12'>
                        <label className='form-label' htmlFor="Salary"><strong>Salary:</strong></label>
                        <input 
                                onChange={(e) => setName({...name, salary:e.target.value})}
                                className='form-control rounded-0 mb-3'  
                                value={name.salary}
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
                                value={name.address}
                                type="text" 
                                name="Address" 
                                autoComplete='off' 
                                placeholder='Enter Address' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="SelectDepartment"><strong>Select Department:</strong></label>
                        <select 
                            onChange={(e) => setName({...name, department_id :e.target.value})}
                            value={name.department_id}
                            name='department' 
                            id='department' 
                            className='form-select mb-3' >
                            {department.map(d => {
                            return <option key={d.id} value={d.id}>{d.Name}</option>})}
                        </select>
                    </div>
                    <div className='col-12'>
                    <button className='btn btn-primary w-100'>Edit Employee</button>
                    </div>
                </form>
            </div>
        </div>
      )
}

export default Edit_Employee