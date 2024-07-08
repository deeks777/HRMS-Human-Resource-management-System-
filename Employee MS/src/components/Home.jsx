import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';




const Home = () => {

  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admin, setAdmin] = useState([]);


  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    getAdmin();

  }, [])

  const adminCount =() => {
      axios.get('http://localhost:3000/auth/admin_count')
      .then(result => 
        {
        if(result.data.Status){
          setAdminTotal(result.data.Result[0].count);
        }else{
          alert(result.data.Result);
        }
      })
      .catch(err => console.log(err));
  }

  const employeeCount =() => {
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result => {
      if(result.data.Status){
        setEmployeeTotal(result.data.Result[0].count);
      }else{
        alert(result.data.Result);
      }
    })
    .catch(err => console.log(err));
}

const salaryCount =() => {
  axios.get('http://localhost:3000/auth/salary_count')
  .then(result => {
    if(result.data.Status){
      setSalaryTotal(result.data.Result[0].total_salary);
    }else{
      alert(result.data.Result);
    }
  })
  .catch(err => console.log(err));
}

const getAdmin = () => {
  axios.get('http://localhost:3000/auth/admin')
    .then(result =>{
      // console.log(result.data)
      if(result.data.Status){
      setAdmin(result.data.Result);
    }else{
      alert(result.data.Error);
    }
  })
    .catch(err => console.log(err));
}

const handleClick = (id) => {
  axios.delete('http://localhost:3000/auth/admin_delete/' +id)
  .then(result => {
    // console.log(result)
    if(result.data.Status){
      window.location.reload();
    }else{
      alert(result.data.Error);
    }
  })
  .catch(err => console.log(err));
}

  return (
    <div className='mt-5'>
      <div className='p-3 d-flex justify-content-around'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center'>
            <h4>Admins</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between align-items-center'>
            <h4>Total:</h4>
            <h6>{adminTotal}</h6>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center'>
            <h4>Employees</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between align-items-center'>
            <h4>Total:</h4>
            <h6>{employeeTotal}</h6>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between align-items-center'>
            <h4>Total:</h4>
            <h6>{salaryTotal}</h6>
          </div>
        </div>
      </div>
      <div className='px-5 mt-5'>
        <h3>Admin List</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
                {
                  admin.map(a => (
                    <tr key = {a.id}>
                      <td>
                        {a.email}
                      </td>
                      <td>
                        <Link to = {'/dashboard/edit_admin/' + a.id} className='btn btn-info btn-sm me-2'>Edit</Link>
                        <button className='btn btn-warning btn-sm' onClick = {() => handleClick(a.id)}>Delete</button>
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

export default Home