import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

async function postRequest(url, data) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
       
      if (error.response.data.password) {
        throw new Error(error.response.data.password);  
      } else if (error.response.data.message) {
        throw new Error(error.response.data.message);  
      } else {
        throw new Error('An error occurred, please try again');
      }
    } else if (error.request) {
      throw new Error('No response from the server');
    } else {
      throw new Error(error.message);
    }
  }
}

// Register method
export async function register(userDetails) {
  const url = `${BASE_URL}/auth/register`;
  const data = await postRequest(url, userDetails);
  return data;
}

// Login method
export async function login(credentials) {
  const url = `${BASE_URL}/auth/login`;
  const data = await postRequest(url, credentials);
  return data;
}
