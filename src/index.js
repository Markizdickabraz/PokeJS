import axios from "axios";

const input = document.querySelector('.js-header__input');
const pokeList = document.querySelector('.poke__list');
const modal = document.querySelector("[data-modal]");
const modalContent = document.querySelector('.modal__content');
const galleryCards = document.querySelector('.main__section');
const form = document.querySelector('.js-form');
const loadMoreBtn = document.querySelector('.js-load-more__btn');
const myPokeBtn = document.querySelector('.nav__btn');

const POKEDEX_KEY = 'pokedex';
let pokedexArr = [];

let name = '';
let cardInfoArr = [];
let pokeArr = [];
let limit = 15;
let e = 1;

renderPage();


// fecth function

async function fetch(name) {
        const BASEURL = "https://pokeapi.co/api/v2/pokemon/";
        const response = await axios.get(`${BASEURL}${name}`);
        return response.data;
    }

// startPageFetch
async function startPageFetch(id) {
    for (let i = e; i <= limit; i += 1) {
        id = i;
        const responseData = await fetch(id);
        pokeArr.push(responseData);

    }
    return pokeArr;
}


// renderPage
async function renderPage(){
    const data = await startPageFetch();
    const markup = data.map(
        ({ name, sprites,id }) => {
            return `
                 <li class="poke__item" id = ${id}>
            <img src="${sprites.front_default}" alt="${name}" class="img">
            <p class="title">${name}</p>
            </li>
                `;
        }).join("");
    pokeList.insertAdjacentHTML('beforeend', markup);
    loadMoreBtn.disabled = false;
}


galleryCards.addEventListener('click', async (e) => { 
    if (e.target.nodeName !== "IMG") {
        return;
    }
    name = e.target.alt;
    const dataCard = await fetch(name);
    cardInfoArr.push(dataCard);
    renderCard(cardInfoArr); 
    console.dir(cardInfoArr);   
});

// modal
function renderCard(cardInfoArr) {
       const markupCard = cardInfoArr.map(
        ({ name, sprites, types, abilities, stats ,id}) => {
            return `
           
           <h2 class ="caption">${name}</h2>
            <img src="${sprites.front_default}" alt="${name}" class="img poke__img">
            <ul class="modalCard__list" id=${id}>
            <li class="modalCard__item">Tipe: ${types[0].type.name}</li>
            <li class="modalCard__item">Abilities: ${abilities[0].ability.name}</li>
            <li class="modalCard__item">Attack: ${stats[0].base_stat}</li>
            </ul>
            <button type='button' class ='btn js-moad-btn'>Add to Pokedex</button>
                `;  
        }).join("");
    modalContent.innerHTML = markupCard;
    toggleModal(); 
};
// open/close modal
function toggleModal() {
    modal.classList.toggle("is-hidden");
}
// close modal
modal.addEventListener('click', (e) => {    
    console.dir(e.target);
    if (e.target.classList[0] === 'backdrop') {
        toggleModal();
        modalContent.innerHTML = '';
        cardInfoArr = [];
        input.value = '';
    }
    if (e.target.nodeName === 'BUTTON') {
        if (e.target.id !== e.target.previousElementSibling.id) {
            addToPokedex();
        }
    }
    return;
})
// secrch input logic
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (input.value === '') {
        return;
    }
    name = input.value.toLowerCase().trim();
    const dataCard = await fetch(name);
    cardInfoArr.push(dataCard);
    renderCard(cardInfoArr);
});

// load more button logic
loadMoreBtn.addEventListener('click', (evt) => {
    loadMoreBtn.disabled = true;
    evt.preventDefault();
    e += 15;
    limit += 15;
    pokeArr = [];
    renderPage();
});

// add pocedex logic
function addToPokedex(e) {
    pokedexArr.push(cardInfoArr[0]);
    localStorage.setItem(POKEDEX_KEY, JSON.stringify(pokedexArr)); 
}

// render pokedex
myPokeBtn.addEventListener('click', renderPokedexPage);

// render pokedex logic
function renderPokedexPage() {
    const pokedexGet = localStorage.getItem(POKEDEX_KEY);
    const pokedexParse = JSON.parse(pokedexGet);
        const markupPokedex = pokedexParse.map(
            ({ name, sprites , id}) => {
                return `
                 <li class="poke__item" id = ${id}>
            <img src="${sprites.front_default}" alt="${name}" class="img">
            <p class="title">${name}</p>
            </li>
                `;
            }).join("");
        pokeList.innerHTML = markupPokedex;
};
