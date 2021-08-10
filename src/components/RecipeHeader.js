import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button, Badge, Row, Col, Container } from 'react-bootstrap';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import CopyLinkButton from './CopyLinkButton';

function RecipeHeader({ imgUrl, title, category, isFavorite, toggleFavorite }) {
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
          <h2 className="m-0" data-testid="recipe-title">{ title }</h2>
          <h5>
            <Badge
              as="p"
              className="mt-2 mb-4"
              variant="secondary"
              data-testid="recipe-category"
            >
              {category}
            </Badge>
          </h5>
        </Col>
        <Col xs={ 4 } className="px-0 d-flex">
          <CopyLinkButton />
          <Button
            variant="link"
            onClick={ toggleFavorite }
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
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default RecipeHeader;
