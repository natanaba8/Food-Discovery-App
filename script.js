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
        search: "" 
    }; 


function loadfavorite(){
    try{
        const save = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(save) ? save : [];
    } catch{
        return[];
    }
}

function StoreFavorite(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorite));
}


function AddCard(){
    const isFavorite = state.favorites.some(item => 
        item.id === recipes.id);

        return `
        // we'll add html    
        `
}

function render (){
    const qury = state.search.trim() .toLowerCase();
    const sameRecipes = state.recipes.filter(recipes =>
        `$(recipes.name)
        $(recipes.cuisine)
        $(recipes.diffcult)`
        .toLowerCase() .includes(qury)
    );

    main.innerHTML = sameRecipes
    .map(AddCard) .join("");
    favorite.innerHTML = state.favorites
    .filter(recipes =>
        `${recipes.name}
        ${recipes.cuisine}
        ${recipes.difficulty}`
        .toLowerCase() .includes(qury)
    )

    .map(AddCard) .join("")
}


async function fetchrecipes() {
    main.textContent = "Loading Recipes";
    try{
        const response = await fetch(API_URL);

        if(!response.ok){
            throw new Error(`requst faild ${response.status}`);
        } 

        const data = await response.json();
        state.recipes = data.recipes;
        render();
    } catch (error){
        main.textContent = `not load reciptes: ${error.messag}`;
    }
}



