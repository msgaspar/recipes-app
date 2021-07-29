export async function searchFoodByIngredient(ingredient) {
  const URL = `www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const data = response.json();
  return data;
}

export async function searchDrinkByIngredient(ingredient) {
  const URL = `www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const data = response.json();
  return data;
}
