import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { Badge, Button, Image } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipeCard({ item, index, onToggleFavorite }) {
  const [linkCopied, setLinkCopied] = useState('');

  const handleClickCopy = (recipe) => {
    const THREE_SECONDS = 3000;
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setLinkCopied(recipe.id);
    setInterval(() => setLinkCopied(''), THREE_SECONDS);
  };

  if (item.type === 'comida') {
    return (
      <section
        className="d-flex my-3 bg-light w-100"
        key={ item.id }
        style={ {
          position: 'relative',
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow:
          'rgba(0, 0, 0, 0.1) 0px 10px 15px, rgba(0, 0, 0, 0.05) 0px 4px 6px',
        } }
      >
        { linkCopied === item.id && (
          <div
            className="position-absolute bg-white d-flex
            justify-content-center align-items-center"
            style={ {
              top: 0,
              bottom: 0,
              width: '140px',
              opacity: 0.75,
            } }
          >
            Link copiado!
          </div>
        )}
        <Link to={ `/comidas/${item.id}` }>
          <img
            width="140px"
            height="100%"
            data-testid={ `${index}-horizontal-image` }
            alt="recipe"
            src={ item.image }
          />
        </Link>
        <section
          className="d-flex flex-column align-items-start p-2"
          style={ {
            flex: 1,
            justifyContent: 'space-between',
          } }
        >
          <div>
            <Link to={ `/comidas/${item.id}` }>
              <h4
                className="mb-1"
                style={ {
                  color: '#343a40',
                  fontWeight: 'bold',
                  fontSize: '18px',
                } }
                data-testid={ `${index}-horizontal-name` }
              >
                {item.name}

              </h4>
            </Link>
            <Badge
              variant="dark"
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${item.area} - ${item.category}`}
            </Badge>
          </div>
          <div
            className="d-flex align-items-center"
          >

            <Button
              variant="link"
              onClick={ () => onToggleFavorite(item.id) }
            >
              <Image
                src={ BlackHeartIcon }
                id={ item.id }
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </Button>
            <Button
              variant="light"
              onClick={ () => handleClickCopy(item) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                alt="share"
                src={ shareIcon }
              />
            </Button>
          </div>
        </section>
      </section>
    );
  }
  return (
    <section
      className="d-flex my-3 bg-light w-100"
      key={ item.id }
      style={ {
        position: 'relative',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow:
          'rgba(0, 0, 0, 0.1) 0px 10px 15px, rgba(0, 0, 0, 0.05) 0px 4px 6px',
      } }
    >
      { linkCopied === item.id && (
        <div
          className="position-absolute bg-white d-flex
            justify-content-center align-items-center"
          style={ {
            top: 0,
            bottom: 0,
            width: '140px',
            opacity: 0.75,
          } }
        >
          Link copiado!
        </div>
      )}
      <Link to={ `/bebidas/${item.id}` }>
        <img
          width="140px"
          height="100%"
          data-testid={ `${index}-horizontal-image` }
          alt="recipe"
          src={ item.image }
        />
      </Link>
      <section
        className="d-flex flex-column align-items-start p-2"
        style={ {
          flex: 1,
          justifyContent: 'space-between',
        } }
      >
        <div>
          <Link to={ `/bebidas/${item.id}` }>
            <h4
              className="mb-1"
              style={ {
                color: '#343a40',
                fontWeight: 'bold',
                fontSize: '18px',
              } }
              data-testid={ `${index}-horizontal-name` }
            >
              {item.name}

            </h4>
          </Link>
          <Badge
            variant="dark"
            data-testid={ `${index}-horizontal-top-text` }
          >
            {item.alcoholicOrNot}
          </Badge>
        </div>
        <div
          className="d-flex align-items-center"
        >

          <Button
            variant="link"
            onClick={ () => onToggleFavorite(item.id) }
          >
            <Image
              src={ BlackHeartIcon }
              data-testid={ `${index}-horizontal-favorite-btn` }
              id={ item.id }
            />
          </Button>
          <Button
            variant="light"
            onClick={ () => handleClickCopy(item) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              alt="share"
              src={ shareIcon }
            />
          </Button>
        </div>
      </section>
    </section>
  );
}

FavoriteRecipeCard.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default FavoriteRecipeCard;
