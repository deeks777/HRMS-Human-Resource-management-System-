import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';


function Dashboard() {

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleLogout = () =>{
        axios.get('http://localhost:3000/auth/admin_logout')
        .then(result => {
            // console.log(result)
            if(result.data.Status){
                localStorage.removeItem('loggedIn');
                navigate('/')
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err));
    }

  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <div className='d-flex justify-content-center w-100'>
              <Link to='/dashboard'
                className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 text-white text-decoration-none'>
                <h1 className='fs-5 fw-bolder'>MANage</h1>
              </Link>
            </div>
            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
              <li className='nav-item w-100'>
                <Link to='/dashboard'
                  className='nav-link text-white px-0 align-middle hover-bg d-flex align-items-center'>
                  <i className='fs-4 bi bi-speedometer2 ms-2'></i>
                  <span className='ms-2 d-none d-sm-inline'>Home</span>
                </Link>
              </li>
              <li className='nav-item w-100'>
                <Link to='/dashboard/employee'
                  className='nav-link text-white px-0 align-middle hover-bg d-flex align-items-center'>
                  <i className='fs-4 bi bi-people ms-2'></i>
                  <span className='ms-2 d-none d-sm-inline'>Manage Employees</span>
                </Link>
              </li>
              <li className='nav-item w-100'>
                <Link to='/dashboard/departments'
                  className='nav-link text-white px-0 align-middle hover-bg d-flex align-items-center'>
                  <i className='fs-4 bi bi-diagram-3 ms-2'></i>
                  <span className='ms-2 d-none d-sm-inline'>Departments</span>
                </Link>
              </li>
              {/* <li className='nav-item w-100'>
                <Link to='/dashboard/profile'
                  className='nav-link text-white px-0 align-middle hover-bg d-flex align-items-center'>
                  <i className='fs-4 bi bi-person ms-2'></i>
                  <span className='ms-2 d-none d-sm-inline'>Profile</span>
                </Link>
              </li> */}
              <li className='nav-item w-100' onClick = {handleLogout}>
                <Link
                  className='nav-link text-white px-0 align-middle hover-bg d-flex align-items-center'>
                  <i className='fs-4 bi bi-box-arrow-right ms-2'></i>
                  <span className='ms-2 d-none d-sm-inline'>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='col p-0 m-0 '>
            <div className='p-2 d-flex justify-content-center shadow '>
                <h3 className=' fw-bolder'>Human Resource Management System</h3>
            </div>
            <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
