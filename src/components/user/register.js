import { useState, useEffect } from 'react'
import { outlinedButton } from "../../styles/style";
import { trueOpenLogin } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faExclamationTriangle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function Register() {

  const dispatch = useDispatch();

  const [fName, setFirstName]=useState("");
  const [lName, setLastName]=useState("");
  const [email, setEmail]=useState("");
  const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");
  const [confirm_password, setConfirmPassword]=useState("");
  const [showPassword, setShowPassword]=useState(false);
  const [error, setError]=useState("");
  const [success, setSuccess]=useState("");

  useEffect(() => {

    if(error || success){
      const timeout=setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timeout);   
    }

  },[error, success]);

  function Register() {
    axios.post(serverUrl+'register', {
      fName,
      lName,
      email,
      username,
      password,
      confirm_password,
    })
    .then(result => {
      if(result.data.error){
        setError(result.data.error);
      }
      if(result.data.success){
        setSuccess(result.data.success);
      }
    })
    .catch(error => {
      console.log(error);
    }); 
  }

  return (
    <>
      <div className="flex justify-between space-x-5">
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2 dark:text-white" for="fname">
            First Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="fname" type="text" placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2 dark:text-white" for="lname">
            Last Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="lname" type="text" placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)} />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2 dark:text-white" for="username">
          Username
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2 dark:text-white" for="email">
          Email
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
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
      </div>
      <div className="mb-6">
        <label className="block text-grey-darker text-sm font-bold mb-2 dark:text-white" for="cpassword">
          Confirm Password
        </label>
        <div className="flex">
          <input className="shadow appearance-none border rounded-l w-full py-2 px-3 text-grey-darker" id="cpassword" type={!showPassword ? "password" : "text"} placeholder="confirm password" onChange={(e)=>setConfirmPassword(e.target.value)} />
          <button className="border rounded-r py-2 px-3 text-grey-darker bg-white" onClick={()=>setShowPassword(!showPassword)}>
            { !showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} /> }
          </button>
        </div>
      </div>
      <button className={outlinedButton+" mb-2"} type="button" onClick={()=>Register()} >
        Register
      </button>
      <p className="flex justify-center inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker dark:text-white" href="/">
        Already have an account? &nbsp; <button className="text-blue-400" onClick={()=>dispatch(trueOpenLogin())}>Login here</button>
      </p>
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
    </>
  );
}