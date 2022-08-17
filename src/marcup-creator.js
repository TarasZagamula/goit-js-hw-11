export default function marcupCreator(arr) {
    return arr.map((i) => {
        return `<a class="gallery__item" href="${i.largeImageURL}">
    <div class="photo-card">
  <img src="${i.previewURL}" alt="${i.tags}" loading="lazy" class="gallery__image"/>
  <div class="info">
    <p class="info-item">
      <b>Likes${i.likes}</b>
    </p>
    <p class="info-item">
      <b>Views${i.vievs}</b>
    </p>
    <p class="info-item">
      <b>Comments${i.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${i.downloads}</b>
    </p>
  </div>
</div>
 </a>`
}).join(``)
}