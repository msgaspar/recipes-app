export async function searchFoodByName(foodName) {
  const URL = `www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
  const response = await fetch(URL);
  const data = response.json();
  return data;
}

export async function searchDrinkByName(drinkName) {
  const URL = `www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
  const response = await fetch(URL);
  const data = response.json();
  return data;
}
