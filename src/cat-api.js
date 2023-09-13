const apiKey ='live_ka2m1P8rv1NcOtq9gpyuZNI1Ep4W18znJylG9WiZefkH0Ni1Uhna0Bm5WHcXcgdT';
const loader = document.getElementById('loader');
const error = document.getElementById('error');

async function fetchBreeds() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': apiKey,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

async function fetchCatByBreed(breedId) {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
      {
        headers: {
          'x-api-key': apiKey,
        },
      }
    );
    const data = await response.json();
    return data[0];
  } catch (err) {
    throw err;
  }
}

export { fetchBreeds, fetchCatByBreed, loader, error };
