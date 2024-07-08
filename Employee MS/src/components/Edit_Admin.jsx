import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Edit_Admin = () => {
    const {id} = useParams();

    const [admin, setAdmin] = useState({
        email:'',
        password:'',
    })


    useEffect(() => {
        axios.get('http://localhost:3000/auth/edit_admin/' + id)
        .then(result => {
            // console.log(result.data)
            if(result.data.Status){
                setAdmin({
                    ...admin,
                    email:result.data.Result[0].email,
                    password:result.data.Result[0].password
                })
            }else{
                alert(result.data.Error);
            }
        })
        .catch(err => console.log(err));
    },[])

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put('http://localhost:3000/auth/edit_admin_confirm/' + id, admin)
        .then(result => {
            // console.log(result.data)
            if(result.data.Status){
                navigate('/dashboard')
            }else{
                alert(result.data.Error);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center h-75 '>
            <div className='p-3 border rounded w-25 '>
                <h2>Edit Admin Info</h2>
                <form 
                onSubmit = {handleSubmit}
                >
                    <div className='mt-3'>
                        <label htmlFor="Email"><strong>Email:</strong></label>
                        <input
                                onChange={(e) => setAdmin({...admin, email:e.target.value})}
                                className='form-control rounded-0 mb-3'  
                                value={admin.email}
                                type="email" 
                                name="email" 
                                autoComplete='off' 
                                placeholder='Enter Email' />
                    </div>
                    <div>
                        <label htmlFor="Password"><strong>Password:</strong></label>
                        <input
                                onChange = {(e) => setAdmin({...admin, password:e.target.value})}
                                className='form-control rounded-0 mb-3'  
                                type="text" 
                                name="password" 
                                value = {admin.password}
                                autoComplete='off' 
                                placeholder='Enter Password' />
                    </div>
                    <button className='btn btn-success w-100'>Edit</button>
                </form>
            </div>
        </div>
      )
}

export default Edit_Admin;