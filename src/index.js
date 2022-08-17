import "simplelightbox/dist/simple-lightbox.min.css";
import SearchApi from "./api-service";
import marcupCreator from "./marcup-creator";
import axios from "axios";
import SimpleLightbox from "simplelightbox";


const refs = {
    formEl: document.querySelector(`#search-form`),
    container: document.querySelector(`.gallery`),
};

const apiService = new SearchApi();

refs.formEl.addEventListener(`submit`, onSubmit);

function onSubmit(e) {
    e.preventDefault()
    searchItem = e.currentTarget.elements.searchQuery.value;
    // console.log(searchItem)
    apiService.qwery = searchItem;
    apiService.fetchItems().then(res => {
        console.log(res.data.hits)
    refs.container.innerHTML = marcupCreator(res.data.hits)
    })
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: `alt`,
    captionDelay: 250,

});