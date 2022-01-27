import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

export const Retrieve_Feedback_By_Subject = () => {
  return axios.get(serverUrl + 'retrieve_feedback_by_subject')
  .then(res => {
    return res.data;
  })
  .catch(err => console.log(err))
}

export const Retrieve_Feedback_By_Subject_By_userId = (subject, userId) => {
  return axios.get(serverUrl + 'retrieve_feedback/' + userId + "/" + subject)
  .then(res => {
    return res.data;
  })
  .catch(err => console.log(err))
}