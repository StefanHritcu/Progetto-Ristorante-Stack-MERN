import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDaySelected } from "../../../../../redux/actions";

function NavigableCalender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hiddenLeftArrow, setHiddenLeftArrow] = useState(true);
  const [hiddenRightArrow, setHiddenRightArrow] = useState(true);

  const dispatch = useDispatch()
  const valueDayNumber = useSelector((state) => state.notifications.daySelected)

  const handleNextDay = () => {
    if(valueDayNumber < 7) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
    dispatch(setDaySelected(+1))
    }
  };

  const handlePreviousDay = () => {
    if(valueDayNumber > 0) {
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);
    setCurrentDate(previousDate);
      dispatch(setDaySelected(-1))
    }
  };

  const getDayName = (date) => {
    const dayNames = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
    return dayNames[date.getDay()];
  };

  useEffect(() => {
    setHiddenLeftArrow(valueDayNumber <= 0);
    setHiddenRightArrow(valueDayNumber >= 7);
  }, [valueDayNumber])
  return (
    <>
      <div className="flex justify-center items-center">
        {/* LEFT ARROW / days behind the pointer's current day */}
        <div onClick={handlePreviousDay} className={`cursor-pointer ${hiddenLeftArrow ? "hidden" : "block"}`} title="Vai al giorno precedente">
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        {/* CURRENT DAY */}
        <div className="px-20 flex flex-col items-center">
          <h1>{isToday(currentDate) ? 'Oggi' : getDayName(currentDate)}</h1>
          <h1>{currentDate.toLocaleDateString()}</h1>
        </div>
        {/* RIGHT ARROW / to tomorrow */}
        <div onClick={handleNextDay} className={`cursor-pointer ${hiddenRightArrow ? "hidden" : "block"}`} title="Vai al giorno successivo">
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
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

export default NavigableCalender;
