import { useSelector } from "react-redux";
import Today from "./admindashboard/DayManager/Today";
import Tomorrow from "../pages/admindashboard/DayManager/Tomorrow";
import InThreeDay from "./admindashboard/DayManager/InThreeDay";
import InFourDay from "./admindashboard/DayManager/InFourDay";
import InFiveDay from "./admindashboard/DayManager/InFiveDay";
import InSixDay from "./admindashboard/DayManager/InSixDay";
import InSevenDay from "./admindashboard/DayManager/InSevenDay";
import DayAfterTomorrow from "./admindashboard/DayManager/DayAfterTomorrow";

function AdminHome() {
  const valueDayNumber = useSelector(
    (state) => state.notifications.daySelected
  );

  //! COMPONENTE CHE ANDRà A SCHERMO IN BASE AL VALORE DI valueDayNumber
  let selectedComponent;

  switch (valueDayNumber) {
  
    //! TODAY
    case 0:
      selectedComponent = <Today />;
      break;
    //! TODAY

    case 1:
      selectedComponent = <Tomorrow />;
      break;
    case 2:
      selectedComponent = <DayAfterTomorrow />;
      break;
    case 3:
      selectedComponent = <InThreeDay />;
      break;
    case 4:
      selectedComponent = <InFourDay />;
      break;
    case 5:
      selectedComponent = <InFiveDay />;
      break;
    case 6:
      selectedComponent = <InSixDay />;
      break;
    case 7:
      selectedComponent = <InSevenDay />;
      break;
    default:
      selectedComponent = <div>No component selected</div>;
  }

  return (
    <>
      <div>{selectedComponent}</div>
    </>
  );
}
export default AdminHome;
