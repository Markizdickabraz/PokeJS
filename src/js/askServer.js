import axios from "axios";

export default class AskServer {
    constructor() {
        this.offset = 0;
        this.name = ' ';
    }
    async fetch(name) {
        this.BASEURL = 'https://pokeapi.co/api/v2/pokemon/';
        const response = await axios.get(`${BASEURL}${name}`);
        return response.data;
    }
}