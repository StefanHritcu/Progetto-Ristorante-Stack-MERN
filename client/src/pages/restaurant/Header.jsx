import { useState } from "react";
import LogoImage from "./images/logo.png";
import { Link } from "react-router-dom";

function Header() {
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState(false);

  const handleHamburger = () => {
    setOpenHamburgerMenu(!openHamburgerMenu);
  };

  const handleScrollToLink = (id) => {
    const targetElement = document.getElementById(id);
    if (!targetElement) return;
  
    const { offsetTop } = targetElement;
    const duration = 1200;
    const startTime = performance.now();
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t ** 3 : ((t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
  
    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      window.scrollTo(0, offsetTop * easeInOutCubic(progress));
      if (elapsedTime < duration) requestAnimationFrame(animateScroll);
    };
  
    requestAnimationFrame(animateScroll);
  };
  const handleScrollToLinkHamburger = (id) => {
    setOpenHamburgerMenu(!openHamburgerMenu)
    const targetElement = document.getElementById(id);
    if (!targetElement) return;
  
    const { offsetTop } = targetElement;
    const duration = 1200;
    const startTime = performance.now();
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t ** 3 : ((t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
  
    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      window.scrollTo(0, offsetTop * easeInOutCubic(progress));
      if (elapsedTime < duration) requestAnimationFrame(animateScroll);
    };
  
    requestAnimationFrame(animateScroll);
  };
  
  return (
    <>
      <header className="relative z-50 flex flex-col bg-white">
        {/*   GREEN HEADER ONLY FOR TABLET & LAPTOP */}
        <div className="hidden tablet:block bg-lime-500 py-3 pl-6">
          <div className="flex items-center text-white text-tiny">
            <h1 className="hover:text-black duration-1000 delay-100 cursor-pointer">
              +39 06 1234567
            </h1>
            <span className="mx-4">|</span>
            <h1 className="hover:text-black duration-1000 delay-100 cursor-pointer">
              contatto@prova.it
            </h1>
          </div>
        </div>
        <div className="relative flex justify-start items-center py-2">
          <Link
            to="/"
            title="Home"
            className="cursor-pointer normalPhone:pl-4 tablet:pl-10 laptop:pl-16 flex items-center"
          >
            <img className="w-12 h-auto" src={LogoImage} alt="logo" />
            <h1 className="font-elegant text-large ml-2">La Trattoria</h1>
          </Link>

          {/* HEADER LINKS */}
          <div className="hidden laptop:block ml-32">
            <div className="flex items-center font-semibold">
              <a onClick={() => handleScrollToLink("homepage")} className="pr-3 hover:text-lime-500 cursor-pointer">Home</a>
              <h1 onClick={() => handleScrollToLink("chisiamo")} className="px-3 hover:text-lime-500  cursor-pointer">Chi siamo</h1>
              <h1 onClick={() => handleScrollToLink("servizi")} className="px-3 hover:text-lime-500  cursor-pointer">Servizi</h1>
              <h1 onClick={() => handleScrollToLink("contatti")} className="pl-3 hover:text-lime-500  cursor-pointer">Contatti</h1>
            </div>
          </div>

          {/* RESERVATION LINK */}
          <Link
            to="/prenotazione"
            className="absolute cursor-pointer hidden tablet:block right-28 bg-lime-500 text-white px-4 py-2 rounded-md"
            title="Prenota subito un tavolo"
          >
            <h1>Prenotazione</h1>
          </Link>

          {/* HAMBURGER BUTTON */}
          <div
            onClick={handleHamburger}
            className={`absolute tablet:pr-2 laptop:hidden right-4 ${
              openHamburgerMenu ? "hidden" : "block"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>

        {/* HAMBURGER MENU LINKS */}
        <div
          className={`fixed h-screen inset-0 bg-white bg-opacity-100 z-50 flex flex-col items-center justify-center transform transition-transform duration-300 ${
            openHamburgerMenu ? "block" : "hidden"
          }`}
        >
          <div onClick={handleHamburger} className="absolute top-2 right-5 tablet:top-14 tablet:right-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex flex-col top-12 text-4xl font-elegant font-semibold">
            <a onClick={() => handleScrollToLinkHamburger("homepage")} className="mb-6 hover:text-lime-500 cursor-pointer">Home</a>
            <a onClick={() => handleScrollToLinkHamburger("chisiamo")} className="my-6 hover:text-lime-500 cursor-pointer">Chi siamo</a>
            <a onClick={() => handleScrollToLinkHamburger("servizi")} className="my-6 hover:text-lime-500 cursor-pointer">Servizi</a>
            <a onClick={() => handleScrollToLinkHamburger("contatti")} className="mt-6 hover:text-lime-500 cursor-pointer">Contatti</a>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
