import mongoose from "mongoose";

import { PrenotazioneTavolo } from "../models/prenotazione.js";
import { User } from "../models/user.js";
import { RegistroAccessoAdmin } from "../models/registroAccessoAdmin.js";
import { NotificheNonLette } from "../models/notifiche.js";

//! GET total reservations
export const getNumberReservations = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfDay = today;
    const endOfDay = new Date(today);
    endOfDay.setDate(today.getDate() + 1);

    const totalPrenotazioni = await PrenotazioneTavolo.countDocuments({
      data: {
        $gte: startOfDay.toISOString(),
        $lt: endOfDay.toISOString(),
      },
    });

    res.status(200).json({ totalPrenotazioni });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ! GET  total people
export const getNumbertTotalPeoples = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const startOfDay = today;
    const endOfDay = new Date(today);
    endOfDay.setDate(today.getDate() + 1);
    const totalPeople = await PrenotazioneTavolo.aggregate([
      {
        $match: {
          data: {
            $gte: startOfDay.toISOString(),
            $lt: endOfDay.toISOString(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPeople: { $sum: "$persone" },
        },
      },
    ]);

    if (totalPeople.length > 0) {
      res.status(200).json({ totalPeoples: totalPeople[0].totalPeople });
    } else {
      res.status(200).json({ totalPeoples: 0 });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Errore durante il recupero delle prenotazioni per la data corrente"
      );
  }
};

// ! GET  last admin username
export const getAdminUsername = async (req, res) => {
  try {
    const mostRecentAccess = await RegistroAccessoAdmin.findOne().sort({
      accessTime: -1,
    });
    if (mostRecentAccess) {
      res.status(200).json({ adminUsername: mostRecentAccess.adminUsername });
    } else {
      res.status(200).json({ adminUsername: "Nessun accesso registrato" });
    }
  } catch (error) {
    res.status(500).json({ error: "Errore del server" });
  }
};

// ! GET total number of notifications not yet displayed
export const getNumberNotificationsNotViewsed = async (req, res) => {
  try {
    const numberOfNotifications = await NotificheNonLette.countDocuments();
    return res.status(200).json({ numberOfNotifications });
  } catch (error) {
    console.error(
      "Errore durante il conteggio delle notifiche non lette:",
      error
    );
    return res
      .status(500)
      .json({ error: "Errore durante il conteggio delle notifiche non lette" });
  }
};

