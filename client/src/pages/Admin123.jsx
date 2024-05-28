import { Link } from "react-router-dom";

function Admin123() {
  return (
    <>
      <div className="bg-stone-200 relative h-screen">
        {/* LINK BACK TO HOME */}
        <Link to="/" className="absolute top-8 left-6 tablet:left-8" title="Torna alla Home">
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
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>

        {/* HEADER */}
        <div className="flex justify-center items-center bg-stone-300 py-4">
          <h1 className="text-red-800 ml-4 flex mt-2 font-mono text-lg tablet:text-3xl py-4">
            Accesso alla Dashboard <span className="hidden tablet:block tablet:ml-2"> del Ristorante</span>
          </h1>
        </div>

        {/* LINKS */}
        <div className="flex flex-col justify-center items-center py-2'">

          {/* LOGIN SECTION */}
          <div className="flex justify-center items-center pt-20 pb-6">
            <Link
              to="/admin123/login"
              className="bg-red-700 rounded-full p-4 border-8 border-white z-30"
              title="Accedi al Login"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </Link>
            <Link
              to="/admin123/login"
              className="bg-red-700 z-10 -ml-6"
              title="Accedi al Login"
            >
              <h1 className="text-white text-xl px-20 py-2">Login</h1>
            </Link>
          </div>

          {/* REGISTRAZIONE SECTION */}
          <div className="flex justify-center items-center pb-20 pt-6">
            <Link
              to="/admin123/registrazione"
              className="bg-red-700 rounded-full p-4 border-8 border-white z-30"
              title="Accedi al Login"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </Link>
            <Link
              to="/admin123/registrazione"
              className="bg-red-700 z-10 -ml-6"
              title="Accedi al Login"
            >
              <h1 className="text-white text-xl px-12 py-2">Registrazione</h1>
            </Link>
          </div>

          <div className="pt-20 text-center">
            <h1><span className="text-red-600">Attenzione:</span> Soltanto le persone dello staff potranno accedere alla Dashboard del ristorante!</h1>
          </div>

        </div>
      </div>
    </>
  );
}
export default Admin123;
