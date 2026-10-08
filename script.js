"use strict";

const API_URL = "https://dummyjson.com/recipes";
const STORAGE_KEY = "food-discovery-favorite";

const main = document.querySelector("#main");
const favorite = document.querySelector("#favorite");
const form = document.querySelector("#search-form");
const searchInput = document.querySelector("#searchInput");
const favoritebtn = document.querySelector("#header-button");
const message = document.getElementById("message");

const state = {
  recipes: [],
  favorites: [],
  search: "",
};

function storeFavorite() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
}

function getFavorite() {
  const data = localStorage.getItem(STORAGE_KEY);

  state.favorites = data ? JSON.parse(data) : [];
}

function addCard(item) {
  const isFavorite = state.favorites.some((fav) => fav.id === item.id);

  return `
    <article class="article">

      <img 
        src="${item.image}" 
        alt="${item.name}"
      />

      <div class="main-content">

        <p class="name">${item.name}</p>

        <p class="cuisine">
          Cuisine: ${item.cuisine}
        </p>

        <p class="difficulty">
          Difficulty: ${item.difficulty}
        </p>

        <p class="rate">
          Rating: ${item.rating}
        </p>

      </div>

      <button 
        class="favorite-btn"
        onclick="addOrRemove(${item.id})"
      >
        ${isFavorite ? "❤️" : "Add"}
      </button>

    </article>
  `;
}

function render() {
  main.innerHTML = state.recipes.map(addCard).join("");

  favorite.innerHTML = state.favorites.map(addCard).join("");

  storeFavorite();
}

function addOrRemove(id) {
  const existingFav = state.favorites.find((fav) => fav.id === id);

  if (existingFav) {
    state.favorites = state.favorites.filter((fav) => fav.id !== id);
  } else {
    const recipe = state.recipes.find((recipe) => recipe.id === id);

    if (recipe) {
      state.favorites.push(recipe);
    }
  }

  render();
}

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;

  render();
});

async function fetchRecipes(query = "") {
  main.textContent = "Loading...";

  try {
    const response = await fetch(
      `${API_URL}/search?q=${encodeURIComponent(query)}`,
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    state.recipes = data.recipes.map((recipe) => recipe);

    render();
  } catch (error) {
    main.textContent = `Could not load recipes: ${error.message}`;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    message.textContent = "Enter a search query.";
    return;
  }

  const matchingRecipe = state.recipes.find((recipe) =>
    recipe.tags.some((tag) => tag.toLowerCase().includes(query)),
  );

  if (!matchingRecipe) {
    message.textContent = "Please enter a correct search tag.";
    return;
  }

  message.textContent = "";

  const matchingTag = matchingRecipe.tags.find((tag) =>
    tag.toLowerCase().includes(query),
  );

  state.search = matchingTag;

  await fetchRecipes(matchingTag);
});

async function init() {
  getFavorite();

  await fetchRecipes("");
}

init();
