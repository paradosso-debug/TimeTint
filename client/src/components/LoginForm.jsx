import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', address: '', phone: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (!loginData.username || !loginData.password) {
      console.error('Both username and password are required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5001/api/login', loginData);
      console.log(response.data);
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/register', registerData);
      console.log(response.data);
      setSuccessMessage("Registration successful. You can now log in.");
      setRegisterData({ username: '', password: '', address: '', phone: '' });
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      setIsRegistering(false);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      <div className='main-container-loginform'>
        <div className='wrapperleft-loginform'>
          {successMessage && <p className="success-message">{successMessage}</p>}

          {isRegistering ? (
            <form className='login-form' onSubmit={handleRegisterSubmit}>
              <h1 className='login-logo'>Register</h1>
              <div className='input-box-loginform'>
                <input 
                  type="text" 
                  name="username" 
                  placeholder='Username' 
                  required
                  value={registerData.username}
                  onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                />
                <FaUser className='icon'/>
              </div>
              <div className='input-box-loginform'>
                <input 
                  type="password" 
                  name="password" 
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
                  name="address" 
                  placeholder='Address' 
                  required
                  value={registerData.address}
                  onChange={(e) => setRegisterData({...registerData, address: e.target.value})}
                />
              </div>
              <div className='input-box-loginform'>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder='Phone Number' 
                  required
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                />
              </div>
              <button type='submit' className='login-btn'>Register</button>
              <p className="register-login-link">Have an account? <a href="#" onClick={(e) => {
                e.preventDefault();
                setIsRegistering(false);
              }}>Back to Login</a></p>
            </form>
          ) : (
            <form className='login-form' onSubmit={handleLoginSubmit}>
              <h1 className='login-logo'>Login</h1>
              <div className='input-box-loginform'>
                <input 
                  type="text" 
                  name="username" 
                  placeholder='Username' 
                  required
                  value={loginData.username}
                  onChange={handleLoginInputChange}
                />
                <FaUser className='icon'/>
              </div>
              <div className='input-box-loginform'>
                <input 
                  type="password" 
                  name="password" 
                  placeholder='Password' 
                  required
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                />
                <FaLock className='icon' />
              </div>
              <div className="remember-forgot">
                <label><input type="checkbox" />Remember me</label>
                <a href="#">Forgot Password?</a>
              </div>
              <button type='submit' className='login-btn'>Login</button>
              <div className="register-login-link">
                <p>Don't have an account? <a href="#" onClick={(e) => {
                  e.preventDefault();
                  setIsRegistering(true);
                }}>Register</a></p>
              </div>
            </form>
          )}
        </div>

        <div className='wrapperright-loginform'>Hello</div>
      </div>
    </>
  );
};

export default LoginForm;
