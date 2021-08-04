import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import FoodRecipes from './pages/FoodRecipes';
import DrinkRecipes from './pages/DrinkRecipes';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import InProcessFood from './pages/InProcessFood';
import InProcessDrink from './pages/InProcessDrink';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsByIngredients from './pages/ExploreFoodsByIngredients';
import ExploreDrinksByIngredients from './pages/ExploreDrinksByIngredients';
import ExploreFoodsByArea from './pages/ExploreFoodsByArea';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/comidas" exact component={ FoodRecipes } />
        <Route path="/bebidas" exact component={ DrinkRecipes } />
        <Route path="/comidas/:id" exact component={ FoodDetails } />
        <Route path="/bebidas/:id" exact component={ DrinkDetails } />
        <Route path="/comidas/:id/in-progress" component={ InProcessFood } />
        <Route path="/bebidas/:id/in-progress" component={ InProcessDrink } />
        <Route path="/explorar" exact component={ Explore } />
        <Route path="/explorar/comidas" exact component={ ExploreFoods } />
        <Route path="/explorar/bebidas" exact component={ ExploreDrinks } />
        <Route
          path="/explorar/comidas/ingredientes"
          exact
          component={ ExploreFoodsByIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          exact
          component={ ExploreDrinksByIngredients }
        />
        <Route path="/explorar/comidas/area" exact component={ ExploreFoodsByArea } />
        <Route path="/perfil" exact component={ Profile } />
        <Route path="/receitas-feitas" exact component={ DoneRecipes } />
        <Route path="/receitas-favoritas" exact component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}
