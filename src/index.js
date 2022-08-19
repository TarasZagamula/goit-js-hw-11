import "simplelightbox/dist/simple-lightbox.min.css";
import SearchApi from "./api-service";
import marcupCreator from "./marcup-creator";
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import throttle from "lodash.throttle";
import Notiflix from "notiflix";


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

async function onSubmit(e) {

    e.preventDefault()

    apiService.qwery = e.currentTarget.elements.searchQuery.value;
    clearMarcup();
    apiService.resPage();
    apiService.resetinsertCounter();
    const response = await apiService.fetchItems();
    if (response.data.hits.length === 0) {return Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)}
    insertMarcup(response);
    lightbox.refresh();
    Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`)
  
    window.addEventListener('scroll', throttle(checkPosition, 300));
    window.addEventListener('resize', throttle(checkPosition, 300));
};

async function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;
  const threshold = height - screenHeight / 8;
  const position = scrolled + screenHeight;
    if (position < threshold) { return }
        
        const response = await apiService.fetchItems();
        insertMarcup(response);
        lightbox.refresh();
        
    if (apiService.getCounter >= response.data.totalHits) {
        window.removeEventListener(`scroll`, checkPosition);
        window.removeEventListener(`resize`, checkPosition);
           return Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`)
        };  
    
};

function clearMarcup() {
    return refs.container.innerHTML = ``;
};

function insertMarcup(response) {
    return refs.container.insertAdjacentHTML(`beforeend`, marcupCreator(response.data.hits));
};