// ! DELETE all the number of notifications not yet dispayed
export const deleteNumberNotificationsNotViewsed = async (req, res) => {
  try {
    await NotificheNonLette.deleteMany();
    res.status(200).json({ message: "All notifications deleted successfully" });
  } catch (error) {
    console.error("Error while deleting notifications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//!-------------------------------------------------------------- START DAY MANAGEMENT ---------------------------------------------------------------

//*TODAY
// ! GET ALL THE RESERVATION FROM TODAY STANDARD
export const getTodayReservations = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const startOfDay = today;
    const endOfDay = new Date(today);
    endOfDay.setDate(today.getDate() + 1);

    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfDay.toISOString(),
        $lt: endOfDay.toISOString(),
      },
    });
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Errore durante il recupero delle prenotazioni per TODAY"
      );
  }
};
// ! GET ALL THE RESERVATION FROM TODAY/ ONLY FOR NUMBER
export const getTodayReservationsNumber = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const startOfDay = today;
    const endOfDay = new Date(today);
    endOfDay.setDate(today.getDate() + 1);

    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfDay.toISOString(),
        $lt: endOfDay.toISOString(),
      },
    });
    res.status(200).json({ totalReservations: reservations.length });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Errore durante il recupero delle prenotazioni per TODAY"
      );
  }
};
//! GET ALL PEOPLE FROM TODAY
export const getTodayPeople = async (req, res) => {
try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const startOfDay = today;
    const endOfDay = new Date(today);
    endOfDay.setDate(today.getDate() + 1);
    const totalPeople = await PrenotazioneTavolo.aggregate([
      {
        $match: {
          data: {
            $gte: startOfDay.toISOString(),
            $lt: endOfDay.toISOString(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPeople: { $sum: "$persone" },
        },
      },
    ]);

    if (totalPeople.length > 0) {
      res.status(200).json({ totalPeoples: totalPeople[0].totalPeople });
    } else {
      res.status(200).json({ totalPeoples: 0 });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Errore durante il recupero delle prenotazioni per TODAY"
      );
  }

}
//*TODAY

//*TOMORROW
//! GET ALL THE RESERVATION FROM TOMORROW STANDARD
export const getTomorrowReservationsNumber = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfDay = new Date(today);
    startOfDay.setDate(today.getDate() + 1);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);

    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfDay.toISOString(),
        $lt: endOfDay.toISOString(),
      },
    });

    res.status(200).json({ totalReservationsTomorrow: reservations.length });
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per TOMORROW");
  }
}
//! GET ALL PEOPLE FROM TOMORROW
export const getTomorrowPeople = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfTomorrow = new Date(today);
    startOfTomorrow.setDate(today.getDate() + 1);

    const endOfTomorrow = new Date(startOfTomorrow);
    endOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    const totalPeople = await PrenotazioneTavolo.aggregate([
      {
        $match: {
          data: {
            $gte: startOfTomorrow.toISOString(),
            $lt: endOfTomorrow.toISOString(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPeople: { $sum: "$persone" },
        },
      },
    ]);

    if (totalPeople.length > 0) {
      res.status(200).json({ totalPeoples: totalPeople[0].totalPeople });
    } else {
      res.status(200).json({ totalPeoples: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per TOMORROW");
  }
};
//*TOMORROW

//*DAY AFTER TOMORROW
//! GET ALL THE RESERVATION FROM DAY AFTER TOMORROW STANDARD
export const getDayAfterTomorrowNumber = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const startOfDayAfterTomorrow = new Date(today);
    startOfDayAfterTomorrow.setDate(today.getDate() + 2);
  
    const endOfDayAfterTomorrow = new Date(startOfDayAfterTomorrow);
    endOfDayAfterTomorrow.setDate(startOfDayAfterTomorrow.getDate() + 1);
  
    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfDayAfterTomorrow.toISOString(),
        $lt: endOfDayAfterTomorrow.toISOString(),
      },
    });
  
    res.status(200).json({ totalReservationsDayAfterTomorrow: reservations.length });
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per DAY AFTER TOMORROW");
  }
}
//! GET ALL PEOPLE FROM DAY AFTER TOMORROW
export const getDayAfterTomorrowPeoples = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const startOfDayAfterTomorrow = new Date(today);
    startOfDayAfterTomorrow.setDate(today.getDate() + 2);
  
    const endOfDayAfterTomorrow = new Date(startOfDayAfterTomorrow);
    endOfDayAfterTomorrow.setDate(startOfDayAfterTomorrow.getDate() + 1);
  
    const totalPeople = await PrenotazioneTavolo.aggregate([
      {
        $match: {
          data: {
            $gte: startOfDayAfterTomorrow.toISOString(),
            $lt: endOfDayAfterTomorrow.toISOString(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPeople: { $sum: "$persone" },
        },
      },
    ]);
  
    if (totalPeople.length > 0) {
      res.status(200).json({ totalPeoples: totalPeople[0].totalPeople });
    } else {
      res.status(200).json({ totalPeoples: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per DAY AFTER TOMORROW");
  }
}
//*DAY AFTER TOMORROW

//*IN THREE DAY
//! GET ALL THE RESERVATION IN THREE DAY STANDARD
export const getInThreeDayNumber = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfInThreeDays = new Date(today);
    startOfInThreeDays.setDate(today.getDate() + 3);
  
    const endOfInThreeDays = new Date(startOfInThreeDays);
    endOfInThreeDays.setDate(startOfInThreeDays.getDate() + 1);
  
    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfInThreeDays.toISOString(),
        $lt: endOfInThreeDays.toISOString(),
      },
    });
  
    res.status(200).json({ totalReservationsInThreeDays: reservations.length });
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per IN THREE DAY");
  }
}
//! GET ALL PEOPLE FROM IN THREE DAY
export const getInThreeDayPeoples = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const startOfInThreeDays = new Date(today);
    startOfInThreeDays.setDate(today.getDate() + 3);
  
    const endOfInThreeDays = new Date(startOfInThreeDays);
    endOfInThreeDays.setDate(startOfInThreeDays.getDate() + 1);
  
    const totalPeople = await PrenotazioneTavolo.aggregate([
      {
        $match: {
          data: {
            $gte: startOfInThreeDays.toISOString(),
            $lt: endOfInThreeDays.toISOString(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPeople: { $sum: "$persone" },
        },
      },
    ]);
  
    if (totalPeople.length > 0) {
      res.status(200).json({ totalPeoples: totalPeople[0].totalPeople });
    } else {
      res.status(200).json({ totalPeoples: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per IN THREE DAY");
  }
}
//*IN THREE DAY

//*IN FOUR DAY
//! GET ALL THE RESERVATION IN FOUR DAY STANDARD
export const getInFourDayNumber = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const startOfInFourDays = new Date(today);
    startOfInFourDays.setDate(today.getDate() + 4);
  
    const endOfInFourDays = new Date(startOfInFourDays);
    endOfInFourDays.setDate(startOfInFourDays.getDate() + 1);
  
    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfInFourDays.toISOString(),
        $lt: endOfInFourDays.toISOString(),
      },
    });
  
    res.status(200).json({ totalReservationsInFourDays: reservations.length });
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per IN FOUR DAY");
  }
}
//! GET ALL PEOPLE FROM IN FOUR DAY
export const getInFourDayPeoples = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const startOfInFourDays = new Date(today);
    startOfInFourDays.setDate(today.getDate() + 4);
  
    const endOfInFourDays = new Date(startOfInFourDays);
    endOfInFourDays.setDate(startOfInFourDays.getDate() + 1);
  
    const totalPeople = await PrenotazioneTavolo.aggregate([
      {
        $match: {
          data: {
            $gte: startOfInFourDays.toISOString(),
            $lt: endOfInFourDays.toISOString(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPeople: { $sum: "$persone" },
        },
      },
    ]);
  
    if (totalPeople.length > 0) {
      res.status(200).json({ totalPeoples: totalPeople[0].totalPeople });
    } else {
      res.status(200).json({ totalPeoples: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per IN FOUR DAY");
  }
}
//*IN FOUR DAY

//*IN FIVE DAY
//! GET ALL THE RESERVATION IN FIVE DAY STANDARD
export const getInFiveDayNumber = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const startOfInFiveDays = new Date(today);
    startOfInFiveDays.setDate(today.getDate() + 5);
  
    const endOfInFiveDays = new Date(startOfInFiveDays);
    endOfInFiveDays.setDate(startOfInFiveDays.getDate() + 1);
  
    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfInFiveDays.toISOString(),
        $lt: endOfInFiveDays.toISOString(),
      },
    });
  
    res.status(200).json({ totalReservationsInFiveDays: reservations.length });
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per IN FIVE DAY");
  }
}
//! GET ALL PEOPLE FROM IN FIVE DAY
export const getInFiveDayPeoples = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const startOfInFiveDays = new Date(today);
    startOfInFiveDays.setDate(today.getDate() + 5);
  
    const endOfInFiveDays = new Date(startOfInFiveDays);
    endOfInFiveDays.setDate(startOfInFiveDays.getDate() + 1);
  
    const totalPeople = await PrenotazioneTavolo.aggregate([
      {
        $match: {
          data: {
            $gte: startOfInFiveDays.toISOString(),
            $lt: endOfInFiveDays.toISOString(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPeople: { $sum: "$persone" },
        },
      },
    ]);
  
    if (totalPeople.length > 0) {
      res.status(200).json({ totalPeoples: totalPeople[0].totalPeople });
    } else {
      res.status(200).json({ totalPeoples: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per IN FIVE DAY");
  }
}
//*IN FIVE DAY

//*IN SIX DAY
//! GET ALL THE RESERVATION IN SIX DAY STANDARD
export const getInSixDayNumber = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const startOfInSixDays = new Date(today);
    startOfInSixDays.setDate(today.getDate() + 6);
  
    const endOfInSixDays = new Date(startOfInSixDays);
    endOfInSixDays.setDate(startOfInSixDays.getDate() + 1);
  
    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfInSixDays.toISOString(),
        $lt: endOfInSixDays.toISOString(),
      },
    });
  
    res.status(200).json({ totalReservationsInSixDays: reservations.length });
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per IN SIX DAY");
  }
}
//! GET ALL PEOPLE FROM IN SIX DAY
export const getInSixDayPeoples = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const startOfInSixDays = new Date(today);
    startOfInSixDays.setDate(today.getDate() + 6);
  
    const endOfInSixDays = new Date(startOfInSixDays);
    endOfInSixDays.setDate(startOfInSixDays.getDate() + 1);
  
    const totalPeople = await PrenotazioneTavolo.aggregate([
      {
        $match: {
          data: {
            $gte: startOfInSixDays.toISOString(),
            $lt: endOfInSixDays.toISOString(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPeople: { $sum: "$persone" },
        },
      },
    ]);
  
    if (totalPeople.length > 0) {
      res.status(200).json({ totalPeoples: totalPeople[0].totalPeople });
    } else {
      res.status(200).json({ totalPeoples: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per IN SIX DAY");
  }
}
//*IN SIX DAY

//*IN SEVEN DAY
//! GET ALL THE RESERVATION IN SEVEN DAY STANDARD
export const getInSevenDayNumber = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const startOfInSevenDays = new Date(today);
    startOfInSevenDays.setDate(today.getDate() + 7);
  
    const endOfInSevenDays = new Date(startOfInSevenDays);
    endOfInSevenDays.setDate(startOfInSevenDays.getDate() + 1);
  
    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfInSevenDays.toISOString(),
        $lt: endOfInSevenDays.toISOString(),
      },
    });
  
    res.status(200).json({ totalReservationsInSevenDays: reservations.length });
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per IN SEVEN DAY");
  }
  
}
//! GET ALL PEOPLE FROM IN SEVEN DAY
export const getInSevenDayPeoples = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const startOfInSevenDays = new Date(today);
    startOfInSevenDays.setDate(today.getDate() + 7);
  
    const endOfInSevenDays = new Date(startOfInSevenDays);
    endOfInSevenDays.setDate(startOfInSevenDays.getDate() + 1);
  
    const totalPeople = await PrenotazioneTavolo.aggregate([
      {
        $match: {
          data: {
            $gte: startOfInSevenDays.toISOString(),
            $lt: endOfInSevenDays.toISOString(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPeople: { $sum: "$persone" },
        },
      },
    ]);
  
    if (totalPeople.length > 0) {
      res.status(200).json({ totalPeoples: totalPeople[0].totalPeople });
    } else {
      res.status(200).json({ totalPeoples: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante il recupero delle prenotazioni per IN SEVEN DAY");
  }
  
}
//*IN SEVEN DAY

//!-------------------------------------------------------------- END DAY MANAGEMENT ---------------------------------------------------------------


// ! PATCH CONFIRMED RESERVATION
export const patchPrenotazioneConfermata = async (req, res) => {
  try {
    const { id } = req.body;

    const updatedPrenotazione = await PrenotazioneTavolo.findByIdAndUpdate(id, {
      confermata: true,
    });

    if (!updatedPrenotazione) {
      return res.status(404).json({ error: "Prenotazione non trovata" });
    }
    const { numeroPersone } = updatedPrenotazione;

    res.status(200).json({
      message: "Prenotazione confermata",
      prenotazione: { ...updatedPrenotazione.toObject(), numeroPersone },
    });
  } catch (error) {
    console.error("Errore durante la conferma della prenotazione:", error);
    res.status(500).json({
      error: "Errore del server durante la conferma della prenotazione",
    });
  }
}

// ! PATCH NOT CONFIRMED RESERVATION
export const patchPrenotazioneNonConfermata = async (req, res) => {
  try {
    const { id } = req.body;

    const updatedPrenotazione = await PrenotazioneTavolo.findByIdAndUpdate(id, {
      confermata: false,
    });

    if (!updatedPrenotazione) {
      return res.status(404).json({ error: "Prenotazione non trovata" });
    }

    res.status(200).json({
      message: "Prenotazione Non confermata con successo",
      prenotazione: updatedPrenotazione,
    });
  } catch (error) {
    console.error("Errore durante la non conferma della prenotazione:", error);
    res.status(500).json({
      error: "Errore del server durante la non conferma della prenotazione",
    });
  }
};

// ! GET EMAIL CLICKED
export const getEmailClicked = async (req, res) => {
  const { id } = req.query
  try {
    console.log(id)
    const prenotazione = await PrenotazioneTavolo.findById(id);
    if (!prenotazione) {
      return res.status(404).json({ error: "Prenotazione non trovata" });
    }
    const email = prenotazione.email;
    res.status(200).json({ email });
  } catch (error) {
    console.error("Errore nella ricerca dell'email:", error);
    res.status(500).json({ error: "Errore del server" });
  }
};

// ! GET ALL THE RESERVATION FROM TOMORROW
export const getTomorrowReservations = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1);

    const startOfTomorrow = tomorrow;
    const endOfTomorrow = new Date(tomorrow);
    endOfTomorrow.setDate(tomorrow.getDate() + 1);

    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfTomorrow.toISOString(),
        $lt: endOfTomorrow.toISOString(),
      },
    });
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Errore durante il recupero delle prenotazioni per la data di domani"
      );
  }
};

