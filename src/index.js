import axios from "axios";

const input = document.querySelector('.js-header__input');
console.log(input);
const pokeList = document.querySelector('.poke__list');

renderStartPage();

let pokeArr = [];

async function startPageFetch(id) {
    id = 0;
    for (let i = 1; i <=20; i+=1) {
        const BASEURL = "https://pokeapi.co/api/v2/pokemon/";
        id += 1;
        const response = await axios.get(`${BASEURL}${id}`);
        pokeArr.push(response.data);
        // return response;
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
