import { fetchBreeds, fetchCatByBreed, loader, error } from './cat-api.js';

const breedSelect = document.getElementById('breed-select');
const catInfo = document.getElementById('cat-info');
const catName = document.getElementById('cat-name');
const catDescription = document.getElementById('cat-description');
const catTemperament = document.getElementById('cat-temperament');
const catImage = document.getElementById('cat-image');

async function populateBreedSelect() {
  try {
    loader.style.display = 'block';
    error.textContent = '';

    const breeds = await fetchBreeds();

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (err) {
    error.textContent = 'Failed to fetch cat breeds.';
  } finally {
    loader.style.display = 'none';
  }
}

async function displayCatInfo(breedId) {
  try {
    loader.style.display = 'block';
    error.textContent = '';

    const cat = await fetchCatByBreed(breedId);

    catName.textContent = cat.breeds[0].name;
    catDescription.textContent = cat.breeds[0].description;
    catTemperament.textContent = cat.breeds[0].temperament;
    catImage.src = cat.url;

    catInfo.style.display = 'block';
  } catch (err) {
    error.textContent = 'Failed to fetch cat information.';
  } finally {
    loader.style.display = 'none';
  }
}

breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  displayCatInfo(selectedBreedId);
});
populateBreedSelect();
