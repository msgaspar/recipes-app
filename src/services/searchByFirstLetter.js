export async function searchFoodByFirstLetter(word) {
  const firstLetter = word[0];
  const URL = `www.themealdb.com/api/json/v1/1/search.php?s=${firstLetter}`;
  const response = await fetch(URL);
  const data = response.json();
  return data;
}

export async function searchDrinkByFirstLetter(word) {
  const firstLetter = word[0];
  const URL = `www.thecocktaildb.com/api/json/v1/1/search.php?s=${firstLetter}`;
  const response = await fetch(URL);
  const data = response.json();
  return data;
}
