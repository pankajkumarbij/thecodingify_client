import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight, faSearch, faVideo } from '@fortawesome/free-solid-svg-icons';
import { containedButton, outlinedButton, textButton } from '../../styles/style';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="flex flex-wrap dark:bg-gray-900">
        <div className="w-full md:w-1/2 p-6 md:px-24 md:py-20">
          <div className="flex justify-center pt-4">
            <div>
              <p className="font-medium text-orange-500 text-3xl lg:text-5xl md:text-4xl flex justify-center md:justify-start">Learn from Anywhere</p>
              <p className="font-medium text-gray-900 dark:text-white mt-2 text-3xl lg:text-5xl md:text-4xl flex justify-center md:justify-start">With Best Instructors</p>
              <p className="font-medium text-green-500 mt-2 text-3xl lg:text-5xl md:text-4xl flex justify-center md:justify-start">on The Codingify</p>
              <p className="font-medium text-gray-600 dark:text-gray-300 mt-2 text-base md:text-xl md:w-11/12 flex justify-center md:justify-start">Self Learn Computer Science related courses</p>
              <p className="font-medium text-gray-600 dark:text-gray-300 mt-2 text-base md:text-xl md:w-11/12 flex justify-center md:justify-start">and regularly practice them practically</p>
              <p className="font-medium text-gray-600 dark:text-gray-300 mt-2 text-base md:text-xl md:w-11/12 flex justify-center md:justify-start">to creck the Placement in yout dream company.</p>
              <div className="flex justify-center sm:justify-start space-x-7 sm:space-x-7 mt-6">
                <button className="p-1 md:p-1.5 border rounded border-gray-400 hover:border-orange-500 hover:border-dashed"><FontAwesomeIcon className="text-blue-600 text-2xl" icon={faFacebook} /></button>
                <button className="p-1 md:p-1.5 border rounded border-gray-400 hover:border-orange-500 hover:border-dashed"><FontAwesomeIcon className="text-red-500 text-2xl" icon={faYoutube} /></button>
                <button className="p-1 md:p-1.5 border rounded border-gray-400 hover:border-orange-500 hover:border-dashed"><FontAwesomeIcon className="text-blue-400 text-2xl" icon={faLinkedinIn} /></button>
                <button className="p-1 md:p-1.5 border rounded border-gray-400 hover:border-orange-500 hover:border-dashed"><FontAwesomeIcon className="text-orange-600 text-2xl" icon={faInstagram} /></button>
                <button className="p-1 md:p-1.5 border rounded border-gray-400 hover:border-orange-500 hover:border-dashed"><FontAwesomeIcon className="text-blue-500 text-2xl" icon={faTwitter} /></button>
              </div>
              <Link to="/explore">
                <div className="flex justify-center sm:justify-start mt-6">
                  <button className="shadow border rounded-l-lg py-2 px-3 text-orange-500 bg-white">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                  <input className="shadow appearance-none border w-full md:w-8/12 py-2 px-3 text-grey-darker" id="password" type="text" placeholder="search..." />
                  <button className="shadow border rounded-r-lg py-2 px-3 text-orange-500 hover:bg-orange-500 hover:text-white bg-white">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 mb-4">
          <div className="flex justify-center md:pt-7">
            <img className="w-11/12 md:mt-7 md:w-8/12" src="../images/home1.png" alt="img" />
          </div>
        </div>
      </div>
      <div className="dark:bg-gray-900">
        <div className="flex justify-between px-4 md:px-24">
          <p className="text-gray-900 text-xl md:text-2xl dark:text-white mb-3">Populer Category</p>
          <button className={textButton+" text-blue-600 mb-2"}>View All</button>
        </div>
        <div className="flex flex-wrap px-2 md:px-16">
          <div className="w-full md:w-1/4 p-2 md:px-8 py-2">
            <div className="shadow shadow-white rounded bg-purple-800 px-8 pt-1 pb-2">
              <center>
                <img className="my-4" src="../images/dsa.png" alt="img" width="50%" />
                <p className="text-xl text-white">Data Structure & Algorithms</p>
                <button className={outlinedButton+" my-4 text-white border-gray-900"}>Explore Courses &nbsp;<FontAwesomeIcon icon={faArrowRight} /></button>
              </center>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2 md:px-8 py-2">
            <div className="shadow shadow-white rounded bg-amber-600 px-8 pt-1 pb-2">
              <center>
                <img className="my-4" src="../images/web.png" alt="img" width="70%" />
                <p className="text-xl text-white">Web Development (Frontend & Backend)</p>
                <button className={outlinedButton+" my-4 text-white border-gray-900"}>Explore Courses &nbsp;<FontAwesomeIcon icon={faArrowRight} /></button>
              </center>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2 md:px-8 py-2">
            <div className="shadow shadow-white rounded bg-pink-700 px-8 pt-1 pb-2">
              <center>
                <img className="my-4" src="../images/mobile.png" alt="img" width="61%" />
                <p className="text-xl text-white">Mobile Development (Android & IOS)</p>
                <button className={outlinedButton+" my-4 text-white border-gray-900"}>Explore Courses &nbsp;<FontAwesomeIcon icon={faArrowRight} /></button>
              </center>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2 md:px-8 py-2">
            <div className="shadow shadow-white rounded bg-emerald-600 px-8 pt-1 pb-2">
              <center>
                <img className="my-4" src="../images/ml.png" alt="img" width="50%" />
                <p className="text-xl text-white">Data Science & Machine Learning</p>
                <button className={outlinedButton+" my-4 text-white border-gray-900"}>Explore Courses &nbsp;<FontAwesomeIcon icon={faArrowRight} /></button>
              </center>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap dark:bg-gray-900 flex-col-reverse md:flex-row">
          <div class="w-full md:w-1/2 mb-4">
            <div className="flex justify-center md:pt-7">
              <img className="w-11/12 md:mt-7 md:w-7/12" src="../images/home.png" alt="img" />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-6 md:px-24 md:py-20">
            <div className="flex justify-center pt-4">
              <div>
                <p className="font-medium text-orange-500 text-3xl lg:text-5xl md:text-4xl flex justify-center md:justify-start">Learn Everything</p>
                <p className="font-medium text-gray-900 dark:text-white mt-2 text-3xl lg:text-5xl md:text-4xl flex justify-center md:justify-start">Related to Coding</p>
                <p className="font-medium text-green-500 mt-2 text-3xl lg:text-5xl md:text-4xl flex justify-center md:justify-start">on One Platform</p>
                <p className="font-medium text-gray-600 dark:text-gray-300 mt-2 text-base md:text-xl flex justify-center md:justify-start">Learn all the computer science related subjects</p>
                <p className="font-medium text-gray-600 dark:text-gray-300 mt-2 text-base md:text-xl flex justify-center md:justify-start">and technologies like Data Structure & Algo, </p>
                <p className="font-medium text-gray-600 dark:text-gray-300 mt-2 text-base md:text-xl flex justify-center md:justify-start">Web Development and Mobile Development</p>
                <div className="flex justify-center sm:justify-start mt-6 space-x-1 md:space-x-2">
                  <button className={outlinedButton}><FontAwesomeIcon icon={faVideo} /> Video Lectures</button>
                  <button className={containedButton}>Explore Courses <FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}