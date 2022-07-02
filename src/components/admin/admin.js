import { useState, useEffect } from "react";
import { outlinedButton } from "../../styles/style";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faExclamationTriangle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function Admin() {

  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [showPassword, setShowPassword]=useState(false);
  const [error, setError]=useState("");
  const [success, setSuccess]=useState("");

  useEffect(() => {

    if(error || success) {
      const timeout=setTimeout(() => {
        setError("");
        setSuccess("");
        console.log("called");
      }, 3000);
      return () => clearTimeout(timeout);
    }

  },[error, success]);
    
  function AdminLogin() {
    axios.post(serverUrl+'admin', {
      email,
      password
    })
    .then(function (result) {
      console.log(result);
      if(result.data.error){
        setError(result.data.error);
      }
      if(result.data.message.success){
        setSuccess(result.data.message.success);
        localStorage.setItem('token', result.data.token);
        window.location.reload(false);
      }
    })
    .catch(function (error) {
      console.log(error);
    }); 

    console.log("ok");
  }

  return (
    <>
      <div className="flex justify-center items-center h-modal h-full my-16">
        <div className="shadow-2xl px-4 w-full rounded max-w-xl h-auto bg-white dark:bg-gray-800 py-4">
          <p className="flex justify-center text-xl font-bold text-orange-500 mt-4"><u>Admin Login</u></p>
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2 dark:text-white" for="username">
              Email / username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="username / email" onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2 dark:text-white" for="password">
              Password
            </label>
            <div className="flex">
              <input className="shadow appearance-none border rounded-l w-full py-2 px-3 text-grey-darker" id="password" type={!showPassword ? "password" : "text"} placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
              <button className="border rounded-r py-2 px-3 text-grey-darker bg-white" onClick={()=>setShowPassword(!showPassword)}>
                { !showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} /> }
              </button>
            </div>
            <a className="font-bold text-sm text-red-500 hover:text-blue-darker" href="/">
              Forgot Password?
            </a>
          </div>
          <button className={outlinedButton+" mb-2 w-full"} type="button" onClick={()=> AdminLogin()} >
            Sign In
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