import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '39207627-8a410277f132e49ffdfa9ce97';
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

let searchQuery = '';
let page = 1;
const perPage = 40;

const guard = document.querySelector('.guard');
const options = {
  rootMargin: '400px',
};
const observer = new IntersectionObserver(observerCallback, options);

function observerCallback(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      page += 1;
      const { data } = await fetchData(page, searchQuery);
      createMarkup(data);

      if (data.hits.length < perPage && data.hits.length > 0) {
        observer.unobserve(guard);

        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    }
  });
}

form.addEventListener('submit', onSubmit);

async function onSubmit(evt) {
  evt.preventDefault();
  page = 1;
  gallery.innerHTML = '';

  searchQuery = form.elements.searchQuery.value.trim();

  const { data } = await fetchData(page, searchQuery);

  observer.observe(guard);

  if (data.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  createMarkup(data);

  if (data.hits.length > 1) {
    Notify.success(`Hooray! We found ${data.totalHits} images 😎`);
  }

  if (data.hits.length < perPage && data.hits.length > 0) {
    observer.unobserve(guard);

    Notify.info("We're sorry, but you've reached the end of search results.");
  }

  // if (data.hits.length === perPage) {
  //   loadMoreBtn.style.display = 'block';
  // }
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
  const markup = data.hits
    .map(
      elem =>
        `
        <a class="gallery-link link" href="${elem.largeImageURL}">
        <div class="photo-card">
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
        </div>
        </a>
        `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  simpleLightBox.refresh();
}

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

// async function onClickMore() {
//   page += 1;
//   const { data } = await fetchData(page, searchQuery);
//   createMarkup(data);

//   if (data.hits.length < perPage && data.hits.length > 0) {
//     Notify.info("We're sorry, but you've reached the end of search results.");
//   }
// }
