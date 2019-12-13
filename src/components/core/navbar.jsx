import React from 'react';
import logoPipe from './../../assets/logoPipe.png';

const NavBar = () => {
  return (
    <nav className='nav'>
      <span className='navbar-brand'>
        <img className='ml-2 logo' src={logoPipe} alt='' />
      </span>
    </nav>
  );
};

export default NavBar;
