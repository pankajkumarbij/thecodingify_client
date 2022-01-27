import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

export const Retrieve_All_Subjects = () => {
  return axios.get(serverUrl + 'retrieve_all_subjects')
  .then(res => {
    return res.data;
  })
  .catch(err => console.log(err))
}

export const Retrieve_Subjects_By_Category = (category) => {
  return axios.get(serverUrl + 'retrieve_subject/' + category)
  .then(res => {
    return res.data;
  })
  .catch(err => console.log(err))
}