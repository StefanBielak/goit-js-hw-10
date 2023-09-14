import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.getElementById('breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const catName = document.querySelector('.cat-name');
const catDescription = document.querySelector('.cat-description');
const catTemperament = document.querySelector('.cat-temperament');

async function populateBreedSelect() {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (err) {
    showError('Failed to fetch breeds.');
  } finally {
    loader.style.display = 'none';
  }
}

breedSelect.addEventListener('change', async () => {
  const selectedBreedId = breedSelect.value;
  loader.style.display = 'block';
  catInfo.style.display = 'none';
  error.style.display = 'none';

  try {
    const catData = await fetchCatByBreed(selectedBreedId);
    displayCatInfo(catData);
  } catch (err) {
    showError('Failed to fetch cat information.');
  } finally {
    loader.style.display = 'none';
  }
});

function displayCatInfo(catData) {
  catImage.src = catData.url;
  catName.textContent = catData.breeds[0].name;
  catDescription.textContent = catData.breeds[0].description;
  catTemperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;
  catInfo.style.display = 'block';
}

function showError(message) {
  error.textContent = message;
  error.style.display = 'block';
}
populateBreedSelect();
