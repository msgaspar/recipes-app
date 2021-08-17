import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Badge } from 'react-bootstrap';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard({ item, index }) {
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
          height: '150px',
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
              fontWeight: 'bold',
              opacity: 0.85,
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
            objectFit="cover"
          />
        </Link>
        <section
          className="d-flex flex-column align-items-start p-2"
          style={ {
            flex: 1,
            justifyContent: 'space-between',
          } }
        >
          <div
            className="d-flex flex-column align-items-start"
          >
            <Link to={ `/comidas/${item.id}` }>
              <h4
                className="mb-2 ml-2"
                style={ {
                  color: '#343a40',
                  fontWeight: 'bold',
                  fontSize: '20px',
                } }
                data-testid={ `${index}-horizontal-name` }
              >
                {item.name}

              </h4>
            </Link>
            <Badge
              className="mb-1 ml-2"
              variant="dark"
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${item.area} - ${item.category}`}
            </Badge>
            <Badge
              className="mb-1 ml-2"
              variant="warning"
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Feita em ${item.doneDate}`}

            </Badge>
            <Badge
              className="ml-2"
              variant="info"
            >
              {item.tags.map((itemTag, indexTag) => (
                <span
                  data-testid={ `${index}-${itemTag}-horizontal-tag` }
                  key={ indexTag }
                >
                  {itemTag}
                </span>
              ))}
            </Badge>
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
        height: '150px',
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
            opacity: 0.85,
            fontWeight: 'bold',
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
        className="d-flex flex-column align-items-start p-2 justify-content-between"
        style={ {
          flex: 1,
          justifyContent: 'space-between',
        } }
      >
        <div className="d-flex flex-column align-items-start">
          <Link to={ `/bebidas/${item.id}` }>
            <h4
              className="mb-2 ml-2"
              style={ {
                color: '#343a40',
                fontWeight: 'bold',
                fontSize: '20px',
              } }
              data-testid={ `${index}-horizontal-name` }
            >
              {item.name}

            </h4>
          </Link>
          <Badge
            className="mb-1 ml-2"
            variant="dark"
            data-testid={ `${index}-horizontal-top-text` }
          >
            {item.alcoholicOrNot}
          </Badge>
          <Badge
            className="mb-1 ml-2"
            variant="warning"
            data-testid={ `${index}-horizontal-done-date` }
          >
            {`Feita em ${item.doneDate}`}

          </Badge>
        </div>
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
      </section>
    </section>
  );
}

DoneRecipeCard.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    tags: PropTypes.arrayOf({
      itemTag: PropTypes.string,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
