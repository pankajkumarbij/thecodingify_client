import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

export const Retrieve_All_Categories = () => {
  return axios.get(serverUrl + 'retrieve_all_categories')
  .then(res => {
    return res.data;
  })
  .catch(err => console.log(err))
}