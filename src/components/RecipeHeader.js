import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import { Image, Button, Badge, Row, Col, Container } from 'react-bootstrap';
import useLocalStorage from '../hooks/useLocalStorage';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import CopyLinkButton from './CopyLinkButton';

function RecipeHeader({ imgUrl, category, name, type, area, alcoholicOrNot }) {
  const { id } = useParams();
  const location = useLocation();
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const isFavorite = favoriteRecipes.some((recipe) => recipe.id === id);

  function handleToggleFavorite() {
    if (isFavorite) {
      const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
      setFavoriteRecipes(newFavoriteRecipes);
    } else {
      setFavoriteRecipes([...favoriteRecipes, {
        id,
        type,
        area,
        category,
        name,
        image: imgUrl,
        alcoholicOrNot,
      }]);
    }
  }

  function handleCategoryByRoute() {
    const currentRoute = location.pathname.split('/')[1];
    if (currentRoute === 'comidas') {
      return category;
    } return alcoholicOrNot;
  }

  return (
    <Container as="header" className="p-0">
      <Row>
        <Col className="p-0">
          <Image
            fluid
            src={ imgUrl }
            alt="Foto"
            data-testid="recipe-photo"
          />
        </Col>
      </Row>
      <Row className="pt-3 align-items-start">
        <Col xs={ 8 }>
          <h2 className="m-0" data-testid="recipe-title">{ name }</h2>
          <h5>
            <Badge
              as="p"
              className="mt-2 mb-4"
              variant="secondary"
              data-testid="recipe-category"
            >
              {handleCategoryByRoute()}
            </Badge>
          </h5>
        </Col>
        <Col xs={ 4 } className="px-0 d-flex">
          <CopyLinkButton />
          <Button
            variant="link"
            onClick={ handleToggleFavorite }
          >
            <Image
              data-testid="favorite-btn"
              src={ isFavorite ? BlackHeartIcon : WhiteHeartIcon }
            />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

RecipeHeader.propTypes = {
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.oneOf(['comida', 'bebida']).isRequired,
  area: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
};

RecipeHeader.defaultProps = {
  imgUrl: '',
  alcoholicOrNot: '',
  name: '',
  category: '',
  area: '',
};

export default RecipeHeader;
