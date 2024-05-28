import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SendMail() {
  const emailClicked = useSelector((state) => state.notifications.showEmail);

  const [sendEmailWithSuccess, setSendEmailWithSuccess] = useState(false);
  const [errors, setErrors] = useState({ object: false, message: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const object = form.elements.object.value.trim();
    const message = form.elements.message.value.trim();

    if (!object || !message) {
      setErrors({ object: !object, message: !message });
      return;
    }

    // Invio dell'email (simulato)
    setTimeout(() => {
      setSendEmailWithSuccess(true);
      resetForm(form);
      setTimeout(() => {
        setSendEmailWithSuccess(false);
      }, 5000);
    }, 1000);
  };

  const resetForm = (form) => {
    form.reset();
    setErrors({ object: false, message: false });
  };

  return (
    <>
      <div className="relative">
        <div
          className={`absolute top-32 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            sendEmailWithSuccess ? "success" : "hidden"
          }`}
        >
          <div className="bg-green-600 py-2 px-6 rounded-xl text-white">
            Email inviata con successo!
          </div>
        </div>

        <div className="relative bg-teal-600 flex items-center justify-start">
          <div className="p-8 ml-12 font-serif text-3xl text-white">
            <h1>Invia Email al cliente</h1>
          </div>
          <Link
            to="/admindashboard"
            className="absolute right-6 p-6 cursor-pointer"
            title="Torna indietro"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>

        <div
          className="border border-gray-200 p-10 m-14 h-screen"
          style={{ maxHeight: "75vh" }}
        >
          <div className="bg-gray-100 p-2 ml-5">
            <h1>Nuovo messaggio</h1>
          </div>

          <div className="mx-6 border-b border-gray-200 py-2 ml-8">
            <h1>
              A <span className="font-bold ml-2">{emailClicked.email}</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mx-6 border-b border-gray-200 py-2 ml-8 flex items-center">
              <h1>Oggetto</h1>
              <input
                name="object"
                className={`ml-4 bg-green-50 font-bold p-1 w-96 ${
                  errors.object && "border-red-500"
                }`}
                type="text"
              />
            </div>

            <div className="m-5 p-5 border-x border-b border-green-200 h-44 ml-8 pt-4 relative">
              <input
                name="message"
                type="text"
                placeholder="Scrivi"
                className={`pl-4 pb-20 w-full h-full outline-none bg-green-50 ${
                  errors.message && "border-red-500"
                }`}
                style={{ resize: "none" }}
              />
              {errors.message && (
                <p className="absolute bottom-2 left-2 text-red-500 text-xs">
                  Inserisci un messaggio
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-12">
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-2xl text-white"
              >
                Invia
              </button>

              <div
                onClick={() => resetForm()}
                title="Cancella contenuto"
                className="cursor-pointer"
              >
                {/* Icona per cancellare il contenuto */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SendMail;
