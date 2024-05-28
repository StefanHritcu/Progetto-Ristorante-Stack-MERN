import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setShowEmail } from "../../../redux/actions";

const DayAfterTomorrow = () => {
  const [sortedReservations, setSortedReservations] = useState([]);

  const [reservationDayAfterTomorrow, setReservationDayAfterTomorrow] =
    useState(0);
  const [peopleDayAfterTomorrow, setPeopleDayAfterTomorrow] = useState(0);

  //COST AND PROFIT MANAGEMENT
  const [costPerDay, setCostPerDay] = useState(0);
  const [profitPerDay, setProfitPerDay] = useState(0);

  //* calcolo costo
  useEffect(() => {
    const costoPerCliente = 22.69;
    const totalePersoneDayAfterTomorrow = peopleDayAfterTomorrow;
    const totaleCostoPerDayAfterTomorrow = (costoPerCliente * totalePersoneDayAfterTomorrow).toFixed(
      0
    );
    setCostPerDay(totaleCostoPerDayAfterTomorrow);
  }, [peopleDayAfterTomorrow]);

  //*calcolo profitto
  useEffect(() => {
    const profittoPerCliente = 5;
    const totalePersoneDayAfterTomorrow = peopleDayAfterTomorrow;
    const totaleProfittoPerDayAfterTomorrow = (
      totalePersoneDayAfterTomorrow * profittoPerCliente
    ).toFixed(0);
    setProfitPerDay(totaleProfittoPerDayAfterTomorrow);
  }, [peopleDayAfterTomorrow]);

  const fetchDayAfterTomorrow = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admindashboard/dayAfterTomorrow"
      );
      const todayData = response.data;
      const sortedData = todayData.sort((a, b) => a.ora.localeCompare(b.ora));
      setSortedReservations(sortedData);
    } catch (error) {
      console.error(
        "Errore durante il recupero delle prenotazioni per DAYAFTERTOMORROW:",
        error
      );
    }
  };

  useEffect(() => {
    fetchDayAfterTomorrow();
  }, []);


  const handleConferma = async (prenotazioneId) => {
    console.log(prenotazioneId);
    try {
      const response = await axios.patch(
        "http://localhost:5000/admindashboard/confermata",
        { id: prenotazioneId }
      );
      const confermata = response.data;
      console.log(confermata);
      fetchDayAfterTomorrow();
    } catch (error) {
      console.error("Errore durante l'invio dell'Id al server:", error);
    }
  };

  const handleNonConfermare = async (prenotazioneId) => {
    console.log(prenotazioneId);
    try {
      const response = await axios.patch(
        "http://localhost:5000/admindashboard/nonconfermata",
        { id: prenotazioneId }
      );
      const nonConfermata = response.data;
      console.log(nonConfermata);
      fetchDayAfterTomorrow();
    } catch (error) {
      console.error("Errore durante l'invio dell'id al server:", error);
    }
  };

  const dispatch = useDispatch();

  const handleEmail = async (prenotazioneEmail) => {
    console.log(prenotazioneEmail);
    try {
      const searchEmail = await axios.get(
        `http://localhost:5000/admindashboard/sendemail?id=${prenotazioneEmail}`
      );
      const email = searchEmail.data;
      dispatch(setShowEmail(email));
    } catch (error) {
      console.error("Errore durante l'invio dell'id al server:", error);
    }
  };

  //! GET TOTAL RESERVATIONS FROM DAY AFTER TOMORROW
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admindashboard/dayAfterTomorrowReservations"
        );
        console.log("controllo prenotazioni per DAY AFTER TOMORROW", response);

        setReservationDayAfterTomorrow(
          response.data.totalReservationsDayAfterTomorrow
        );
      } catch (error) {
        console.error(
          "Errore durante il recupero delle prenotazioni per DAY AFTER TOMORROW:",
          error
        );
      }
    };
    fetchData();
  }, []);

  //! GET TOTAL PEOPLES FROM DAY AFTER TOMORROW
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admindashboard/dayAfterTomorrowPeoples"
        );
        console.log("controllo persone per DAY AFTER TOMORROW", response);
        setPeopleDayAfterTomorrow(response.data.totalPeoples);
      } catch (error) {
        console.error(
          "Errore durante il recupero delle persone per DAY AFTER TOMORROW:",
          error
        );
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="z-10">
        {/* ------INFORMATION DAY NUMBERS------ */}

        <div className="flex flex-col tablet:flex-row tablet:justify-start items-center border-b border-neutral-200 py-4">
          <div className="flex justify-start items-center py-4 tablet:py-0">
            {/* RESERVATIONS */}
            <div className="px-4">
              <h1 className="text-neutral-500">
                Prenotazioni:{" "}
                <span className="text-neutral-600 font-semibold">
                  {reservationDayAfterTomorrow}
                </span>
              </h1>
            </div>

            {/* TABLES */}
            <div className="px-4">
              <h1 className="text-neutral-500">
                Tavoli:{" "}
                <span className="text-neutral-600 font-semibold">
                  {reservationDayAfterTomorrow}
                </span>
              </h1>
            </div>

            {/* GUEST */}
            <div className="px-4">
              <h1 className="text-neutral-500">
                Persone:{" "}
                <span className="text-neutral-600 font-semibold">
                  {peopleDayAfterTomorrow}
                </span>
              </h1>
            </div>
          </div>

          <div className="py-4 tablet:py-0">
            {/* COSTI/PROFITTI MEDI  */}
            <div className="px-4 flex items-center">
              <div className="flex items-center mr-3">
                <h1>Costi medi: </h1>
                <span className="text-red-600 font-semibold mx-2">
                  {costPerDay} €
                </span>
              </div>

              <div className="flex items-center ml-3">
                <h1>Profitto medio: </h1>
                <span className="text-green-600 font-semibold mx-2">
                  {profitPerDay} €
                </span>
              </div>
            </div>
          </div>
        </div>
        {sortedReservations.map((prenotazione, index) => (
          <div key={index} className="flex flex-col w-screen">
            <div className="bg-neutral-100 border border-t border-gray-400 py-1 pl-8 font-semibold">
              {prenotazione.ora}
            </div>
            <div className="flex justify-between items-center px-4 border border-gray-200 py-2">
              <div>
                <span className="font-bold">{prenotazione.persone}</span> p.
              </div>
              <div className="font-bold font-mono w-20 tablet:w-56 text-xl">
                {prenotazione.nomeAndCognome}
              </div>
              <div className="hidden tablet:block">{prenotazione.dettagliAggiuntivi}</div>

              <div className="flex items-center justify-center">
                {/* CONFERMA PRENOTAZIONE => handleConferma manda in console l'id della prenotazione cliccata */}
                <div
                  title="Conferma"
                  onClick={() => handleConferma(prenotazione._id)}
                  className={`cursor-pointer ${
                    prenotazione.confermata === undefined ? "" : "hidden"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-9 h-9 bg-green-600 text-white rounded-full cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>

                {/* AVVISO DI PRENOTAZIONE CONFERMATA SE APPUNTO è CONFERMATA, ALTRIMENTI NON COMPARE */}
                <div
                  className={`bg-green-600 mr-6 text-white rounded-xl ${
                    prenotazione.confermata === true ? "" : "hidden"
                  }`}
                >
                  <h1 className="p-2 text-md"><span className="hidden tablet:block">Prenotazione</span> confermata!</h1>
                </div>

                {/* AVVISO DI PRENOTAZIONE CONFERMATA SE APPUNTO è CONFERMATA, ALTRIMENTI NON COMPARE */}
                <div
                  className={`bg-red-600 mr-6 text-white rounded-xl ${
                    prenotazione.confermata === false ? "" : "hidden"
                  }`}
                >
                  <h1 className="p-2 text-md"><span className="hidden tablet:block">Prenotazione</span> non confermata!</h1>
                </div>

                {/* CANCELLA PRENOTAZIONE */}
                <div
                  className={`ml-4 mr-12 cursor-pointer ${
                    prenotazione.confermata === undefined ? "" : "hidden"
                  }`}
                  onClick={() => handleNonConfermare(prenotazione._id)}
                  title="Cancella"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-7 h-7 bg-red-600 text-white rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                </div>

                {/* INVIA EMAIL */}
                <Link
                  to="/admindashboard/email"
                  className="cursor-pointer"
                  title="Invia Email"
                  onClick={() => handleEmail(prenotazione._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DayAfterTomorrow;
