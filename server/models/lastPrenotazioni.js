import mongoose from "mongoose"

const lastPrenotazioniSchema = mongoose.Schema({
    nomeAndCognome: {
        type: String,
        required: true
    },
    cellulare: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    ora: {
        type: String,
        required: true
    },
    persone: {
        type: Number,
        required: true
    },
    dettagliAggiuntivi: {
        type: String,
        required: true
    },
    

})

export const LastPrenotazioni = mongoose.model("lastprenotazioni", lastPrenotazioniSchema)