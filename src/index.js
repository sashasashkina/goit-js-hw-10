import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
function createMarkup(breeds, url) {
  const { name, temperament, description } = breeds;
  const markup = `<img src="${url}" alt="${name}" width="600">
  <div class="information">
    <h2>${name}</h2>
    <p>${description}</p>
    <p>${temperament}</p>
  </div>`;

  refs.divCatInfo.innerHTML = markup;
}

function createOption(array) {
  const markup = array
    .map(
      ({ id, name }) => `<option value="${id}">
    ${name}
  </option>`
    )
    .join('');

  refs.selector.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({ select: refs.selector });
  refs.loader.style.display = 'none';
}

fetchBreeds()
  .then(data => createOption(data))
  .catch(() => {
    Notify.failure('Oops!');
    refs.error.style.display = 'block';
  })
  .finally((refs.loader.style.display = 'none'));

function onChange(e) {
  refs.loader.style.display = 'block';

  const id = e.target.value;
  fetchCatByBreed(id)
    .then(({ breeds, url }) => console.log(breeds[0], url))
    .catch(() => {
      Notify.failure('Oops!');
      refs.error.style.display = 'block';
    })
    .finally((refs.loader.style.display = 'none'));
}
refs.selector.addEventListener('change', onChange);
