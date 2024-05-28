import NavigableCalender from "./componets/NavigableCalender";
import Notifications from "../notifications/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { setViewNotification } from "../../../../redux/actions";
import { useEffect, useState } from "react";
import axios from "axios";

function HeaderAdmin() {
  const [numberNotifications, setNumberNotifications] = useState(0);

  const dispatch = useDispatch();

  const handleNotifications = () => {
    dispatch(setViewNotification(true));
    clearNotifications();
  };

  const clearNotifications = async () => {
    try {
      await axios.delete(
        "http://localhost:5000/admindashboard/clearNotifications"
      );
    } catch (error) {
      console.error("Errore durante l'eliminazione delle notifiche:", error);
    }
  };

  const openNotifications = useSelector(
    (state) => state.notifications.viewNotification
  );
  // ! GET NUMBER NOTIFICATION NOT VIEWSED
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admindashboard/numberNotificationsNotViewsed"
        );
        console.log("Risposta dal server:", response.data);
        setNumberNotifications(response.data.numberOfNotifications);
      } catch (error) {
        console.error(
          "Errore durante il recupero del numero delle Notifiche:",
          error
        );
      }
    };

    fetchData();

    //* POLLING every 1 second
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center p-4 -mb-1 bg-blue-600 text-white">
          {/* ---------------LOGO DASHBOARD--------------- */}
          <div className="flex justify-between items-center text-semibold">
            {/* icon-logo */}
            <div className="mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
            </div>

            {/* text-logo */}
            <div className="mx-2">
              <h1>Dashboard Ristorante</h1>
            </div>
          </div>

          {/* ---------------NAVIGATE CALENDER DA TABLET IN SU--------------- */}
          <div className="hidden tablet:block">
            <NavigableCalender />
          </div>

          {/* ---------------MAIL/NOTIFICATIONS and CALENDER--------------- */}
          <div className="flex justify-center items-center">
            <div
              onClick={handleNotifications}
              className="px-6 cursor-pointer relative"
              title="Notifiche"
            >
              {/* RED POINT WITH NUMBER OF NOTIFICATIONS  */}
              <div className="absolute w-6 h-6 bg-red-600 rounded-full flex justify-center items-center ml-4 mb-10">
                <span className="text-white">{numberNotifications}</span>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ---------------NAVIGATE CALENDER FINO A TABLET--------------- */}
        <div className="bg-blue-600 text-white py-4 flex items-center justify-center tablet:hidden">
            <NavigableCalender />
          </div>
      </div>

      <div
        className={`absolute top-22 right-10 bg-neutral-200 rounded-lg p-2" ${
          openNotifications ? "block" : "hidden"
        }`}
      >
        <Notifications />
      </div>
    </>
  );
}
export default HeaderAdmin;
