import express from "express";
import http from "http";
import { Server } from "socket.io";
import prenotazioniRoutes from "./routes/prenotazioni.js";
import mongoose from "mongoose";
import cors from "cors";
import registrazioneRoutes from "./routes/auth.js";
import loginRoutes from "./routes/auth.js";
import dashRoutes from "./routes/dash.js";


const app = express();

// ! SOCKET.IO
const server = http.createServer(app);
const io = new Server(server);



io.on('connection', (socket) => {
    console.log('Nuova connessione WebSocket');

    // Gestisci gli eventi WebSocket
    socket.on('evento-client', (data) => {
        console.log('Evento ricevuto dal client:', data);

        // Esegui qualche azione e invia una risposta al client
        socket.emit('evento-server', 'Risposta dal server');
    });
});

// Middleware
// ! JSON SEMPRE PER PRIMO
app.use(express.json());
// ! CORS() SEMPRE PRIMA DEGLI ENDPOINT
app.use(cors());

// Routes
app.use("/prenotazione", prenotazioniRoutes);
app.use("/admin123", registrazioneRoutes);
app.use("/admin123", loginRoutes);
app.use("/admindashboard", dashRoutes);

const PORT = 5000;
const CONNECTION_URL = "mongodb://localhost:27017/AdminRistorante";

mongoose.connect(CONNECTION_URL)
    .then(() => {
        console.log("Connected to MongoDB")
        server.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        });
    })
    .catch(error => console.error(error));
