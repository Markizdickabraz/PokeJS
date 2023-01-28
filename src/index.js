import NewAskServer from "./js/askServer";
import axios from "axios";

let pokeArr = [];

async function fetchStartPage(id) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return response;
    }
   catch (error) {
            console.log(error);
        }
}


function gallery(id) {
    id = 0
    for (let i = 1; i <= 20; i += 1){
        id += 1;
        fetchStartPage(id)
    }
}

// console.log(pokeArr)


gallery();
