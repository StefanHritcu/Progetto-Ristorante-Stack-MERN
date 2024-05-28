import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    viewNotification: false,
    numberNotifications: 0,
    notificationIdClicked: "",
    homeAdminViewsed: true,
    //* sotto quando viene cliccato pianifica si impostera true su openSingleReservation
    openSingleReservation: false,

    //* gestione dello stato delle prenotazioni confermate o non confermate
   confirmReservation: false,

   confirmedReservations: [],

   //! attenzione qui
   hiddenInfoText: false,
   showConfirmOrNot: false,

   secondNotificationIdClicked: "",

   showEmail: "",

   //! the logic is as follows: the number 0 represents today, +1 tomorrow while -1 yesterday. so up to a maximum of -7 and +7 to simulate the search for reservations until the next week
   daySelected: 0,

  },

  reducers: {
    setDaySelected: (state, action) => {
      state.daySelected += action.payload
    },
    setViewNotification: (state) => {
      state.viewNotification = !state.viewNotification;
    },
    setNumberNotifications: (state, action) => {
      state.numberNotifications += action.payload;
    },
    setNotificationIdClicked: (state, action) => {
      state.notificationIdClicked = action.payload;
    },
    setHomeAdminViewsed: (state) => {
      state.homeAdminViewsed = !state.homeAdminViewsed;
    },
    setOpenSingleReservation: (state) => {
      state.openSingleReservation = !state.openSingleReservation
    },
    setConfirmReservation: (state) => {
      state.confirmReservation = !state.confirmReservation
    },
    setHiddenInfoText: (state) => {
      state.hiddenInfoText = !state.hiddenInfoText
    },
    setShowConfirmOrNot: (state) => {
      state.showConfirmOrNot = !state.showConfirmOrNot
    },
    setSecondNotificationIdClicked: (state, action) => {
      state.secondNotificationIdClicked = action.payload;
    },
    setConfirmedReservation: (state, action) => {
      state.confirmedReservations.push(action.payload);
    },
    setShowEmail: (state, action) => {
      state.showEmail = action.payload
    },
  },
});

export const {
  setDaySelected,
  setViewNotification,
  setNumberNotifications,
  setNotificationIdClicked,
  setHomeAdminViewsed,
  setOpenSingleReservation,
  setConfirmReservation,
  setHiddenInfoText,
  setShowConfirmOrNot,
  setSecondNotificationIdClicked,
  setConfirmedReservation,
  setShowEmail,
} = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
