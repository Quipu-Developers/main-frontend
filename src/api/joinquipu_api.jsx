import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const sendGeneral = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/data1`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      return { status, data };
    } else {
      return { status: 501, data: null };
    }
  }
};

export const sendDevelopment = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/data2`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      return { status, data };
    } else {
      return { status: 501, data: null };
    }
  }
};
