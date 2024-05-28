import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

function Footer() {
  return (
    <>
      <div className="bg-neutral-200 font-semibold flex flex-col justify-evenly tablet:flex-row tablet:justify-around tablet:items-center py-6">
        <div className="flex flex-col text-center">
          <h1>Copyright © 2024 All Rights Reserved</h1>
        </div>

        <div className="flex flex-col tablet:justify-center tablet:items-center tablet:flex-col mt-4 text-center">
          <p className="mt-2">Created by Stefan Hritcu</p>
          <div className="flex items-center justify-center tablet:mt-2">
            <a href="https://github.com/StefanHritcu" target="_blank" rel="noopener noreferrer" className="text-3xl mx-2">
              <FaSquareGithub />
            </a>

            <a href="https://www.linkedin.com/in/stefan-hritcu-93b67028a/" target="_target" className="text-3xl mx-2">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
