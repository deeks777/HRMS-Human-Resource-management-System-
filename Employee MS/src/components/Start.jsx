import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3000/verify')
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate(`/employee_dashboard/${17324 + result.data.id}`);
          }
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 border rounded w-25 loginForm'>
        <div className='text-warning'>
        </div>
        <h2 className='text-center'>Login</h2>
        <form className='d-flex justify-content-around mt-4'>
          <Link to='/employee_login' className='btn btn-primary'>Employee</Link>
          <Link to='/adminLogin' className='btn btn-success'>Admin</Link>
        </form>
      </div>
    </div>
  )
}

export default Start;
