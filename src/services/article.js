import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

export const Retrive_Article_By_Subject = (subject) => {
  return axios.get(serverUrl + 'retrieve_article_by_subject/' + subject)
  .then(res => {
    return res.data;
  })
  .catch(err => console.log(err))
}

export const Retrive_Article_By_Id = (id) => {
  return axios.get(serverUrl + 'retrive_article/' + id)
  .then(res => {
    return res.data;
  })
  .catch(err => console.log(err))
}