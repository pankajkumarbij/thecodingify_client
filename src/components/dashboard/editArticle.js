import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { headers } from '../../utils/header';
import { user } from '../../utils/user';
import JoditEditor from "jodit-react";
import { outlinedButton } from '../../styles/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faClose, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Retrive_Article_By_Id } from '../../services/article';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function EditArticle(){

  const { id } = useParams();

  const [data, setData] = useState("");
  const [error, setError]=useState("");
  const [success, setSuccess]=useState("");
  const [category, setCategory]=useState("");
  const [subject, setSubject]=useState("");
  const [title, setTitle]=useState("");
  
  let history = useNavigate();

  useEffect(() => {

    Retrive_Article_By_Id(id)
    .then(data => {
      if(data[0].userId!==user.id){
        alert("Sorry!! you are not authorized to edit this article")
        history.push("/");
      }
      setCategory(data[0].category);
      setSubject(data[0].subject);
      setTitle(data[0].title);
      setData(data[0].content);
    })

    const timeout=setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
    return () => clearTimeout(timeout);

  },[id, error, success, history]);

  function Publish() {
    axios.put(serverUrl+'update_article/'+id, {
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
        history.push("/");
      }
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
      <div className="space-y-4 p-8">
        <i><p className="text-gray-900 dark:text-orange-500 text-2xl"><u>Edit Article</u></p></i> <br/>
        <input className="shadow border rounded w-full py-2 px-3 text-grey-darker" placeholder="Category" type="text" value={category}/>
        <input className="shadow border rounded w-full py-2 px-3 text-grey-darker" placeholder="Subject" type="text" value={subject}/>
        <input className="shadow border rounded w-full py-2 px-3 text-grey-darker" placeholder="Title" type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
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
        <button className={outlinedButton+" w-full"} onClick={()=>Publish()}>Update</button>
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