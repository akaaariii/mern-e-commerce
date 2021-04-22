import axios from 'axios';
import { FETCH_USER } from '../constants/authConstants';

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get('/api/auth/current_user');
  if(response) dispatch({ type: FETCH_USER, payload: response.data });
}

export const handleToken = (token) => async (dispatch) => {
  const response = await axios.post('/api/stripe', token);
  if(response) dispatch({ type: FETCH_USER, payload: response.data });
}
