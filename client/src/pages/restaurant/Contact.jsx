import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import OrariApertura from "./OrariApertura";

function Contact() {
  return (
    <>
      <div id="contatti" className="my-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-semibold">Contatti</h1>
        </div>

        <div className="tablet:flex tablet:justify-between laptop:flex laptop:justify-around laptop:mt-4">

          <div className="top-0">
            <div className="flex flex-col items-start justify-center pl-4 my-4">
              <h1 className="text-2xl font-semibold my-2 ml-4 tablet:ml-16">
                Come contattarci
              </h1>
              <div className="bg-lime-500 w-60 h-0.5 tablet:ml-6"></div>
            </div>
            {/* PHONE NUMBER */}
            <div className="flex justify-start items-center mb-6 mt-16">
              <div className="bg-lime-500 w-1 h-16 ml-6"></div>
              <div className="flex flex-col ml-8">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 mb-2 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  <h1 className="text-xl">Cellulare</h1>
                </div>
                <h1 className="text-3xl font-semibold text-lime-600">
                  +39 3412345670
                </h1>
              </div>
            </div>

            {/* MAIL */}
            <div className="flex justify-start items-center my-6">
              <div className="bg-lime-500 w-1 h-16 ml-6"></div>
              <div className="flex flex-col ml-8">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 mb-2 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>

                  <h1 className="text-xl">Email</h1>
                </div>
                <h1 className="text-3xl font-semibold text-lime-600">
                  contatto@prova.it
                </h1>
              </div>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="flex justify-start items-center my-6">
              <div className="bg-lime-500 w-1 h-16 ml-6"></div>
              <div className="flex flex-col ml-8">
                <h1 className="text-xl">Seguici su</h1>
                <div className="flex items-center justify-between text-lime-500 mt-2">
                  <span className="text-3xl mx-2">
                    <FaFacebookSquare />
                  </span>
                  <span className="text-3xl mx-2">
                    <FaSquareXTwitter />
                  </span>
                  <span className="text-3xl mx-2">
                    <FaInstagramSquare />
                  </span>
                  <span className="text-3xl mx-2">
                    <FaLinkedin />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* OPENING HOURS */}
          <div>
            <OrariApertura />
          </div>
        </div>
      </div>
    </>
  );
}
export default Contact;
