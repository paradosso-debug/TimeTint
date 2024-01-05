import React from 'react'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const LoginForm = () => {
  return (
    <>
    <div className='main-container-loginform'>
    <div className='wrapperleft-loginform'>
        <form action="" className='login-form'>
            <h1 className='login-logo'>Login</h1>
            <div className='input-box-loginform'>
                <input type="text" placeholder='Username' required/>
                <FaUser className='icon'/>
            </div>
            <div className='input-box-loginform'>
                <input type="password" placeholder='Password' required/>
                <FaLock className='icon' />
            </div>
           <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="#">Forgot Password?</a>
           </div>

           <button type='submit' className='login-btn'>Login</button>

           <div className="register-link">
            <p>Don't have an account? <a href="#">Register</a></p>
           </div>
        </form>
    </div>

    <div className='wrapperright-loginform'>Hello</div>
    </div>
    </>
  )
}

export default LoginForm