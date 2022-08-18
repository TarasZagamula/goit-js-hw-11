export default function marcupCreator(arr) {
    return arr.map((i) => {
        return `<div class="photo-card">
    <a class="gallery__item" href="${i.largeImageURL}">
  <img src="${i.largeImageURL}" alt="${i.tags}" loading="lazy" class="gallery__image"/>
   </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${i.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${i.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${i.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${i.downloads}</b>
    </p>
  </div>
</div>`
}).join(``)
}