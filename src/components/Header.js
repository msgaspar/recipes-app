import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, showSearchIcon }) {
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  function toggleSearchBar() {
    setSearchIsOpen(!searchIsOpen);
  }

  return (
    <header
      style={ {
        position: 'fixed',
        backgroundColor: '#fff',
        zIndex: 1,
      } }
      className="container"
    >
      <div
        className="d-flex align-items-center justify-content-between px-3"
        style={ {
          height: '80px',
        } }
      >
        <div>
          <Link to="/perfil">
            <img
              style={ {
                width: '30px',
              } }
              data-testid="profile-top-btn"
              src={ ProfileIcon }
              alt="link para perfil"
            />
          </Link>
        </div>
        <h1
          data-testid="page-title"
          className="m-0 h4 font-weight-bold text-center mt-1"
        >
          {title}
        </h1>
        <div
          className="d-flex justify-content-center"
          style={ {
            width: '30px',
          } }
        >
          { showSearchIcon
          && (
            <button
              type="button"
              style={ {
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'center',
              } }
              onClick={ toggleSearchBar }
            >
              <img
                style={ {
                  width: '24px',
                } }
                data-testid="search-top-btn"
                src={ SearchIcon }
                alt="buscar receita"
              />
            </button>
          )}
        </div>
      </div>
      {
        searchIsOpen && (
          <SearchBar />
        )
      }
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
