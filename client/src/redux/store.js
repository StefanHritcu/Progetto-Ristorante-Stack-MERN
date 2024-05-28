import { configureStore } from "@reduxjs/toolkit"
import { notificationsReducer } from "./actions.js"


export default configureStore({
    reducer: {
        notifications: notificationsReducer,
    },
})