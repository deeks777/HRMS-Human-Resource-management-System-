import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/auth/employee')
            .then(result => {
                console.log(result.data)
                if (result.data.Status) {
                    setEmployee(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));

        // Fetch departments
        axios.get('http://localhost:3000/auth/departments')
            .then(result => {
                if (result.data.Status) {
                    console.log('Departments fetched:', result.data.Result); // Debugging log
                    setDepartments(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (filter === 'salary') {
            axios.get('http://localhost:3000/auth/employee_by_salary')
                .then(result => {
                    if (result.data.Status) {
                        setEmployee(result.data.Result);
                    } else {
                        alert(result.data.Error);
                    }
                })
                .catch(err => console.log(err));
        } else if (filter === 'department' && selectedDepartment) {
            axios.get(`http://localhost:3000/auth/employee_by_department/${selectedDepartment}`)
                .then(result => {
                    if (result.data.Status) {
                        setEmployee(result.data.Result);
                    } else {
                        alert(result.data.Error);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [filter, selectedDepartment]);

    const navigate = useNavigate();
    const handleClick = (id) => {
        axios.delete('http://localhost:3000/auth/delete_employee/' + id)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload();
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
        setFilter('department');
    }

    return (
        <div className='mt-3 px-5'>
            <div className='d-flex justify-content-center'>
                <h4 className='fw-bolder'>Employee List</h4>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                <Link to='/dashboard/add_employee' className='btn btn-success'>Add Employee</Link>
                <div>
                    <select className='form-select' onChange={handleFilterChange}>
                        <option value=''>Filter by</option>
                        <option value='department'>Department</option>
                        <option value='salary'>Salary</option>
                    </select>
                    {filter === 'department' && (
                        <select className='form-select mt-2' onChange={handleDepartmentChange}>
                            <option value=''>Select Department</option>
                            {departments.map(dept => (
                                <option key={dept.id} value={dept.id}>{dept.Name}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>
            <div className='mt-5'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Log</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        employee.map(e => (
                            <tr key={e.id} value={e.id}>
                                <td><img src={'http://localhost:3000/images/' + e.image} alt="" className='employee_img' /></td>
                                <td>{e.fname}</td>
                                <td>{e.lname}</td>
                                <td>Punched {e.punched_in ? 'IN' : 'OUT'}</td>
                                <td>{e.department_name}</td>
                                <td>{e.salary}</td> 
                                <td>
                                    <Link to = {'/dashboard/edit_employee/' + e.id} className='btn btn-info btn-sm me-2'>Edit</Link>
                                    <button className='btn btn-warning btn-sm' onClick={() => handleClick(e.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Employee;
