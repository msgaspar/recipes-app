import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Image, Button, Badge, Row, Col, Container } from 'react-bootstrap';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeHeader({ imgUrl, title, category, isFavorite, toggleFavorite }) {
  const [linkCopied, setLinkCopied] = useState(false);

  function handleCopyLink() {
    const url = window.location.href
      .split('/')
      .filter((part) => part !== 'in-progress')
      .join('/');

    copy(url);
    setLinkCopied(true);

    const TWO_SECONDS = 2000;
    setTimeout(() => {
      setLinkCopied(false);
    }, TWO_SECONDS);
  }

  return (
    <Container as="header" className="p-0">
      { linkCopied && (
        <Row className="justify-content-center align-items-center">
          <p
            className="m-0 py-2"
          >
            Link copiado!

          </p>
        </Row>
      )}
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
            onClick={ handleCopyLink }
          >
            <Image
              fluid
              src={ ShareIcon }
            />
          </Button>
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
