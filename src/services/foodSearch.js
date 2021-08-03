export async function searchFoodByIngredient(ingredient) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function searchFoodByName(foodName) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function searchFoodByFirstLetter(firstLetter) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}
