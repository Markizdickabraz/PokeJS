import axios from "axios";

const input = document.querySelector('.js-header__input');
const pokeList = document.querySelector('.poke__list');
const modal = document.querySelector("[data-modal]");
const modalContent = document.querySelector('.modal__content');
const galleryCards = document.querySelector('.main__section');

let pokeArr = [];
let name = "";
let cardInfo = [];

renderStartPage();

async function startPageFetch(id) {
    id = 0;
    for (let i = 1; i <=20; i+=1) {
        const BASEURL = "https://pokeapi.co/api/v2/pokemon/";
        id += 1;
        const response = await axios.get(`${BASEURL}${id}`);
        pokeArr.push(response.data);

    }
    return pokeArr;
}


async function renderStartPage(e){
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
        pokeList.innerHTML = markup;
}



galleryCards.addEventListener('click', async (e) => { 
    if (e.target.nodeName !== "IMG") {
        return;
    }
    toggleModal();
    name = e.target.alt;
    const dataCard = await fetchPokeInfo(name);
    console.log('dataCard', dataCard);
    renderCard(dataCard);
});


async function fetchPokeInfo(name) {
    const BASEURL = "https://pokeapi.co/api/v2/pokemon/";
    try {
        const responseCard = await axios.get(`${BASEURL}${name}`);
        cardInfo.push(responseCard.data);
        return cardInfo;
    }
    catch (error) {
    console.log(error);
  }
};


function renderCard(dataCard) {
       const markupCard = dataCard.map(
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
};

function toggleModal() {
    modal.classList.toggle("is-hidden");
    
}

modal.addEventListener('click', () => {
    modal.classList.toggle("is-hidden");
    modalContent.innerHTML = '';
    cardInfo = [];
})

input.addEventListener('input', renderCard);

// async function renderCard(e) {

//     e.preventDefault();
//     name = input.value;
//     if (name === ' ') {
//         modal.classList.toggle("is-hidden");
//         modalContent.innerHTML = '';
//         cardInfo = [];
//     }
// };
