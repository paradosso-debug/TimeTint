import React from 'react'
import { Link } from "react-router-dom";
import {Icon} from '@iconify/react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <>
    <header className='header'>
     
            <Link to='/' className='brand-name'>TimeTint</Link>
            <Link to='/' className='nav-links'>Home</Link>
            <Link to='/login' className='nav-links'>Login</Link>
            <Link to='/sign-up' className='nav-links'>Register</Link>
            <Link to='/products' className='nav-links'>Products</Link>
            <div className='cart-icon'>
          <Link to='/cart'>
            <Icon icon='solar:cart-5-line-duotone' color='white'></Icon>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>} {/* Display the cart count if it is greater than 0 */}
          </Link>
        </div>
    </header>
    </>
  )
}

export default Navbar