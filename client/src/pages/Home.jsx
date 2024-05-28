import { useEffect, useState } from "react";
import Header from "./restaurant/Header";
import Homepage from "./restaurant/Homepage";
import Loading from "./restaurant/Loading";
import WeOffer from "./restaurant/WeOffer";
import AboutUs from "./restaurant/AboutUs";
import Contact from "./restaurant/Contact";
import Footer from "./restaurant/Footer";

import { FaArrowUp } from "react-icons/fa";

function Home() {
  const [loadingPage, setLoadingPage] = useState(true);
  const [viewProject, setViewPreject] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingPage(!loadingPage);
      setViewPreject(!viewProject);
    }, 800);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return() => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      <div>
        <div className="relative flex  items-center justify-center transform transition-transform duration-300">
          {/* LOADING  */}
          <div
            className={`absolute top-64 ${loadingPage ? "block" : "hidden"}`}
          >
            <Loading />
          </div>

          <div className={` ${viewProject ? "block" : "hidden"}`}>
            <Header />
            <Homepage />

            {/* BODY OF HOMEPAGE */}
            <AboutUs />
            <WeOffer />
            <Contact />
            <Footer />
          </div>
        </div>

        {/* SCROLL TO TOP */}
        <div onClick={scrollToTop}
          className={`fixed bottom-4 right-4 cursor-pointer text-white bg-lime-500 rounded-full w-12 h-12 flex items-center justify-center ${
            isVisible ? "block" : "hidden"
          }`}
        >
          <FaArrowUp className="w-8 h-8" />
        </div>
      </div>
    </>
  );
}
export default Home;
