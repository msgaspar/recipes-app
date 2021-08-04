import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button, Badge, Row, Col, Container } from 'react-bootstrap';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeHeader({ imgUrl, title, category }) {
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
          <Button
            data-testid="share-btn"
            variant="link"
          >
            <Image
              fluid
              src={ ShareIcon }
            />
          </Button>
          <Button
            data-testid="favorite-btn"
            variant="link"
          >
            <Image
              src={ WhiteHeartIcon }
            />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

RecipeHeader.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default RecipeHeader;
