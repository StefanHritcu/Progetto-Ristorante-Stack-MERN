import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNumberNotifications } from "../redux/actions.js";

const Prenotazione = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendData, setIsSendData] = useState(false);

  {
    /* INITIAL VALUES */
  }
  const initialValues = {
    nomeAndCognome: "",
    cellulare: "",
    email: "",
    data: "",
    ora: "",
    persone: "",
    dettagliAggiuntivi: "Dettagli Aggiuntivi (facoltativo)",
  };

  {
    /* VALIDATE INPUTS */
  }
  const validate = (value) => {
    const errors = {};
    if (!value.nomeAndCognome) {
      errors.nomeAndCognome = "* Il nome e cognome sono obbligatori";
    }
    if (!value.cellulare) {
      errors.cellulare = "* Il numero di telefono è obbligatorio";
    } else if (!/^[0-9]{10}$/.test(value.cellulare)) {
      errors.cellulare = "* Il numero di telefono non è valido";
    }
    if (!value.email) {
      errors.email = "* L'email è obbligatoria";
    } else if (!/\S+@\S+\.\S+/.test(value.email)) {
      errors.email = "* L'email non è valida";
    }
    if (!value.data) {
      errors.data = "* La data è obbligatoria";
    }
    if (!value.ora) {
      errors.ora = "* L'ora è obbligatoria";
    }
    if (!value.persone) {
      errors.persone = "* Il numero di persone è obbligatorio";
    }
    if (!value.dettagliAggiuntivi) {
      ("");
    }
    return errors;
  };

  const dispatch = useDispatch();
  const verifica = useSelector(
    (state) => state.notifications.numberNotifications
  );

  {
    /* ONSUBMIT */
  }
  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/prenotazione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Errore durante l'invio della prenotazione");
      }

      dispatch(setNumberNotifications(+1));

      console.log(verifica);

      setStatus({ success: true });
    } catch (error) {
      setStatus({ error: error.message });
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
      setIsSendData(true);
    }
  };

  return (
    <div className="pb-4" id="prenotazione">
      <div className="tablet:relative flex justify-center items-center">
        <Link to="/" className="hidden tablet:block tablet:absolute tablet:left-8 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </Link>
        <h1 className="text-lime-500 text-4xl text-center my-4 pt-4">
          Prenota un tavolo
        </h1>
      </div>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {/* BACK TO HOME BUTTON  */}

        {({ status }) => (
          <Form className="flex flex-col justify-center items-center mx-6 bg-neutral-100 rounded-md">
            {status?.error && <p className="text-red-500">{status.error}</p>}
            {status?.success && (
              <p className="text-green-600 text-4xl py-10 font-bold">
                Prenotazione inviata con successo!
              </p>
            )}

            {/* COME BACK TO HOME BUTTON */}
            <div className={` ${isSendData ? "block" : "hidden"}`}>
              <Link to="/">
                <h1 className="underline text-violet-600 text-2xl pb-10">
                  Torna alla Home
                </h1>
              </Link>
            </div>

            {/* This div is HIDDEN once the booking is completed and submitted */}
            <div className={` ${isSendData ? "hidden" : "block"}`}>
              {/* NomeAndCognome INPUT */}
              <div>
                <Field
                  className="bg-neutral-700 text-neutral-50 text-lg flex justify-center mx-4 mt-4 w-80 p-2 rounded-md"
                  placeholder="Nome e Cognome*"
                  type="text"
                  id="nomeAndCognome"
                  name="nomeAndCognome"
                />
                <ErrorMessage
                  name="nomeAndCognome"
                  component="div"
                  className="text-red-500 text-center"
                />
              </div>

              {/* Cellulare INPUT */}
              <div>
                <Field
                  className="bg-neutral-700 text-neutral-50 text-lg flex justify-center mx-4 mt-4 w-80 p-2 rounded-md"
                  placeholder="Cellulare*"
                  type="number"
                  id="cellulare"
                  name="cellulare"
                />
                <ErrorMessage
                  name="cellulare"
                  component="div"
                  className="text-red-500 text-center"
                />
              </div>

              {/* Email INPUT */}
              <div>
                <Field
                  className="bg-neutral-700 text-neutral-50 text-lg flex justify-center mx-4 mt-4 w-80 p-2 rounded-md"
                  placeholder="Email*"
                  type="email"
                  id="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-center"
                />
              </div>

              {/* Data INPUT */}
              <div>
                <Field
                  className="bg-neutral-700 text-neutral-50 text-lg flex justify-center mx-4 mt-4 w-80 p-2 rounded-md"
                  placeholder="Data*"
                  type="date"
                  id="data"
                  name="data"
                />
                <ErrorMessage
                  name="data"
                  component="div"
                  className="text-red-500 text-center"
                />
              </div>

              {/* Ora INPUT */}
              <div>
                <Field
                  className="bg-neutral-700 text-neutral-50 text-lg flex justify-center mx-4 mt-4 w-80 p-2 rounded-md"
                  placeholder="Ora*"
                  type="time"
                  id="ora"
                  name="ora"
                />
                <ErrorMessage
                  name="ora"
                  component="div"
                  className="text-red-500 text-center"
                />
              </div>

              {/* Persone INPUT */}
              <div>
                <Field
                  className="bg-neutral-700 text-neutral-50 text-lg flex justify-center mx-4 mt-4 w-80 p-2 rounded-md"
                  placeholder="Persone*"
                  type="number"
                  id="persone"
                  name="persone"
                />
                <ErrorMessage
                  name="persone"
                  component="div"
                  className="text-red-500 text-center"
                />
              </div>

              {/* DettagliAggiuntivi INPUT */}
              <div className="mb-4">
                <Field
                  className="bg-neutral-700 text-neutral-50 text-lg flex justify-center mx-4 mt-4 w-80 p-2 rounded-md"
                  placeholder="Questo campo non deve essere vuoto"
                  type="text"
                  id="dettagliAggiuntivi"
                  name="dettagliAggiuntivi"
                />
              </div>

              <button
                type="submit"
                className="bg-lime-500 text-neutral-50 text-lg flex justify-center mx-4 mb-4 mt-12 w-80 p-2 rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Invio in corso..." : "Prenota Tavolo"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Prenotazione;
