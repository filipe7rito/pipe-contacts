import React from 'react';
import logPipe from './../../assets/logoPipe.png';

const NavBar = () => {
  return (
    <nav className="nav">
      <span className="navbar-brand">
        <img className="ml-2" src={logPipe} alt="" />
      </span>
    </nav>
  );
};

export default NavBar;
