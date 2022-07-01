import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faExclamationTriangle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { outlinedButton } from '../../styles/style';
import { headers } from '../../utils/header';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function AddCategory() {

  const [category, setCategory]=useState("");
  const [error, setError]=useState("");
  const [success, setSuccess]=useState("");

  useEffect(() => {

    const timeout=setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
    return () => clearTimeout(timeout);

  },[error, success]);

  function AddCategory() {

    axios.post(serverUrl+'addcategory', {
      category: category,
    },{
      headers
    })
    .then(data => {
      if(data.data.error){
        setError(data.data.error);
      }
      if(data.data.success){
        setSuccess(data.data.success);
      }
    })
    .catch(err=>{
      console.log(err.message);
    });

  }

  return (
    <>
      <div className="flex justify-center dark:bg-gray-900">
        <div className="flex-col w-11/12 md:w-5/12 shadow-2xl dark:shadow-gray-400 mt-2 mb-2 md:mt-10 md:mb-10 p-2 md:p-10">
          <p className="flex justify-center text-xl underline text-orange-500 font-semibold">Add Category</p>
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2 dark:text-white" for="category">
              Category
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="category" type="text" placeholder="enter category" onChange={(e)=>setCategory(e.target.value)} />
          </div>
          <button className={outlinedButton+" mb-2 w-full"} type="button" onClick={()=> AddCategory()} >
            <FontAwesomeIcon icon={faPaperPlane} />&nbsp;Add Category
          </button>
          {error &&
            <div id="alert-2" class="flex p-4 mt-4 bg-red-300 rounded-lg dark:bg-red-300" role="alert">
              <FontAwesomeIcon class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" icon={faExclamationTriangle} />
              <div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                {error}
              </div>
              <button type="button" class="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:text-red-400 inline-flex h-8 w-8" data-collapse-toggle="alert-2" aria-label="Close">
                <FontAwesomeIcon icon={faClose} onClick={()=>setError("")} />
              </button>
            </div>
          }
          {success && 
            <div id="alert-3" class="flex p-4 mt-4 bg-green-300 rounded-lg dark:bg-green-200" role="alert">
              <FontAwesomeIcon class="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800" icon={faCheck} />
              <div class="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
                {success}
              </div>
              <button type="button" class="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:text-red-400 inline-flex h-8 w-8">
                <FontAwesomeIcon icon={faClose} onClick={()=>setSuccess("")} />
              </button>
            </div>
          }
        </div>
      </div>
    </>
  );
}