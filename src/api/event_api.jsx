import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = 'http://localhost:3001';

export const canParticipation = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/event/can_participation`, {
      headers: {
        Accept: 'application/json',
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

export const getResult = async (apply_form) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/event/participation`,
      {
        name: apply_form.name,
        student_id: apply_form.studentId,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
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
