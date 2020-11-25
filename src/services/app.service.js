import axios from 'axios';

export const networkGetCall = async (url) => {
  let data = {};
  try {
    const response = await axios.get(url);
    data = response;
    return data;
  } catch (error) {
    return data;
  }
};
