import { useEffect, useState } from "react";
import { BiDrink } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiPartyPopper } from "react-icons/gi";
import CardEventi from "./CardEventi";

//!IMPORT OF THE IMAGE CARD 
import Pranzi from "./images/prazo.png";
import Aperitivi from "./images/aperitivo.png";
import Eventi from "./images/event.png"
import Cene from "./images/hamburgerFood.png"

function WeOffer() {
  const [data, setData] = useState([]);
  {
    /* SIMULO UNA RICHIESTA AL SERVER DEI DATI CHE INSERIRO DENTRO IL COMPONENTE CARD */
  }
  useEffect(() => {
    const fetchData = async () => {
      const eventiOfferti = [
        {
          icon: <IoFastFoodOutline />,
          title: "Pranzi",
          description:
            "Pranzo raffinato con piatti deliziosi e ingredienti freschi. Atmosfera elegante, servizio impeccabile, perfetto per ogni occasione.",
          image: Pranzi,
        },
        {
          icon: <BiDrink />,
          title: "Aperitivi",
          description:
            "Aperitivo elegante con stuzzichini gourmet e cocktail creativi. Atmosfera sofisticata, ideale per momenti di relax e socialità.",
          image: Aperitivi,
        },
        {
          icon: <GiPartyPopper />,
          title: "Eventi",
          description:
            "Spazio flessibile e accogliente per eventi personalizzati. Servizio attento alle esigenze, creando esperienze uniche e indimenticabili.",
          image: Eventi,
        },
        {
          icon: <IoFastFoodOutline />,

          title: "Cene",
          description:
            "Cene esclusive con piatti gourmet e atmosfera sofisticata. Servizio impeccabile e ambiente incantevole per serate memorabili.",
          image: Cene,
        },
      ];
      setData(eventiOfferti);
    };
    fetchData();
  }, []);

  return (
    <>
      <div id="servizi" className="bg-neutral-200 tablet:px-6 tablet:py-6">
      {/* TITLE */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-mainText font-bold pt-2 tablet:text-xxl">
          Cosa offriamo
        </h1>
        <div className="bg-green-500 h-0.5 w-48 mb-6"></div>

        <div className="flex flex-col md:flex-row flex-wrap tablet:flex">
          {data.map((item, index) => (
            <div key={index} className="w-full md:w-1/2 laptop:w-1/4">
              <CardEventi
                icon={item.icon}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
export default WeOffer;
