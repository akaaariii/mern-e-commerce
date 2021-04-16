import { FETCH_USER } from '../constants/authConstants';

const initState = {
  user: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        user: action.payload
      }
    default:
      return state;
  }
}

export default authReducer