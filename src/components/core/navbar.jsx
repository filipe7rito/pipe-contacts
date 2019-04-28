import React from 'react';
import logoIban from './../../assets/logoIban.png';

const NavBar = () => {
  return (
    <nav className="nav">
      <span className="navbar-brand">
        <img className="ml-2 logo" src={logoIban} alt="" />
      </span>
    </nav>
  );
};

export default NavBar;
