import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import RecipeHeader from '../components/RecipeHeader';
import IngredientsCheckList from '../components/IngredientsCheckList';

export default function InProcessDrink() {
  const ingredients = [
    'white flour',
    'salt',
    'yeast',
  ];

  return (
    <Container>
      <RecipeHeader
        imgUrl="https://www.themealdb.com/images/media/meals/bc8v651619789840.jpg"
        title="Nome receita"
        category="Árabe"
      />
      <IngredientsCheckList ingredients={ ingredients } />
      <div>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
          className="mt-3 ml-3"
        >
          Aqui as instruções de como fazer essa receitinha maravilhosa
        </p>
      </div>

      <Row>
        <Col className="d-flex justify-content-center">
          <Button
            className="w-100 my-3 py-2"
            style={ {
              fontSize: '20px',
            } }
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
