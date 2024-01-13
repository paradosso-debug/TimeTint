import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', address: '', phone: '' });

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Implement login logic here
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/register', registerData);
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error
    }
  };

  return (
    <>
      <div className='main-container-loginform'>
        <div className='wrapperleft-loginform'>
          {isRegistering ? (
            // Registration Form
            <form className='login-form' onSubmit={handleRegisterSubmit}>
              <h1 className='login-logo'>Register</h1>
              <div className='input-box-loginform'>
                <input
                  type="text"
                  placeholder='Username'
                  required
                  value={registerData.username}
                  onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                />
                <FaUser className='icon' />
              </div>
              <div className='input-box-loginform'>
                <input
                  type="password"
                  placeholder='Password'
                  required
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                />
                <FaLock className='icon' />
              </div>
              <div className='input-box-loginform'>
                <input
                  type="text"
                  placeholder='Address'
                  required
                  value={registerData.address}
                  onChange={(e) => setRegisterData({...registerData, address: e.target.value})}
                />
              </div>
              <div className='input-box-loginform'>
                <input
                  type="tel"
                  placeholder='Phone Number'
                  required
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                />
              </div>
              <button type='submit' className='login-btn'>Register</button>
              <p className="register-login-link">Have an account? <a href="#" onClick={() => setIsRegistering(false)}>Back to Login</a></p>
            </form>
          ) : (
            // Login Form
            <form action="" className='login-form' onSubmit={handleLoginSubmit}>
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

              <div className="register-login-link">
                <p>Don't have an account? <a href="#" onClick={() => setIsRegistering(true)}>Register</a></p>
              </div>
            </form>
          )}
        </div>

        <div className='wrapperright-loginform'>Hello</div>
      </div>
    </>
  );
}

export default LoginForm;
