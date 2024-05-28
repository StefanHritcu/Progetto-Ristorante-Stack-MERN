import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SecondHeaderAdmin() {
  const [totalPrenotazioni, setTotalPrenotazioni] = useState(0);
  const [totalPersone, setTotalPersone] = useState(0);
  const [username, setUsername] = useState("");

  // ! GET total reservations
  useEffect(() => {
    const fetchReservations = () => {
      fetch("http://localhost:5000/admindashboard/reservations")
        .then((response) => response.json())
        .then((data) => {
          setTotalPrenotazioni(data.totalPrenotazioni);
        })
        .catch((error) => {
          console.error(
            "Errore durante il recupero delle prenotazioni:",
            error
          );
        });
    };

    fetchReservations();

    const intervalReservations = setInterval(fetchReservations, 1000);

    return () => clearInterval(intervalReservations);
  }, []);
  // ! GET  total people
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admindashboard/peoples"
        );
        setTotalPersone(response.data.totalPeoples);
      } catch (error) {
        console.error("Errore durante il recupero delle persone:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  // ! GET  last logged admin Username
  useEffect(() => {
    const fetchDataUsername = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admindashboard/username"
        );
        setUsername(response.data.adminUsername);
      } catch (error) {
        console.error("Errore durante il recupero dell'username:", error);
      }
    };

    fetchDataUsername();
  }, []);

  return (
    <>
      <div className="relative flex justify-start items-center border-b border-neutral-200">
        {/* ADMIN NAME */}
        <div className="px-4 py-2 z-20 flex justify-center items-center">
          <div className="rounded-full bg-violet-600 p-1 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
          <h1>{username}</h1>
        </div>

        {/* RESERVATIONS */}
        <div className="px-4 hidden">
          <h1 className="text-neutral-500">
            Prenotazioni:{" "}
            <span className="text-neutral-600 font-semibold">
              {totalPrenotazioni}
            </span>
          </h1>
        </div>

        {/* TABLES */}
        <div className="px-4 hidden">
          <h1 className="text-neutral-500">
            Tavoli:{" "}
            <span className="text-neutral-600 font-semibold">
              {totalPrenotazioni}
            </span>
          </h1>
        </div>

        {/* GUEST */}
        <div className="px-4 hidden">
          <h1 className="text-neutral-500">
            Persone:{" "}
            <span className="text-neutral-600 font-semibold">
              {totalPersone}
            </span>
          </h1>
        </div>

        <Link to="/" className="absolute right-10 cursor-pointer" title="Vai alla Home del ristorante">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-7 h-7 hover:w-8 hover:h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}
export default SecondHeaderAdmin;
