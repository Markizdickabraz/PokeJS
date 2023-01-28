import axios from "axios";

const headerInput = document.querySelector(".js-header__input");
console.dir(headerInput);

export default class NewAskServer {

    async fetchArticles() {
        this.BASEURL = 'https://pokeapi.co/api/v2/';
        this.name = input.value.trim();
        this.per_page = 40;
        this.numberCard = this.per_page;

        if (this.name.length === 0) {
            return;
        }
        try {
            const response = await axios.get(`${this.BASEURL}?key=32463298-aa2adc14f1416dd47ab6801d7&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`);
            const totalHits = await response.data.totalHits;
            console.log(totalHits);
            // this.incrementPage();
            if (this.numberCard > totalHits) {
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                btnLoadMore.classList.replace('is-visible', 'is-hidden');

            }
            return response;
        } catch (error) {
            console.log(error);
        }
    }
};

// headerInput.addEventListener("input", fetchServ);

