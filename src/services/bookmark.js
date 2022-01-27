import axios from 'axios';
import { headers } from '../utils/header';
const serverUrl = process.env.REACT_APP_SERVER_URL;

export const Retrieve_Bookmark_By_UserId = (userId) => {
  return axios.get(serverUrl + 'retrieve_bookmark/' + userId, {
    headers
  })
  .then(res => {
    return res.data;
  })
  .catch(err => console.log(err))
}