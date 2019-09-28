import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/user/userContext";
const Navbar = () => {
  const userContext = useContext(UserContext);
  const { isAuthenticated, logout } = userContext;

  const onLogout = () => {
    logout();
  };

  const guestLinks = (
    <Fragment>
      <li className='nav-links__link'>
        <Link to='/about'> About</Link>
      </li>
      <li className='nav-links__link'>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li className='nav-links__link'>
        <Link to='/about'>About</Link>
      </li>
      <li className='nav-links__link'>
        <Link to='/home'>Routines</Link>
      </li>
      <li className='nav-links__link'>
        <a onClick={onLogout} href='#!'>
          Logout
        </a>
      </li>
    </Fragment>
  );
  return (
    <nav className='Nav'>
      <header className='Header'>
        <Link to='/'>
          Routiner<span className='logo-highlight'>.</span>
        </Link>
      </header>
      <ul className='nav-links'>{isAuthenticated ? authLinks : guestLinks}</ul>
    </nav>
  );
};

export default Navbar;
