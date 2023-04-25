import axios from 'axios';

async function getCardImage(cardName, size, set, finish) {
  try {
    const response = await axios.get(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`, {
      params: {
        format: 'image',
        version: 'png',
        set: set,
        finishes: finish
      },
      responseType: 'arraybuffer'
    });

    const blob = new Blob([response.data], {type: 'image/jpeg'});
    const imgUrl = URL.createObjectURL(blob);

    return imgUrl;
  } catch (error) {
    console.error(error);
  }
}


export default getCardImage;