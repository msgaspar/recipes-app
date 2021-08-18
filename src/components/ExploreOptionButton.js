import React from 'react';
import PropTypes from 'prop-types';

function ExploreOptionButton({ color, handleClick, icon, text, ...otherProps }) {
  return (
    <button
      className="w-100 my-2
            d-flex flex-column justify-content-center align-items-center"
      style={ {
        border: 'none',
        borderRadius: '8px',
        flexGrow: 1,
        backgroundColor: color,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '24px',
      } }
      type="button"
      { ...otherProps }
      onClick={ handleClick }
    >
      <img
        style={ {
          width: '60px',
          marginBottom: '14px',
          marginTop: '10px',
        } }
        src={ icon }
        alt="Explorar bebidas"
      />
      { text }
    </button>
  );
}

ExploreOptionButton.propTypes = {
  color: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default ExploreOptionButton;
