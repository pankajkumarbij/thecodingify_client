import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { falseOpen, trueOpenLogin, trueOpenRegister } from '../../redux/actions';
import Login from './login';
import Register from './register';

export default function Model() {

  const isOpenModel = useSelector((state) => state.changeOpenModel);
  const dispatch = useDispatch();

  const isHidden = isOpenModel!==0 ? "" : "hidden ";
  
  let bgTabColorLogin = "";
  if(isOpenModel===1){
    bgTabColorLogin = "bg-gray-200 dark:bg-gray-700 ";
  }
  else{
    bgTabColorLogin="";
  }

  let bgTabColorRegister = "";
  if(isOpenModel===2){
    bgTabColorRegister = "bg-gray-200 dark:bg-gray-700 ";
  }
  else{
    bgTabColorRegister="";
  }

  return (
    <>
      <div id="defaultModal" aria-hidden="true" className={isHidden+"flex justify-center overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 items-center h-modal h-full backdrop-brightness-50"}>
        <div className="relative shadow-2xl px-4 w-full rounded max-w-xl h-full h-auto bg-white dark:bg-gray-800">
          <div className="flex justify-between items-start p-2 rounded-t">
            <button type="button" className="text-gray-800 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:text-white dark:hover:bg-white dark:hover:text-black" onClick={()=> dispatch(falseOpen())} >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <ul className="flex rounded-lg divide-x divide-gray-300 shadow sm:flex dark:divide-gray-500 border-b border-gray-300 dark:border-gray-500">
            <li className="w-full">
              <button className={bgTabColorLogin+"inline-block relative py-4 px-4 w-full text-sm font-medium text-center text-gray-800 rounded-l-lg hover:ring-2 hover:ring-orange-500 hover:z-20 active dark:text-white"} onClick={()=>dispatch(trueOpenLogin())} >Login</button>
            </li>
            <li className="w-full">
              <button className={bgTabColorRegister+"inline-block relative py-4 px-4 w-full text-sm font-medium text-center text-gray-800 rounded-r-lg hover:ring-2 hover:ring-orange-500 hover:z-20 active dark:text-white"} onClick={()=>dispatch(trueOpenRegister())} >Register</button>
            </li>
          </ul>
          <div className="bg-white rounded px-4 p-6 flex flex-col dark:bg-gray-800">
            {isOpenModel===1 &&
              <Login />
            }
            {isOpenModel===2 &&
              <Register />
            }
          </div>
        </div>
      </div>
    </>
  );
}