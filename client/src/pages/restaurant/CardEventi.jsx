import { Link } from "react-router-dom";

function CardEventi({ icon, title, description, image }) {
  return (
    <Link to="/prenotazione" className="flex flex-col hover:bg-lime-500 group bg-white rounded-2xl p-2 mx-6 my-10 miniIconW plusNormalPhone:w-iconW h-iconH cursor-pointer">
      {/* ICON */}
      <div className="mb-4 ml-4 text-orange-500 text-forIcon">{icon}</div>

      {/* TITLE */}
      <h1 className="ml-4 text-lime-500 text-elegant text-mainText group-hover:text-white">{title}</h1>

      {/* DESCRIPTION */}
      <div className="ml-4 my-4 text-tiny text-gray-500 font-semibold">{description}</div>

      {/* IMAGE */}
      <div className="w-36 h-auto ml-4 my-2">
        <img src={image} alt={title} />
      </div>
    </Link>
  );
}
export default CardEventi;
