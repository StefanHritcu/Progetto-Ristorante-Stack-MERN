function OrariApertura() {
  return (
    <>
      <div>
        <div className="flex flex-col items-start justify-center pl-4 my-4">
          <h1 className="text-2xl font-semibold my-2 ml-4 tablet:ml-16">
            Orari di apertura
          </h1>
          <div className="bg-lime-500 w-60 h-0.5 tablet:ml-6"></div>
        </div>

        <div className="flex flex-col px-4 items-center justify-center mt-8">
          {/* GIORNI DELLA SETTIMANA */}
          {[
            { giorno: "Lunedì", orario: "CHIUSO" },
            { giorno: "Martedì", orario: "11:00 - 00:00" },
            { giorno: "Mercoledì", orario: "11:00 - 00:00" },
            { giorno: "Giovedì", orario: "11:00 - 00:00" },
            { giorno: "Venerdì", orario: "09:00 - 02:00" },
            { giorno: "Sabato", orario: "09:00 - 02:00" },
            { giorno: "Domenica", orario: "09:00 - 02:00" },
          
          ].map(({ giorno, orario }, index) => (
            <div key={index} className="flex w-[300px] border border-gray-400">
              <h1 className="flex-1 px-4 py-2 font-semibold text-lg border-r border-gray-400 text-center">
                {giorno}
              </h1>
              <h1 className="flex-1 px-4 py-2 text-lg text-center">{orario}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default OrariApertura;
