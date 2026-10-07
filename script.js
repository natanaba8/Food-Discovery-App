const API_URL = "https://dummyjson.com/recipes";

const STORAGE_KEY = "food-discovery-favorite";

const main = document.querySelector("#main");
const favorite = document.querySelector("#favorite");
const form = document.querySelector(".search-form");
const searchInput = document.querySelector("#searchInput");
const favoritebtn = document.querySelector("#header-button");

const state = {
  recipes: [],
  favorites: [],
  search: "",
};

function loadfavorite() {
  try {
    const save = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(save) ? save : [];
  } catch {
    return [];
  }
}

function StoreFavorite() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorite));
}

function AddCard(item) {
  const isFavorite = state.favorites.some((item) => item.id === recipes.id);

  return `
        <article class="article">
            <img src="${item.image}" alt="show image" />

            <div class="main-content">
              <p class="name">${item.name}</p>
              <p class="cuisine">${item.Cuisine}</p>
              <p class="difficulty">${item.Difficulty}</p>
              <p class="rate">${item.rating}</p>
            </div>

            <button class="favorite-btn">❤️</button>
          </article>   
        `;
}

function render() {
  const qury = state.search.trim().toLowerCase();
  const sameRecipes = state.recipes;

  main.innerHTML = sameRecipes.map((item) => AddCard(item)).join("");
  favorite.innerHTML = state.favorites
    .filter((recipes) =>
      `${recipes.name}
        ${recipes.cuisine}
        ${recipes.difficulty}`
        .toLowerCase()
        .includes(qury),
    )

    .map(AddCard)
    .join("");
}

async function fetchrecipes() {
  main.textContent = "Loading Recipes";
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`requst faild ${response.status}`);
    }

    const data = await response.json();
    state.recipes = data.recipes;
    console.log(state.recipes);
    render();
  } catch (error) {
    main.textContent = `not load reciptes: ${error.messag}`;
  }
}
fetchrecipes();