// ! GET ALL THE RESERVATION FROM DAY AFTER TOMORROW
export const getDayAfterTomorrowReservations = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date(today)
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const startOfDayAfterTomorrow = dayAfterTomorrow;
    const endOfDayAfterTomorrow = new Date(dayAfterTomorrow);
    endOfDayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfDayAfterTomorrow.toISOString(),
        $lt: endOfDayAfterTomorrow.toISOString(),
      },
    });
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Errore durante il recupero delle prenotazioni per la data di dopo domani"
      );
  }
};

// ! GET ALL THE RESERVATION FROM IN THREE DAY
export const getInThreeDayReservations = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const inThreeDay = new Date(today)
    inThreeDay.setDate(today.getDate() + 3);

    const startOfInThreeday = inThreeDay;
    const endOfInThreeDay = new Date(inThreeDay);
    endOfInThreeDay.setDate(inThreeDay.getDate() + 1);

    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfInThreeday.toISOString(),
        $lt: endOfInThreeDay.toISOString(),
      },
    });
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Errore durante il recupero delle prenotazioni per la data tra 3 giorni"
      );
  }
};

// ! GET ALL THE RESERVATION FROM IN FOUR DAY
export const getInFourDayReservations = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const inFourDay = new Date(today)
    inFourDay.setDate(today.getDate() + 4);

    const startOfinFourDay = inFourDay;
    const endOfinFourDay = new Date(inFourDay);
    endOfinFourDay.setDate(inFourDay.getDate() + 1);

    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfinFourDay.toISOString(),
        $lt: endOfinFourDay.toISOString(),
      },
    });
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Errore durante il recupero delle prenotazioni per la data tra 3 giorni"
      );
  }
};

