const API_URL = "https://dummyjson.com/recipes";

const STORAGE_KEY = "food-discovery-favorite";

const main = document.querySelector("#main");
const favorite = document.querySelector("#favorite");
const form = document.querySelector("#search-form");
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
  const isFavorite = state.favorites.some((fav) => fav.id === item.id);
  console.log(isFavorite);
  return `
        <article class="article">
            <img src="${item.image}" alt="show image" />

            <div class="main-content">
              <p class="name">${item.name}</p>
              <p class="cuisine">${item.Cuisine}</p>
              <p class="difficulty">${item.Difficulty}</p>
              <p class="rate">${item.rating}</p>
            </div>

            <button class="favorite-btn" onclick="addOrRemove(${item.id})">${isFavorite ? "❤️" : "Add"}</button>
          </article>   
        `;
}

function render() {
  const qury = state.search.trim().toLowerCase();
  const sameRecipes = state.recipes;

  main.innerHTML = sameRecipes.map((item) => AddCard(item)).join("");
  favorite.innerHTML = state.favorites.map((fav) => AddCard(fav)).join("");
}
function addOrRemove(id) {
  const existingFav = state.favorites.find((fav) => fav.id === id);
  if (existingFav) {
    state.favorites = state.favorites.filter((fav) => fav.id !== id);
  } else {
    const main = state.recipes.find((main) => main.id === id);
    if (main) {
      state.favorites.push(main);
    }
  }
  render();
}

async function fetchrecipes(qurey) {
  main.textContent = "Loading ...";
  try {
    const response = await fetch(`${API_URL}/search?q=${qurey}`);

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
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(state.recipes);
  const sTerm = state.recipes.map((item) => item.tags);
  
});
fetchrecipes("");
