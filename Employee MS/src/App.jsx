import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Home from './components/Home';
import Employee from './components/Employee';
import Departments from './components/departments';
import Profile from './components/profile';
import Add_department from './components/Add_department';
import Add_employee from './components/Add_employee';
import Edit_Employee from './components/Edit_Employee';

import Edit_Admin from './components/Edit_Admin';
import Start from './components/Start';
import Employee_login from './components/Employee_login';
import Employee_dashboard from './components/Employee_dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Start />}> </Route>
        <Route path = '/employee_login' element = {<Employee_login />}> </Route>
        <Route path = '/adminlogin' element = {<Login />}> </Route>
        <Route path = '/employee_dashboard/:id' element = {<PrivateRoute><Employee_dashboard /></PrivateRoute>}> </Route>
        <Route path = '/dashboard' element = {<PrivateRoute> <Dashboard /></PrivateRoute>}>
          <Route path='' element = {<Home/>} > </Route>
          <Route path='/dashboard/employee' element = {<Employee/>} > </Route>
          <Route path='/dashboard/departments' element = {<Departments/>} > </Route>
          {/* <Route path='/dashboard/profile' element = {<Profile/>} > </Route>  */}
          <Route path='/dashboard/add_department' element = {<Add_department/>} > </Route> 
          <Route path='/dashboard/add_employee' element = {<Add_employee/>} > </Route>
          <Route path='/dashboard/edit_employee/:id' element = {<Edit_Employee/>} > </Route>
          <Route path='/dashboard/edit_admin/:id' element = {<Edit_Admin/>} > </Route>   
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
