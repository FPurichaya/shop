import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const TopNavigation = ({ isAuthenticated, logout, isAdmin }) => (
  <div className="ui secondary pointing menu">
    <NavLink exact to="/" className="item">
      BGShop
    </NavLink>
    <NavLink exact to="/games" className="item">
      Games
    </NavLink>
    {isAdmin && (
      <NavLink exact to="/games/new" className="item">
        <i className="icon plus"></i>Add New Game{' '}
      </NavLink>
    )}

    {isAuthenticated ? (
      <div className="right menu">
        {/* eslint-disable-next-line */}
        <a onClick={logout} className="item">
          Log out
        </a>
      </div>
    ) : (
      <div className="right menu">
        <NavLink to="/signup" className="item">
          Signup
        </NavLink>
        <NavLink to="/login" className="item">
          Login
        </NavLink>
      </div>
    )}
  </div>
);

TopNavigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default TopNavigation;
