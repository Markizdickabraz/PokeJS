import axios from "axios";

const input = document.querySelector('.js-header__input');
const pokeList = document.querySelector('.poke__list');
const modal = document.querySelector("[data-modal]");
const modalContent = document.querySelector('.modal__content');
const galleryCards = document.querySelector('.main__section');
const form = document.querySelector('.js-form');
const loadMoreBtn = document.querySelector('.js-load-more__btn');

let name = '';
let cardInfoArr = [];
let pokeArr = [];
let limit = 20;
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
    id = 0;
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
        ({ name, sprites }) => {
            return `
                 <li class="poke__item">
            <img src="${sprites.front_default}" alt="${name}" class="img">
            <p class="title">${name}</p>
            </li>
                `;
        }).join("");
    pokeList.insertAdjacentHTML('beforeend', markup);
}


galleryCards.addEventListener('click', async (e) => { 
    if (e.target.nodeName !== "IMG") {
        return;
    }
    name = e.target.alt;
    const dataCard = await fetch(name);
    cardInfoArr.push(dataCard);
    renderCard(cardInfoArr);
});


function renderCard(cardInfoArr) {
       const markupCard = cardInfoArr.map(
        ({ name, sprites, types, abilities, stats }) => {
            return `
            <h2 class ="caption">${name}</h2>
            <img src="${sprites.front_default}" alt="${name}" class="img poke__img">
            <ul class="modalCard__list">
            <li class="modalCard__item">Tipe: ${types[0].type.name}</li>
            <li class="modalCard__item">Abilities: ${abilities[0].ability.name}</li>
            <li class="modalCard__item">Attack: ${stats[0].base_stat}</li>
            </ul>
                `;
        }).join("");
    modalContent.innerHTML = markupCard;
    toggleModal();
};

function toggleModal() {
    modal.classList.toggle("is-hidden");
}

modal.addEventListener('click', () => {
    toggleModal();
    modalContent.innerHTML = '';
    cardInfoArr = [];
    input.value = '';
})

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (input.value === '') {
        return;
    }
    name = input.value;
    const dataCard = await fetch(name);
    cardInfoArr.push(dataCard);
    renderCard(cardInfoArr);
});

loadMoreBtn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    e += 20;
    limit += 20;
    const dataMoreCard = await startPageFetch();
    pokeArr = [];
    renderPage(dataMoreCard);
});

