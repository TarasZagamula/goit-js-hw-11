import "simplelightbox/dist/simple-lightbox.min.css";
import SearchApi from "./api-service";
import marcupCreator from "./marcup-creator";
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import throttle from "lodash.throttle";


const refs = {
    formEl: document.querySelector(`#search-form`),
    container: document.querySelector(`.gallery`),
};

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: `alt`,
    captionDelay: 250,
});

const apiService = new SearchApi();

refs.formEl.addEventListener(`submit`, onSubmit);

function onSubmit(e) {
    e.preventDefault()
    searchItem = e.currentTarget.elements.searchQuery.value;
    // console.log(searchItem)
    apiService.qwery = searchItem;
    clearMarcup();
    apiService.resPage();
    apiService.fetchItems().then(res => {
        console.log(res.data.hits);
        refs.container.insertAdjacentHTML(`beforeend`, marcupCreator(res.data.hits));
        lightbox.refresh();
    });
  
    window.addEventListener('scroll', throttle(checkPosition, 150));
    window.addEventListener('resize', throttle(checkPosition, 150));
    apiService.insertPage();
};

function checkPosition() {
  const height = document.body.offsetHeight
  const screenHeight = window.innerHeight
  const scrolled = window.scrollY
  const threshold = height - screenHeight / 3
  const position = scrolled + screenHeight
    if (position >= threshold) {
        apiService.insertPage();
    apiService.fetchItems().then(res => {
        refs.container.insertAdjacentHTML(`beforeend`, marcupCreator(res.data.hits));
        lightbox.refresh();
    })  
  }
};

function clearMarcup() {
    return refs.container.innerHTML = ``;
};

function hitsCounter() {

}

