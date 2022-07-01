import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { headers } from '../../utils/header';
import { user } from '../../utils/user';
import { Retrieve_All_Categories } from '../../services/category';
import { Retrieve_Subjects_By_Category } from '../../services/subject';
import JoditEditor from "jodit-react";
import { outlinedButton } from '../../styles/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faClose, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function CreateArticle(){

  const [data, setData] = useState("");
  const [error, setError]=useState("");
  const [success, setSuccess]=useState("");
  const [category, setCategory]=useState("");
  const [categories, setCategories]=useState("");
  const [subject, setSubject]=useState("");
  const [subjects, setSubjects]=useState("");
  const [title, setTitle]=useState("");
  
  let history = useNavigate();

  useEffect(() => {

    Retrieve_All_Categories()
    .then(result => {
      setCategories(result);
    })

    if(category){
      Retrieve_Subjects_By_Category(category)
      .then(result => {
        setSubjects(result);
      })
    }

    const timeout=setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
    return () => clearTimeout(timeout);

  },[error, success, category]);

  function Publish() {
    axios.post(serverUrl+'articlepublish', {
      userId: user.id,
      name: user.fName+" "+user.lName,
      category: category,
      subject: subject,
      title: title,
      content: data,
    },{
      headers
    })
    .then(data => {
      if(data.data.error){
        setError(data.data.error);
      }
      if(data.data.success){
        setSuccess(data.data.success);
        history.push('/dashboard');
      }
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    }); 
  }
    
  const editor = useRef(null)
	
	const config = {
		readonly: false
	}

  return (
    <div align="center" justify="center">
      <div className="space-y-4">
        <i><p className="text-gray-900 dark:text-orange-500 text-2xl"><u>Create New Article</u></p></i> <br/>
        <select class="shadow border rounded w-full py-2 px-3 text-grey-darker bg-white" id="category" aria-label="Default select example" value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option selected>choose category</option>
            {categories && categories.map((option) => (
                <option value={option.category}>{option.category}</option>
            ))}
        </select>
        {subjects &&
          <select class="shadow border rounded w-full py-2 px-3 text-grey-darker bg-white" id="category" aria-label="Default select example" value={subject} onChange={(e)=>setSubject(e.target.value)}>
            <option selected>choose subject</option>
            {subjects.map((option) => (
                <option value={option.subject}>{option.subject}</option>
            ))}
          </select>
        }
        <input className="shadow border rounded w-full py-2 px-3 text-grey-darker" placeholder="Title" type="text" onChange={(e)=>setTitle(e.target.value)}/>
        <br/>
        <div align="left" justify="left">
          <JoditEditor
            ref={editor}
            value={data}
            config={config}
            tabIndex={1}
            onBlur={newContent => setData(newContent)}
            onChange={newContent => {}}
            className="text-white"
          />
        </div>
        <button className={outlinedButton+" w-full"} onClick={()=>Publish()}>Publish</button>
      </div>
      <br/>
      {error!=="" &&
        <div class="w-1/3 text-red-700 bg-red-100 border border-red-700 px-4 py-3 rounded-lg absolute right-0 bottom-0 flex justify-start" role="alert">
          <FontAwesomeIcon icon={faInfoCircle} className="text-red-700 text-xl" />&nbsp;&nbsp;
          <span class="block sm:inline">{error}</span>
          <button class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <FontAwesomeIcon icon={faClose} className="text-orange-500" onClick={() => setError("")} />
          </button>
        </div>
      }
      {success!=="" &&
        <div class="w-1/3 text-green-700 bg-green-100 border border-green-700 px-4 py-3 rounded-lg absolute right-0 bottom-0 flex justify-start" role="alert">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-700 text-xl" />&nbsp;&nbsp;
          <span class="block sm:inline">{success}</span>
          <button class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <FontAwesomeIcon icon={faClose} className="text-orange-500" onClick={() => setSuccess("")} />
          </button>
        </div>
      }
    </div>
  );
}