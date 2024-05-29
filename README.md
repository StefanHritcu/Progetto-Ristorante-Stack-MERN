Ristorante MERN

Struttura del Progetto
Il progetto è suddiviso in due parti principali:

Backend (Server)
Frontend (Client)


-Backend (Server)
Tecnologie: Node.js, Express.js, MongoDB

Funzionalità principali:
Gestione delle prenotazioni
Autenticazione e autorizzazione degli utenti
API RESTful per il frontend


-Frontend (Client)
Tecnologie: React, Redux
Funzionalità principali:
Interfaccia utente per i clienti per effettuare prenotazioni
Dashboard per i dipendenti e il proprietario per gestire le prenotazioni
Autenticazione e autorizzazione degli utenti


Requisiti
Node.js (versione 14 o superiore)
MongoDB (versione 4 o superiore)

Installazione
Clonare il repository
git clone https://github.com/tuo-username/ristorante-mern.git
cd ristorante-mern
Configurare le variabili d'ambiente
Crea un file .env nella directory principale del progetto e aggiungi le seguenti variabili:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Installare le dipendenze

Backend
cd server
npm install

Frontend
cd client
npm install

Avvio del Progetto

Avviare il Server
npm start

Avviare il Client
cd client
npm run dev


Accesso all'Admin
Per accedere alla dashboard dell'admin, inserire nell url /admin123 o /admindashboard per saltare direttamente il login/registrazione e accedere direttamente alla dashboard

ps usare POSTMAN nel caso si volesse provare le api del backend
