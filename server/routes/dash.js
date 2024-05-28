import express from "express";
import {
  deleteNumberNotificationsNotViewsed,
  getAdminUsername,
  getDayAfterTomorrowNumber,
  getDayAfterTomorrowPeoples,
  getDayAfterTomorrowReservations,
  getEmailClicked,
  getInFiveDayNumber,
  getInFiveDayPeoples,
  getInFiveDayReservations,
  getInFourDayNumber,
  getInFourDayPeoples,
  getInFourDayReservations,
  getInSevenDayNumber,
  getInSevenDayPeoples,
  getInSevenDayReservations,
  getInSixDayNumber,
  getInSixDayPeoples,
  getInSixDayReservations,
  getInThreeDayNumber,
  getInThreeDayPeoples,
  getInThreeDayReservations,
  getNumberNotificationsNotViewsed,
  getNumberReservations,
  getNumbertTotalPeoples,
  getTodayPeople,
  getTodayReservations,
  getTodayReservationsNumber,
  getTomorrowPeople,
  getTomorrowReservations,
  patchPrenotazioneConfermata,
  patchPrenotazioneNonConfermata,
} from "../controllers/dash.js";

const router = express.Router();

router.get("/reservations", getNumberReservations);
router.get("/peoples", getNumbertTotalPeoples);
router.get("/username", getAdminUsername);

router.get("/numberNotificationsNotViewsed", getNumberNotificationsNotViewsed);

//! day management

//* TODAY
router.get("/todayDatas", getTodayReservations);
router.get("/todayReservations", getTodayReservationsNumber)
router.get("/todayPeoples", getTodayPeople)
//* TODAY

//*TOMORROW
router.get("/tomorrowDatas", getTomorrowReservations)
router.get("/tomorrowReservations", getTomorrowReservations)
router.get("/tomorrowPeoples", getTomorrowPeople)
//*TOMORROW

//*DAY AFTER TOMORROW
router.get("/dayAfterTomorrowReservations", getDayAfterTomorrowNumber)
router.get("/dayAfterTomorrowPeoples", getDayAfterTomorrowPeoples)
//*DAY AFTER TOMORROW

//*IN THREE DAY
router.get("/inThreeDayReservations", getInThreeDayNumber)
router.get("/inThreeDayPeoples", getInThreeDayPeoples)
//*IN THREE DAY

//*IN FOUR DAY
router.get("/inFourDayReservations", getInFourDayNumber)
router.get("/inFourDayPeoples", getInFourDayPeoples)
//*IN FOUR DAY

//*IN FIVE DAY
router.get("/inFiveDayReservations", getInFiveDayNumber)
router.get("/inFiveDayPeoples", getInFiveDayPeoples)
//*IN FIVE DAY

//*IN SIX DAY
router.get("/inSixDayReservations", getInSixDayNumber)
router.get("/inSixDayPeoples", getInSixDayPeoples)
//*IN SIX DAY

//*IN SEVEN DAY
router.get("/inSevenDayReservations", getInSevenDayNumber)
router.get("/inSevenDayPeoples", getInSevenDayPeoples)
//*IN SEVEN DAY


router.get("/dayAfterTomorrow", getDayAfterTomorrowReservations)
router.get("/inThreeDay", getInThreeDayReservations)
router.get("/inFourDay", getInFourDayReservations)
router.get("/inFiveDay", getInFiveDayReservations)
router.get("/inSixDay", getInSixDayReservations)
router.get("/inSevenDay", getInSevenDayReservations)


router.get("/sendemail", getEmailClicked)

router.patch("/confermata", patchPrenotazioneConfermata)
router.patch("/nonconfermata", patchPrenotazioneNonConfermata)

router.delete("/clearNotifications", deleteNumberNotificationsNotViewsed);

export default router;
