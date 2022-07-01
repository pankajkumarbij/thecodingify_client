import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faDollarSign, faShareNodes, faStar, faBookmark, faClose, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkAlt, faStar as faStarAlt } from '@fortawesome/free-regular-svg-icons';
import { outlinedButton } from '../../styles/style';
import { user } from '../../utils/user';
import { Retrieve_All_Categories } from '../../services/category';
import { Retrieve_All_Subjects } from '../../services/subject';
import { Retrieve_Feedback_By_Subject } from '../../services/feedback';
import { Retrieve_Bookmark_By_UserId } from '../../services/bookmark';
import { headers } from '../../utils/header';
import axios from 'axios';
import { Link } from 'react-router-dom';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function Explore() {

  const [category, setCategory]=useState("All");
  const [categories, setCategories]=useState("");
  const [allSubjects, setAllSubjects]=useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [msg, setMsg] = useState("");
  const [bookmarks, setBookmarks] = useState();
  const [feedbacks, setFeedbacks] = useState();

  useEffect(() => {
    
    Retrieve_All_Categories()
    .then(result => {
      if(result.error){
        console.log(result.error);
      }
      else{
        setCategories(result);
      }
    })

    Retrieve_All_Subjects()
    .then(result => {
      if(result.error){
        console.log(result.error);
      }
      else{
        setAllSubjects(result);
      }
    })

    Retrieve_Feedback_By_Subject()
    .then(result => {
      if(result.error){
        console.log(result.error);
      }
      else{
        setFeedbacks(result);
      }
    })

    if(user.id){
      Retrieve_Bookmark_By_UserId(user.id)
      .then(result => {
          setBookmarks(result);
      })
    }

    if(msg){
      const timeout=setTimeout(() => {
        setMsg("");
      }, 3000);
      return () => clearTimeout(timeout);   
    }

  },[msg, bookmarks]);

  function copy(sub) {

    const el = document.createElement("input");
    el.value = "http://localhost:3000/showarticals/"+sub;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setMsg("URL Copied, Now you can share !!");

  }

  function addbookmark(subject){

    axios.post(serverUrl+'addbookmark',{
      userId: user.id,
      subject: subject,
    },{
      headers
    })
    .then(data => {
      if(data.success!==""){
        setMsg("Bookmark added successfully !!");
      }
    })
    .catch(err=>{
      console.log(err.message);
    });

  }

  function deletebookmark(subject){

    axios.get(serverUrl + 'delete_bookmark/' + user.id + "/" + subject, {
      headers
    })
    .then(data => {
      if(data.success!==""){
        setMsg("Bookmark removed successfully !!");
      }
    })
    .catch(err=>{
      console.log(err.message);
    }); 
  }

  const totalStars = 5;

  return (
    <>
      <div className="flex flex-wrap dark:bg-gray-900">
        <div className="md:flex w-full justify-center mt-6 px-4 md:px-24 md:space-x-14">
          <div class="mb-4 w-full">
            <select class="shadow border rounded w-full py-2 px-3 text-grey-darker bg-white" id="category" onChange={(e) => setCategory(e.target.value)}>
              <option value="All" selected>All</option>
              {categories && categories.map((option) => (
                <option value={option.category}>{option.category}</option>
              ))}
            </select>
          </div>
          <div className="mb-4 w-full">
            <input className="shadow border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="search subject" onChange={(e)=>setSearchQuery(e.target.value)} />
          </div>
        </div>
        <div className="px-2 md:px-16 w-full">
        {categories &&
          categories.map(catitem => {
          if(category==="All" || catitem.category===category){
            return(
              <>
                <p className="text-3xl my-2 text-orange-500 underline">{catitem.category}</p>
                <div className="flex flex-wrap w-full">
                  {allSubjects && 
                    allSubjects.map(item => {
                      if(item.category===catitem.category){
                        if(item.subject.toUpperCase().search(searchQuery.toUpperCase())!==-1){
                          return (
                            <>
                              <div className="w-full md:w-1/4 p-2 md:p-8">
                                <div className="relative shadow shadow-white rounded w-full">
                                  <img className="w-full h-40" src={item.image} alt="img"/>
                                  <div className="flex flex-col absolute right-0 top-0 bg-gray-800 p-1">
                                    <button>
                                      {bookmarks && bookmarks.find(({subject})=>subject===item.subject) ?
                                        <FontAwesomeIcon icon={faBookmark} onClick={()=>deletebookmark(item.subject)} className="text-orange-500 text-2xl hover:text-orange-500" />
                                        :
                                        <FontAwesomeIcon icon={faBookmarkAlt} onClick={()=>addbookmark(item.subject)} className="text-white text-2xl hover:text-orange-500" />
                                      }
                                    </button>
                                    <button className="mt-2" ><FontAwesomeIcon icon={faShareNodes} onClick={()=>copy(item.subject)} className="text-white text-2xl hover:text-orange-500" /></button>
                                  </div>
                                  <div className="w-full p-4">
                                    <div className="grid w-full">
                                      <p className="justify-self-center text-2xl text-white">{item.subject} Data Structures</p>
                                    </div>
                                    <div className="w-full flex flex-row justify-between mt-2">
                                      <p className="text-white text-lg"><FontAwesomeIcon icon={faDollarSign} className="text-orange-500" /> Free</p> 
                                      <p className="text-white text-lg">50 Lectures</p>
                                    </div>
                                    <div className="w-full flex flex-row justify-between">
                                      <div className="my-4">
                                      {feedbacks && feedbacks.map((fi)=>{
                                        if(fi._id===item.subject)
                                        {
                                          var activeStars=fi.avgrating;
                                          return (
                                            <div className="flex">
                                              {[...new Array(totalStars)].map((arr, index) => {
                                                return index < activeStars ? <FontAwesomeIcon icon={faStar} className="text-orange-500 mt-1" /> : <FontAwesomeIcon icon={faStarAlt} className="text-yellow-400 mt-1" />;
                                              })}
                                              &nbsp;<p style={{color: 'white'}}>{fi.count}</p>
                                            </div>
                                          )
                                        }
                                        return (
                                          <></>
                                        )
                                      })}
                                      </div>
                                      <Link to={"showarticals/"+item.subject}><button className={outlinedButton+" my-2 mt-3 text-white border-orange-500 rounded-md"}>Explore <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        }
                      }
                      return (
                        <></>
                      )
                    })
                  }
                </div>
                </>
              )
            }
            return (
              <></>
            )
          })
        }
        </div>
        {msg &&
          <div class="w-1/4 text-green-700 bg-green-100 border border-green-700 px-4 py-3 rounded-lg absolute right-0 bottom-0" role="alert">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-700 text-xl" />&nbsp;
            <span class="block sm:inline">{msg}</span>
            <button class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <FontAwesomeIcon icon={faClose} className="text-orange-500" onClick={() => setMsg("")} />
            </button>
          </div>
        }
      </div>
    </>
  );
}