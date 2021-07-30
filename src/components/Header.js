import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

export default function Header({ title, showSearchIcon }) {
  return (
    <header className="container" style={ { backgroundColor: '#E3E3E3' } }>
      <div className="row align-items-center" style={ { height: '60px' } }>
        <div className="col-2">
          <Link to="/perfil">
            <img
              data-testid="profile-top-btn"
              src={ ProfileIcon }
              alt="link para perfil"
            />
          </Link>
        </div>
        <h1 data-testid="page-title" className="m-0 h4 col-8 text-center">{title}</h1>
        <div className="col-2">
          { showSearchIcon
        && <img data-testid="search-top-btn" src={ SearchIcon } alt="buscar receita" />}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool,
};

Header.defaultProps = {
  showSearchIcon: false,
};
