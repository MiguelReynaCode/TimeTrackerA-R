import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-600">
      <div className="bg-white rounded shadow-lg p-8 text-center">
        <img
          className="w-16, h-16 mt-4"
          src="https://www.artarpaulins.com/images/site/buildout/logo.webp"
          alt=""
        />
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          A&R Tarpaulins
        </h1>
        <button
          onClick={() => navigate("/contador")}
          className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Ir al Contador
        </button>
      </div>
    </div>
  );
}
