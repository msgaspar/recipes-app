import React from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

export default function Header({ title }) {
  return (
    <div className="p-4 d-flex justify-content-between align-items-center">
      <img data-testid="profile-top-btn" src={ ProfileIcon } alt="link para perfil" />
      <h1 data-testid="page-title" className="m-0">{title}</h1>
      <img data-testid="search-top-btn" src={ SearchIcon } alt="buscar receita" />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
