import ChiSiamoImg from "./images/chisiamo.jpg";

function AboutUs() {
  return (
    <>
      <div id="chisiamo" className="flex flex-col laptop:flex-row laptop:justify-between laptop:items-center laptop:mx-6 my-12">
        <div className="w-forImg tablet:w-threeImg  mx-auto mt-4 mb-10">
        <h1 className="text-lime-500 text-2xl tablet:text-3xl mb-8 font-semibold">Chi Siamo</h1>
          <img className="rounded-xl" src={ChiSiamoImg} alt="Chi siamo img" />
        </div>
        <div className="flex flex-col px-6">
          <h1 className="text-3xl tablet:text-4xl font-semibold pb-4 laptop:text-center">Perché siamo i migliori dal 1994</h1>

          <div className="text-gray-500 laptop:text-center laptop:mt-6">
            <h3 className="pb-2 laptop:mt-6">
              La nostra cucina incarna l autentico gusto italiano, conquistando
              palati dal 1994 con passione e qualità impeccabile.
            </h3>
            <h3 className="py-4 laptop:mt-6">
              L ospitalità calorosa e l attenzione ai dettagli fanno di noi un
              punto di riferimento gastronomico amato da tutti.
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
export default AboutUs;
