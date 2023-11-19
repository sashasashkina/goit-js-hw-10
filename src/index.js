import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds } from './cat-api';

const refs = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
new SlimSelect({ select: refs.selector });

function createMarkup(array) {
  const markup = array.map(({ id }) => console.log(id));
}
fetchBreeds()
  .then(data => createMarkup(data))
  .catch(error => console.log(error));