// ! GET ALL THE RESERVATION FROM IN FIVE DAY
export const getInFiveDayReservations = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const inFiveDay = new Date(today)
    inFiveDay.setDate(today.getDate() + 5);

    const startOfinFiveDay = inFiveDay;
    const endOfinFiveDay = new Date(inFiveDay);
    endOfinFiveDay.setDate(inFiveDay.getDate() + 1);

    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfinFiveDay.toISOString(),
        $lt: endOfinFiveDay.toISOString(),
      },
    });
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Errore durante il recupero delle prenotazioni per la data tra 3 giorni"
      );
  }
};

// ! GET ALL THE RESERVATION FROM IN SIX DAY
export const getInSixDayReservations = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const inSixDay = new Date(today)
    inSixDay.setDate(today.getDate() + 6);

    const startOfinSixDay = inSixDay;
    const endOfinSixDay = new Date(inSixDay);
    endOfinSixDay.setDate(inSixDay.getDate() + 1);

    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfinSixDay.toISOString(),
        $lt: endOfinSixDay.toISOString(),
      },
    });
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Errore durante il recupero delle prenotazioni per la data tra 3 giorni"
      );
  }
};

// ! GET ALL THE RESERVATION FROM IN SEVEN DAY
export const getInSevenDayReservations = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const inSevenDay = new Date(today)
    inSevenDay.setDate(today.getDate() + 7);

    const startOfinSevenDay = inSevenDay;
    const endOfinSevenDay = new Date(inSevenDay);
    endOfinSevenDay.setDate(inSevenDay.getDate() + 1);

    const reservations = await PrenotazioneTavolo.find({
      data: {
        $gte: startOfinSevenDay.toISOString(),
        $lt: endOfinSevenDay.toISOString(),
      },
    });
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Errore durante il recupero delle prenotazioni per la data tra 3 giorni"
      );
  }
};