import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faSquareCaretRight as faSquareCaretRightAlt } from '@fortawesome/free-regular-svg-icons';
import { textButton, containedButton } from '../../styles/style';
import { Retrive_Article_By_Subject } from '../../services/article';
import { Retrieve_Feedback_By_Subject_By_userId } from '../../services/feedback';
import { headers } from '../../utils/header';
import { user } from '../../utils/user';
import axios from 'axios';
import { faCheckSquare, faStar } from '@fortawesome/free-solid-svg-icons';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function Showarticals() {

  const { subject } = useParams();

  const [openDrawer, setOpenDrawer] = useState(true);
  const [data, setData] = useState();
  const [content, setContent] = useState("Loading...");
  const [title, setTitle] = useState("Loading...");
  const [name, setName] = useState("Loading...");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState(0);

  useEffect(() => {

    if(subject){
      Retrive_Article_By_Subject(subject)
      .then(result => {
        setData(result);
        if(title==="Loading..." && result[0].title){
          setContent(result[0].content);
          setTitle(result[0].title);
          setName(result[0].name);
        }
      })
    }

    if(subject && user.id){
      Retrieve_Feedback_By_Subject_By_userId(subject, user.id)
      .then(result => {
        console.log(result);
        if(result.length!==0){
          setFeedbacks(result[0].rating);
          console.log(result);
        }
        else{
          setFeedbacks(0);
        }
      })
    }

  },[subject, title, feedbacks, data]);

  function currentArticle(content, title){
    setContent(content);
    setTitle(title);
  }

  function AddFeedback() {
    axios.post(serverUrl+'addfeedback', {
      userId: user.id,
      rating: rating,
      feedback: feedback,
      subject: subject,
    },{
      headers
    })
    .then(data => {
      console.log(data);
    })  
    .catch(error => {
      console.log(error);
    }); 
  }

  return (
    <>
      <div className="w-full flex flex-row">
        <div className={openDrawer ? "w-1/6 bg-navblue dark:bg-gray-900 text-white flex-col text-md" : "hidden w-1/6 bg-navblue dark:bg-gray-900 text-white flex-col text-md"}>
          <div className="bg-orange-500 p-4 text-lg flex justify-between">
            <div>
              <p>{subject}</p>
            </div>
            <div>
              <button onClick={()=>setOpenDrawer(!openDrawer)}><FontAwesomeIcon icon={faBars} /></button>
            </div>
          </div>
          <ul className="space-y-8 py-8 px-8">
            {data && data.map((item)=>{
              return (
                <li className={item.title===title ? "bg-gray-500 rounded" : ""}>
                  <button className={textButton} onClick={()=> currentArticle(item.content, item.title)} ><FontAwesomeIcon icon={item.title===title ? faSquareCaretRight : faSquareCaretRightAlt} /> &nbsp;&nbsp; {item.title}</button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className={openDrawer ? "w-5/6 p-6 px-10" : "w-full p-6 px-10"}> 
          <div className="flex justify-between">
            <p className="text-orange-500 text-3xl mb-8" >{title}</p>
            <p className="text-orange-500 text-lg mb-8" >Written by: {name}</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: content }} />

          <div className="p-6 shadow-md border border-gray-300 rounded-md">
            {!feedbacks ? 
              <div>
                <p className="text-gray-700 text-2xl mb-4">Rate your experience with our course...</p>
                <div className="flex">
                  <button className={rating===1 ? "bg-orange-500 px-7 py-5 border rounded-md mr-3 text-lg" : "px-7 py-5 border rounded-md mr-3 text-lg"} onClick={()=>setRating(1)}>1</button>
                  <button className={rating===2 ? "bg-orange-500 px-7 py-5 border rounded-md mr-3 text-lg" : "px-7 py-5 border rounded-md mr-3 text-lg"} onClick={()=>setRating(2)}>2</button>
                  <button className={rating===3 ? "bg-orange-500 px-7 py-5 border rounded-md mr-3 text-lg" : "px-7 py-5 border rounded-md mr-3 text-lg"} onClick={()=>setRating(3)}>3</button>
                  <button className={rating===4 ? "bg-orange-500 px-7 py-5 border rounded-md mr-3 text-lg" : "px-7 py-5 border rounded-md mr-3 text-lg"} onClick={()=>setRating(4)}>4</button>
                  <button className={rating===5 ? "bg-orange-500 px-7 py-5 border rounded-md mr-1 text-lg" : "px-7 py-5 border rounded-md mr-1 text-lg"} onClick={()=>setRating(5)}>5</button>
                  <button className="px-7 py-5 text-xl"><FontAwesomeIcon icon={faStar} className="text-orange-500 text-2xl" />&nbsp;Stars</button>
                </div>
                <textarea className="border rounded w-full p-3 mt-4" rows={3} placeholder="Your feedback (Optional)" onChange={(e)=>setFeedback(e.target.value)} ></textarea>
                <button className={containedButton} onClick={()=>AddFeedback()} >Submit</button>
              </div>
              :
              <div className="flex">
                <FontAwesomeIcon icon={faCheckSquare} className="text-green-500 text-2xl" />&nbsp;&nbsp;&nbsp;<p className="text-xl">Thanks for the feedback!</p>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}