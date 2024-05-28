import HomepageImg from "./images/homepageImage.jpg";
import CarbonaraImg from "./images/carbonara.png"

function Homepage() {
  return (
    <>
      <div id="homepage" className="relative">
        <img
          className="h-[60vh] w-full transform opacity-10 brightness-75 mt-2 laptop:h-[80vh] laptop:w-screen"
          src={HomepageImg}
          alt="homepage img"
        />
        <h1 className="absolute top-6 tablet:ml-12 font-elegant text-large left-6">
          I migliori piatti e ingredienti
        </h1>
        <h1 className="absolute mt-10 top-10 text-xl normalPhone:text-4xl normalPhone:mt-8 normalPhone:font-bold tablet:mt-10 laptop:ml-10 text-xxl text-center px-3 font-elegant">
          La Cucina Romana Autentica: Gusto e Tradizione nel Cuore di Roma
        </h1>
        <h1 className="smallPhone:hidden normalPhone:block absolute px-6 top-64 text-center normalPhone:text-lg tablet:text-xl tablet:mx-6 tablet:absolute tablet:top-52">
          Sapore autentico delle nonne romane, ingredienti semplici, piatti
          genuini, un viaggio nel cuore della tradizione culinaria romana.
        </h1>

        {/* CARBONARA IMAGE */}
        <div>
            <img className="absolute z-20 hidden tablet:block tablet:top-72 tabletGrande:mt-20 tabletMaxi:mt-6 laptop:top-60" src={CarbonaraImg} alt="carbonara image" />
        </div>
      </div>
    </>
  );
}
export default Homepage;
