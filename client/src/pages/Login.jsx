import { Field, Form, Formik } from "formik";
import { useState } from "react";

import { Link } from "react-router-dom";



function Login() {
  const [verificaAutentificazione, setVerificaAutentificazione] =
    useState(false);

  const initialValues = {
    username: "",
    password: "",
  };



  const onSubmit = async (values, { setStatus }) => {
    setVerificaAutentificazione(true);
    try {
      const response = await fetch("http://localhost:5000/admin123/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Errore durante l'invio della prenotazione");
      }
  
      window.location.replace("/admindashboard");
      setStatus({ success: true });
      
    } catch (error) {
      setStatus({ error: error.message });
    }
  };

  return (
    <>
      <div className="relative bg-stone-200 h-screen">
        {/* BACK TO HOME LINK USING HEROICON */}
        <Link
          title="Torna indietro/ Torna alla Home"
          className="absolute top-8 left-8"
          to="/admin123"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </Link>

        {/* HEADER */}
        <div className="flex justify-center items-center bg-stone-300 py-4">
          <h1 className="text-red-800 font-mono text-3xl py-4">
            Accedi
          </h1>
        </div>

        <div className="flex justify-center items-center py-2">
          <h1 className="pt-10 font-bold text-4xl">Login</h1>
        </div>

        <div className="py-8 flex justify-center">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ status }) => (
              <Form>
                {/* USERNAME */}
                <div>
                  <Field
                    className="bg-neutral-700 text-neutral-50 text-lg flex justify-center mx-4 mt-4 w-80 p-2 rounded-md"
                    placeholder="Inserisci Username *"
                    type="text"
                    id="username"
                    name="username"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <Field
                    className="bg-neutral-700 text-neutral-50 text-lg flex justify-center mx-4 mt-4 w-80 p-2 rounded-md"
                    placeholder="Inserisci Password *"
                    type="password"
                    id="password" 
                    name="password"
                  />
                </div>

                {/* BUTTON */}
                <button
                  className="bg-blue-700 text-neutral-50 text-lg flex justify-center mx-4 my-4 w-80 p-2 rounded-md"
                  type="submit"
                >
                  {verificaAutentificazione
                    ? "Autentificazione..."
                    : "Accedi come Admin"}
                </button>
                {status && status.error && (
                  <div style={{ color: "red", textAlign: "center" }}>
                    {status.error}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>

        <div className="flex flex-col items-center bg-neutral-200">
          <h1 className="py-4">Oppure</h1>
          <Link
            className="underline text-violet-600 font-semibold text-xl flex justify-center mx-4 my-4 w-60 p-2 rounded-md"
            to="/admin123/registrazione"
          >
            Registrazione
          </Link>
        </div>
      </div>
    </>
  );
}
export default Login;
