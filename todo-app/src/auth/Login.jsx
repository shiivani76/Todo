import React, { useContext, useEffect, useState } from 'react';

import AuthContext from './AuthContext';

function Login(props) {
    
    const {login, message, setMessage} = useContext(AuthContext);
    
    const [formData, setFormData]=useState();
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setFormData((prev)=>({
            ...prev,
            
            [name]: value
        }))
    }

    const submitForm=(e)=>{
        e.preventDefault();
        login(formData);
    }

    useEffect(()=>{
        setMessage("");
    }, [])

    return (
        <form>
            <div className="mb-3">
                <label className='form-label'>Email</label>
                <input type="text" name='email' className='form-control' onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className='form-label'>Password</label>
                <input type="password" name='password' className='form-control' onChange={handleChange} />
            </div>
            {message}
            <button className='btn btn-primary' onClick={submitForm}>Login</button>
        </form>
    );
}

export default Login;