import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader, faCaretDown, faCode, faDashboard, faGlobe, faHome, faLaptopCode, faListCheck, faSignInAlt, faSignOut, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { containedButton, outlinedButton } from '../../styles/style';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { trueOpenLogin, trueOpenRegister } from '../../redux/actions/index';
import Model from '../user/model';
import { useNavigate } from 'react-router-dom';
import { user } from '../../utils/user';

export default function Navbar(){

  const [toggle, setToggle] = useState(true);

  const isOpenModel = useSelector((state) => state.changeOpenModel);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function Logout(){
    localStorage.removeItem('token');
    navigate("/");
    window.location.reload(false);
  }

  return (      
    <nav className="bg-navblue px-2 sm:px-6 py-3 dark:bg-gray-900 border-b">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div>
          <Link to="/"><p className="self-center text-orange-500 text-xl font-semibold whitespace-nowrap"><FontAwesomeIcon icon={faLaptopCode} /> Codingify</p></Link>
        </div>
        <div className="flex items-center md:order-2">
          {isOpenModel===0 ?
            <>
            {user==='no user' ?
              <>
                <button className={outlinedButton} onClick={()=>dispatch(trueOpenLogin())} ><FontAwesomeIcon icon={faSignInAlt} />&nbsp; Login</button> &nbsp;&nbsp;
                <button className={containedButton+" hidden"} onClick={()=>dispatch(trueOpenRegister())} ><FontAwesomeIcon icon={faUserPlus} />&nbsp; Register</button>
              </>
            :
              <div className="relative group">
                <button type="button">
                  <img className="w-8 h-8 rounded-full" src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg" alt="user img" />
                </button>
                <div className="absolute hidden right-0 bg-white rounded divide-y divide-gray-300 border shadow dark:bg-gray-900 dark:border dark:divide-gray-600 group-hover:block" id="dropdown">
                  <div className="py-3 px-4">
                    <span className="block text-sm text-gray-900 dark:text-white">{user.fName+" "+user.lName}</span>
                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                  </div>
                  <ul className="py-1" aria-labelledby="dropdown">
                    <li>
                      <Link to="/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:text-gray-200 dark:hover:text-white"><FontAwesomeIcon icon={faUser} />&nbsp; Profile</Link>
                    </li>
                    <li>
                      <Link to="/dashboard" className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:text-gray-200 dark:hover:text-white"><FontAwesomeIcon icon={faDashboard} />&nbsp; Dashboard</Link>
                    </li>
                    <li>
                      <button className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:text-gray-200 dark:hover:text-white" onClick={()=>Logout()} ><FontAwesomeIcon icon={faSignOut} />&nbsp; Logout</button>
                    </li>
                  </ul>
                </div>
              </div> 
            }
            </>
            :
            <Model />
          }
          <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false" onClick={()=>setToggle(!toggle)}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        <div className={(toggle ? "hidden " : "")+"justify-between items-center w-full md:flex md:w-auto md:order-1"} id="mobile-menu-2">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-14 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link to="/"><a href="/" className="block py-2 pr-4 pl-3 text-white border-b hover:bg-orange-500 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0"><FontAwesomeIcon className="mr-0.5" icon={faHome} />&nbsp;Home</a></Link>
            </li>
            <li className="relative group">
              <button className="block py-2 pr-4 pl-3 text-white border-b hover:bg-orange-500 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0"><FontAwesomeIcon icon={faBookReader} />&nbsp;&nbsp;Courses <FontAwesomeIcon icon={faCaretDown} /></button>
              <ul className="fixed hidden bg-white rounded divide-y divide-gray-300 border shadow dark:bg-gray-900 dark:border dark:divide-gray-600 group-hover:block" aria-labelledby="dropdown" id="dropdown">
                <li>
                  <Link to="/explore" className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:text-gray-200 dark:hover:text-white">Explore All</Link>
                </li>
                <li>
                  <Link to="/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:text-gray-200 dark:hover:text-white">Data Structures & Algorithms</Link>
                </li>
                <li>
                  <Link to="/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:text-gray-200 dark:hover:text-white">Web Development</Link>
                </li>
                <li>
                  <Link to="/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:text-gray-200 dark:hover:text-white">Mobile App Development</Link>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <button className="block py-2 pr-4 pl-3 text-white border-b hover:bg-orange-500 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0"><FontAwesomeIcon icon={faCode} />&nbsp;&nbsp;Practice <FontAwesomeIcon icon={faCaretDown} /></button>
              <ul className="fixed hidden bg-white rounded divide-y divide-gray-300 border shadow dark:bg-gray-900 dark:border dark:divide-gray-600 group-hover:block" aria-labelledby="dropdown" id="dropdown">
                <li>
                  <a href="/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:text-gray-200 dark:hover:text-white">Data Structures</a>
                </li>
                <li>
                  <a href="/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:text-gray-200 dark:hover:text-white">Algorithms</a>
                </li>
              </ul>
            </li>
            <li className="relative group">
              <button className="block py-2 pr-4 pl-3 text-white border-b hover:bg-orange-500 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0"><FontAwesomeIcon icon={faListCheck} />&nbsp;&nbsp;Trainings <FontAwesomeIcon icon={faCaretDown} /></button>
              <ul className="fixed hidden bg-white rounded divide-y divide-gray-300 border shadow dark:bg-gray-900 dark:border dark:divide-gray-600 group-hover:block" aria-labelledby="dropdown" id="dropdown">
                <li>
                  <a href="/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:text-gray-200 dark:hover:text-white">Corporate Training</a>
                </li>
                <li>
                  <a href="/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:text-gray-200 dark:hover:text-white">College Trainings</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/" className="block py-2 pr-4 pl-3 text-white border-b hover:bg-orange-500 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0"><FontAwesomeIcon className="mr-0.5" icon={faGlobe} />&nbsp;Blogs</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}