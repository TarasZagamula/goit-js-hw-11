import axios from "axios";

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `29344030-4477c2161924855e32deae646`;

export default class SearchApi {
    constructor() {
        this.searchQ = ``;
        this.page = 1;
        this.hitsCounter = 0;
    }

    async fetchItems() {
       const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQ}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`; 
        const response = await axios.get(url);
        this.insertPage();
        this.setInsertCounter(response.data.hits.length);
        console.log(this.page)
        console.log(this.hitsCounter)
           return response;
    }

    resetinsertCounter() {
        this.hitsCounter = 0;
    }
    
    get getCounter() {
        return this.hitsCounter;
    }

    setInsertCounter(total) {
    this.hitsCounter += total;
    }
    
    get pageItem() {
        return this.page;
    }

    insertPage() {
    this.page += 1;
    }

    resPage() {
        this.page = 1;
    }

    get qwery() {
        return this.searchQ;
    }

    set qwery(newqwery) {
        this.searchQ = newqwery;
    }
}