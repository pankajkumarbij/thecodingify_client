import { useState, useEffect } from 'react';
import { user } from '../../utils/user';
import { Retrive_Article_By_userId } from '../../services/article';
import axios from 'axios';
import { headers } from '../../utils/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faClose, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function MyArticles(){

  const [data, setData] = useState();
  const [message, setMessage] = useState("");

  const userId=localStorage.getItem('userId');

  useEffect(()=>{

    if(user.id) {
      Retrive_Article_By_userId(user.id)
      .then(result => {
        setData(result);
      })
    }
    
  }, [data, userId]);

  function DeleteArticle(id){
    axios.get(serverUrl+'delete_article/'+id, {
      headers
    })
    .then(result => {
      setMessage(result.data.success);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div align="center" justify="center">
      <div className="space-y-4">
        <i><p className="text-gray-900 dark:text-orange-500 text-2xl"><u>My Articles</u></p></i> <br/>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <thead className="text-xs text-white uppercase bg-orange-500">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S.N.
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item, index) => {
                return (
                  <tr className="bg-white border dark:bg-gray-900 dark:border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {index+1}
                    </th>
                    <td className="px-6 py-4">
                      {item.category}
                    </td>
                    <td className="px-6 py-4">
                      {item.subject}
                    </td>
                    <td className="px-6 py-4">
                      {item.title}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={"editarticle/"+item._id}><button className="bg-blue-600 hover:bg-white hover:border-blue-600 hover:text-blue-600 rounded-md p-1 font-medium text-white hover:underline"><FontAwesomeIcon icon={faPenToSquare} /> Edit</button></Link>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={()=>DeleteArticle(item._id)} className="bg-red-600 hover:bg-white hover:border-red-600 hover:text-red-600 rounded-md p-1 font-medium text-white hover:underline"><FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      {message!=="" &&
        <div class="w-1/3 text-green-700 bg-green-100 border border-green-700 px-4 py-3 rounded-lg absolute right-0 bottom-0 flex justify-start" role="alert">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-700 text-xl" />&nbsp;&nbsp;
          <span class="block sm:inline">{message}</span>
          <button class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <FontAwesomeIcon icon={faClose} className="text-orange-500" onClick={() => setMessage("")} />
          </button>
        </div>
      }
    </div>
  );
}