import axios from 'axios';

export const getUserByMatricula = async (matricula) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/users/${matricula}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching user data: ", err);
    throw err;
  }
};