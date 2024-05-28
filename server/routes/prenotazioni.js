import express from "express";
import {
  deleteMessageClicked,
  getLastReservation,


  postPrenotazioneNonConfermata,
  prenotazioneDaFrontEnd,
} from "../controllers/prenotazione.js";

const router = express.Router();


router.post("/", prenotazioneDaFrontEnd);
router.get("/lastReservation", getLastReservation);



router.post("/nonconfermata", postPrenotazioneNonConfermata)


router.delete("/deleteMessage", deleteMessageClicked);

export default router;
