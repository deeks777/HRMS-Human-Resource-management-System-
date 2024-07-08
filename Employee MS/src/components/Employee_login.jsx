import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Employee_login = () => {
    axios.defaults.withCredentials = true;
    const [value, setValue] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const key = 17324;

    const [error, setError] = useState(null);

    function handleSubmit(event){
        event.preventDefault();

        axios.post('http://localhost:3000/employee/employee_login', value)
        .then(result => {
            console.log(result.data.id)
            if(result.data.loginStatus){ 
                localStorage.setItem('loggedIn', true);
                navigate(`/employee_dashboard/${key + result.data.id}`);
                // document.cookie = `employee_token=${response.data.token}; Secure; SameSite=Strict`;
            }else{
                setError(result.data.Error);            
            }
        })
        .catch(err => console.log(err))

    }

    
    return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 border rounded w-25 loginForm'>
            <div className='text-warning'>
                {error && error}
            </div>
            <h2>Employee Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Email"><strong>Email:</strong></label>
                    <input onChange={(e) => setValue({...value, email:e.target.value})} className='form-control rounded-0 mb-3'  type="email" name="email" autoComplete='off' placeholder='Enter Email' />
                </div>
                <div>
                    <label htmlFor="Password"><strong>Password:</strong></label>
                    <input onChange={(e) => setValue({...value, password:e.target.value})} className='form-control rounded-0 mb-3' type="Password" name="Password" autoComplete='off' placeholder='Enter Password' />
                </div>
                {/* <div>
                    <input className='mb-3 me-2' type="checkbox" name="tick" id="tick" />
                    <label htmlFor="check"> I Agree with Terms&Conditions</label>
                </div> */}
                <button className='btn btn-success w-100'>Log in</button>
            </form>
        </div>
    </div>
  )
}

export default Employee_login