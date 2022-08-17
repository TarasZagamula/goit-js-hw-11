import axios from "axios";

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `29344030-4477c2161924855e32deae646`;
export default class SearchApi {
    constructor() {
        this.searchQ = ``;
        this.page = 1;
    }

    fetchItems() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQ}&image_type=photo`;
        
       return axios.get(url).then(res => res).then(data => {
            console.log(this.searchQ)
            console.log(data)
            return data
        })
    }

    get qwery() {
        return this.searchQ;
    }

    set qwery(newqwery) {
        this.searchQ = newqwery;
    }
}