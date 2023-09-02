import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '39207627-8a410277f132e49ffdfa9ce97';
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');

let searchQuery = '';
let page = 1;
const perPage = 40;

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onClickMore);

async function onSubmit(evt) {
  evt.preventDefault();

  loadMoreBtn.style.display = 'none';
  gallery.innerHTML = '';

  searchQuery = form.elements.searchQuery.value.trim();

  const { data } = await fetchData(page, searchQuery);
  console.log(data);
  createMarkup(data);

  Notify.success(`Hooray! We found ${data.totalHits} images 😎`);

  if (data.hits.length === perPage) {
    loadMoreBtn.style.display = 'block';
  }

  if (data.hits.length < perPage && data.hits.length > 0) {
    loadMoreBtn.style.display = 'none';

    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchData(page, searchQuery) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    page: page,
    per_page: perPage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return await axios(`?${searchParams}`);
}

function createMarkup(data) {
  if (data.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  const markup = data.hits
    .map(
      elem =>
        `<div class="photo-card">
      <img width="400" height="300" src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${elem.likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${elem.views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${elem.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${elem.downloads}</b>
        </p>
      </div>
    </div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

async function onClickMore() {
  page += 1;
  const { data } = await fetchData(page, searchQuery);
  createMarkup(data);

  if (data.hits.length < perPage && data.hits.length > 0) {
    loadMoreBtn.style.display = 'none';

    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}
