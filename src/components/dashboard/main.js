import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faCode, faDashboard, faPlusCircle, faPlusSquare, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper, faPenToSquare, faUser, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { textButton } from '../../styles/style';
import CreateArticle from './createArticle';
import MyArticles from './myArticles';

export default function Main() {

  const [open, setOpen] = useState("dashboard");

  return (
    <>
      <div className="w-full flex flex-row">
        <div className="w-1/6 bg-navblue dark:bg-gray-900 text-white flex-col px-8 text-md">
          <ul className="space-y-8 py-8">
            <li>
              <button className={textButton} onClick={()=>setOpen("dashboard")} ><FontAwesomeIcon icon={faDashboard} /> &nbsp;&nbsp; Dashboard</button>
            </li>
            <li>
              <button className={textButton} onClick={()=>setOpen("writearticle")} ><FontAwesomeIcon icon={faPenToSquare} /> &nbsp;&nbsp; Write Article</button>
            </li>
            <li>
              <button className={textButton} onClick={()=>setOpen("myarticles")} ><FontAwesomeIcon icon={faNewspaper} /> &nbsp;&nbsp; My Articles</button>
            </li>
            <li>
              <button className={textButton} onClick={()=>setOpen("createpractice")} ><FontAwesomeIcon icon={faPlusCircle} /> &nbsp;&nbsp; Create Practice</button>
            </li>
            <li>
              <button className={textButton} onClick={()=>setOpen("mypractices")} ><FontAwesomeIcon icon={faCode} /> &nbsp;&nbsp; My Practices</button>
            </li>
            <li>
              <button className={textButton} onClick={()=>setOpen("writeblog")} ><FontAwesomeIcon icon={faPlusSquare} /> &nbsp;&nbsp; Write Blog</button>
            </li>
            <li>
              <button className={textButton} onClick={()=>setOpen("myblogs")} ><FontAwesomeIcon icon={faBlog} /> &nbsp;&nbsp; My Blogs</button>
            </li>
          </ul>
          <hr/>
          <ul className="space-y-8 py-8">
            <li>
              <button className={textButton} ><FontAwesomeIcon icon={faUser} /> &nbsp;&nbsp; Profile</button>
            </li>
            <li>
              <button className={textButton} ><FontAwesomeIcon icon={faUserCircle} /> &nbsp;&nbsp; Account</button>
            </li>
            <li>
              <button className={textButton} ><FontAwesomeIcon icon={faSignOut} /> &nbsp;&nbsp; Logout</button>
            </li>
          </ul>
        </div>
        <div className="w-5/6 p-6"> 
          {open==="dashboard" &&
            <h1>dashboard</h1>
          }
          {open==="writearticle" &&
            <CreateArticle />
          }
          {open==="myarticles" &&
            <MyArticles />
          }
          {open==="createpractice" &&
            <h1>createpractice</h1>
          }
          {open==="mypractices" &&
            <h1>mypractices</h1>
          }
          {open==="writeblog" &&
            <h1>writeblog</h1>
          }
          {open==="myblogs" &&
            <h1>myblogs</h1>
          }
        </div>
      </div>
    </>
  );
}