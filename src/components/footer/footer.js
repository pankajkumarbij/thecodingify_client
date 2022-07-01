import { containedButton, outlinedButton, textButton } from '../../styles/style';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight, faGavel, faGlobe, faInfoCircle, faLaptopCode, faPaperPlane, faSuitcase, faUserShield, faVideo } from '@fortawesome/free-solid-svg-icons';

export default function Footer(){

  return (      
    <>
      <nav className="bg-navblue dark:bg-gray-900 border-t">
        <div className="md:flex px-2 md:px-16">
          <div className="w-full md:w-1/4 p-2 md:p-8 mt-4 md:mt-0">
            <center>
              <p className="text-4xl text-orange-500 font-semibold"><FontAwesomeIcon icon={faLaptopCode} /> Codingify</p>
              <p className="text-white italic mt-2">2nd Floor, B-555</p>
              <p className="text-white italic mt-1">Sector-121, Piprali road, Sikar</p>
              <p className="text-white italic mt-1">Rajasthan, India - 432321</p>
            </center>
            <div className="flex flex-col mt-6">
              <button className={outlinedButton+" w-full"}> <FontAwesomeIcon icon={faVideo} />&nbsp; Video Lectures</button>
              <button className={containedButton+" w-full mt-4"}>Explore Courses &nbsp;<FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2 md:p-8 mt-4 md:mt-0">
            <div className="flex md:justify-center">
              <div className=" flex-col">
                <p className="px-2 text-xl underline text-orange-500 font-bold">Company</p>
                <button className={textButton+" flex justify-center mt-5"}><FontAwesomeIcon className="mt-0.5 mr-2 text-lg" icon={faInfoCircle} /> About</button>
                <button className={textButton+" flex justify-center mt-5"}><FontAwesomeIcon className="mt-0.5 mr-2 text-lg" icon={faSuitcase} /> Carrers</button>
                <button className={textButton+" flex justify-center mt-5"}><FontAwesomeIcon className="mt-0.5 mr-2 text-lg" icon={faGlobe} /> Blogs</button>
                <button className={textButton+" flex justify-center mt-5"}><FontAwesomeIcon className="mt-0.5 mr-2 text-lg" icon={faUserShield} /> Privacy Policy</button>
                <button className={textButton+" flex justify-center mt-5"}><FontAwesomeIcon className="mt-0.5 mr-2 text-lg" icon={faGavel} /> Terms & Conditions</button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2 md:p-8 mt-4 md:mt-0">
            <div className="flex md:justify-center">
              <div className=" flex-col">
                <p className="px-2 text-xl underline text-orange-500 font-bold">Social Media</p>
                <button className={textButton+" flex justify-center mt-5"}><FontAwesomeIcon className="mt-0.5 mr-2 text-lg" icon={faFacebook} /> Facebook</button>
                <button className={textButton+" flex justify-center mt-5"}><FontAwesomeIcon className="mt-0.5 mr-2 text-lg" icon={faYoutube} /> YouTube</button>
                <button className={textButton+" flex justify-center mt-5"}><FontAwesomeIcon className="mt-0.5 mr-2 text-lg" icon={faLinkedin} /> Linkedin</button>
                <button className={textButton+" flex justify-center mt-5"}><FontAwesomeIcon className="mt-0.5 mr-2 text-lg" icon={faInstagram} /> Instagram</button>
                <button className={textButton+" flex justify-center mt-5"}><FontAwesomeIcon className="mt-0.5 mr-2 text-lg" icon={faTwitter} /> Twitter</button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2 md:p-8 mt-4 md:mt-0">
            <div className="flex md:justify-center">
              <div className=" flex-col">
                <p className="px-2 text-xl underline text-orange-500 font-bold">Contact</p>
                <input className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="enter email" />
                <textarea className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" rows="3" placeholder="enter message" />
                <button className={outlinedButton+" w-full mt-2"}><FontAwesomeIcon className="mt-0.5 mr-2 text-lg" icon={faPaperPlane} /> Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="bg-orange-500 w-full">
        <p className="flex justify-center py-2 italic text-lg text-white">Copyright © 2021. All rights reserve</p>
      </nav>
    </>
  )
}