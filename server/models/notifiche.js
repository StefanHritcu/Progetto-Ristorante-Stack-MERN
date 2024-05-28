import mongoose from "mongoose";

const notificheNonLetteSchema = mongoose.Schema({
  numNotifiche: {
    type: Number,
    required: true,
  },
});

export const NotificheNonLette = mongoose.model(
  "notifiche",
  notificheNonLetteSchema
);
