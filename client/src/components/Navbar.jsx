import React from 'react'
import { Link } from "react-router-dom";
import {Icon} from '@iconify/react';

const Navbar = () => {


  return (
    <>
    <header className='header'>
     <div className='brand-name'>TimeTint</div>
     
        
            <Link to='/' className='nav-links'>Home</Link>
            <Link to='/login' className='nav-links'>Login</Link>
            <Link to='/sign-up' className='nav-links'>Register</Link>
            <Link to='/products' className='nav-links'>Products</Link>
        <div className='cart-icon'>
       <Link to='/cart'> <Icon icon='solar:cart-5-line-duotone' color='white'></Icon></Link>
        </div>
    </header>
    </>
  )
}

export default Navbar