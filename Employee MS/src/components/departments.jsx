import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Departments = () => {

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
    }, [])

  return (
    <div className='mt-3 px-5'>
        <div className='d-flex justify-content-center'>
            <h4 className='fw-bolder'>Departments</h4>
        </div>
        <Link to='/dashboard/add_department' className='btn btn-success'>Add Department</Link>
        <div className='mt-5'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                        {department.map(d => (
                            <tr key={d.id} value={d.id}>
                                <td>{d.Name}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Departments