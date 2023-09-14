import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_ka2m1P8rv1NcOtq9gpyuZNI1Ep4W18znJylG9WiZefkH0Ni1Uhna0Bm5WHcXcgdT';

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    throw error;
  }
}