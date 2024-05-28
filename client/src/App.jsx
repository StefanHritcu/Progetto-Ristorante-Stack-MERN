import { Route, Routes } from "react-router-dom"
import Prenotazione from "./pages/Prenotazione"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Registrazione from "./pages/Registrazione"

import Admin123 from "./pages/Admin123"
import AdminDashboard from "./pages/admindashboard/AdminDashboard"
import Notifications from "./pages/admindashboard/components/notifications/Notifications"
import SendMail from "./pages/admindashboard/components/SendMail"





function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/prenotazione" element={<Prenotazione/>} />
      <Route path="/admin123" element={<Admin123/>} />
      <Route path="/admin123/login" element={<Login/>} />
      <Route path="/admin123/registrazione" element={<Registrazione/>} />
      <Route path="/admindashboard" element={<AdminDashboard/>} />

      <Route path="/notifications" element={<Notifications/>} />
      <Route path="/admindashboard/email" element={<SendMail/>} />

    </Routes>
    </>
  )
}

export default App
