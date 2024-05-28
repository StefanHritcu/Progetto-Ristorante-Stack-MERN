import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setHomeAdminViewsed,
  setNotificationIdClicked,
  setViewNotification,
} from "../../../../redux/actions";

function Notifications() {
  const [prenotazioni, setPrenotazioni] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/prenotazione/lastReservation"
        );
        const ultimePrenotazioni = response.data;
        setPrenotazioni(ultimePrenotazioni);
      } catch (error) {
        console.error(
          "Errore durante il recupero delle ultime prenotazioni:",
          error
        );
      }
    };

    fetchData();
    // ! POLLING
    const intervalReservations = setInterval(fetchData, 1000);
    return () => clearInterval(intervalReservations);
  }, []);

  const dispatch = useDispatch();


  //! delete message clicked

  const fetchClickAndDeleteMessage = async (prenotazioneId) => {
    try {
      const response = await axios.delete("http://localhost:5000/prenotazione/deleteMessage", {
        data: { messageId: prenotazioneId },
      })
      console.log("Messaggio eliminato con successo:", response.data)
    } catch (error) {
      console.error("Errore durante l'eliminazione del messaggio:", error)
    }
  }

  const handleById = (prenotazioneId) => {

    fetchClickAndDeleteMessage(prenotazioneId)

    console.log("Hai cliccato sulla prenotazione con ID:", prenotazioneId);
    dispatch(setNotificationIdClicked(prenotazioneId));
    dispatch(setViewNotification(false));
    dispatch(setHomeAdminViewsed());
  };

  const closeNotifications = useSelector(
    (state) => state.notifications.viewNotification
  );



  return (
    <div
      className={`absolute bg-gray-300 right-0 h-auto top-12 tablet:-top-4 z-50 ${
        closeNotifications ? "block" : "hidden"
      }`}
      
    >
      <div className="p-4">
        <h1 className="text-lg font-semibold">Nuove</h1>
      </div>
      {prenotazioni.slice(0).reverse().map((prenotazione, index) => (
        <div className="flex flex-col w-80 pb-2 px-2 " key={index}>
          <div
            onClick={() => handleById(prenotazione._id)}
            className="flex py-4 pl-4 cursor-pointer rounded-xl hover:bg-violet-200 bg-violet-100"
          >
            {/* ICON */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 text-white bg-green-600 rounded-full p-2 mr-2 flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            {/* NEW NOTIFICATION */}
            <div className="text-sm">
              <h1 className="font-semibold">
                Prenotazione effettuata da{" "}
                <span className="font-bold">
                  {prenotazione.nomeAndCognome}
                </span>{" "}
                per il giorno{" "}
                <span className="font-bold">{prenotazione.data}</span> per{" "}
                <span className="font-bold">{prenotazione.persone}</span>{" "}
                persone.
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
