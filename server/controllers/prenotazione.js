import express from "express";
import { NotificheNonLette } from "../models/notifiche.js";
import { PrenotazioneTavolo } from "../models/prenotazione.js";
import { LastPrenotazioni } from "../models/lastPrenotazioni.js";



export const prenotazioneDaFrontEnd = async (req, res) => {
  console.log("Dati ricevuti dal frontend:", req.body);
  const dataPrenotazione = req.body;
  
  try {
    
    const newPrenotazione = new PrenotazioneTavolo(dataPrenotazione);
    await newPrenotazione.save();

    //! aggiungiamo la prenotazione anche dentro la collezione lastPrenotazione
    const lastPrenotazione = new LastPrenotazioni(dataPrenotazione)
    await lastPrenotazione.save()

    const newNotification = new NotificheNonLette({ numNotifiche: 1 });
    await newNotification.save();

 
    res.status(201).json(newPrenotazione);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const getLastReservation = async (req, res) => {
  try {
    const totalLastPrenotazioni = await LastPrenotazioni.find();
    res.status(200).json(totalLastPrenotazioni);
  } catch (error) {
    res.status(500).send(error.message);
  }
};



export const deleteMessageClicked = async (req, res) => {
  const messageId = req.body.messageId
  try {
    const deletedMessage = await LastPrenotazioni.findByIdAndDelete(messageId)
    if (!deletedMessage) {
      return res.status(404).json({ message: "Il messaggio non è stato trovato." });
    }
    
    return res.status(200).json({ message: "Il messaggio è stato eliminato con successo." });
  } catch (error) {
    console.error("Errore durante l'eliminazione del messaggio:", error);
    return res.status(500).json({ error: "Si è verificato un errore durante l'eliminazione del messaggio." });
  }
}


export const postPrenotazioneNonConfermata = async (req, res) => {

}

const router = express.Router();