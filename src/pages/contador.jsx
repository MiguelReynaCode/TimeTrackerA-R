import React, { useState, useEffect, useRef } from "react";

export default function Contador() {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("Word Order");
  const [initials, setInitials] = useState("");
  const [task, setTask] = useState("cut");
  const [date, setDate] = useState(() => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  });
  const [numWorkers, setNumWorkers] = useState(1);
  const [history, setHistory] = useState([]);
  const countRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    countRef.current = setInterval(() => {
      setMilliseconds((prevMilliseconds) => prevMilliseconds + 10);
    }, 10);
  };

  const handlePauseResume = () => {
    if (isActive) {
      clearInterval(countRef.current);
    } else {
      handleStart();
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setMilliseconds(0);
  };

  const handleFinish = () => {
    const newEntry = {
      name,
      initials,
      task,
      time: formatTime(),
      date,
      numWorkers,
    };
    setHistory([...history, newEntry]);
    handleReset();
  };

  useEffect(() => {
    return () => clearInterval(countRef.current);
  }, []);

  const formatTime = () => {
    const getMilliseconds = `0${(milliseconds % 1000) / 10}`.slice(-2);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const getSeconds = `0${seconds}`.slice(-2);
    const minutes = Math.floor((milliseconds / 60000) % 60);
    const getMinutes = `0${minutes}`.slice(-2);

    return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  return (
    <div className="bg-gray-600 min-h-screen flex flex-col items-center pt-10">
      <div className="bg-white text-blue-900 rounded shadow-lg p-8 m-4 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Timing</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-xl font-semibold w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Word Order"
        />
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            value={initials}
            onChange={(e) => setInitials(e.target.value.toUpperCase())}
            className="text-xl font-semibold flex-grow p-2 border border-gray-300 rounded"
            placeholder="Initials"
            maxLength="3"
          />
          <select
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="text-xl font-semibold flex-grow p-2 border border-gray-300 rounded"
          >
            <option value="cut">Cut</option>
            <option value="heatseal">Heatseal</option>
            <option value="grammits">Grammits</option>
            <option value="bastilla">Bastilla</option>
            <option value="swe">Swe</option>
            <option value="clear">Clear</option>
            <option value="label">Label</option>
          </select>
        </div>

        <div className="flex space-x-4 mb-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-xl font-semibold flex-grow p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            value={numWorkers}
            min="1"
            onChange={(e) => setNumWorkers(e.target.value)}
            className="text-xl font-semibold flex-grow p-2 border border-gray-300 rounded"
            placeholder="Number of workers"
          />
        </div>
        <div className="text-center font-bold text-6xl mb-4">
          {formatTime()}
        </div>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleStart}
            disabled={isActive}
            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start
          </button>
          <button
            onClick={handlePauseResume}
            className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${
              !isActive && milliseconds === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!isActive && milliseconds === 0}
          >
            {isActive ? "Pause" : "Resume"}
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            disabled={milliseconds === 0}
          >
            Restart
          </button>
          <button
            onClick={handleFinish}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={!isActive && milliseconds === 0}
          >
            Finish
          </button>
        </div>
      </div>
      {history.length > 0 && (
        <div className="bg-white text-black rounded shadow-lg p-8 m-4 w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Historial</h2>
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b font-bold p-4 text-left">Word Order</th>
                <th className="border-b font-bold p-4 text-left">Initials</th>
                <th className="border-b font-bold p-4 text-left">Work</th>
                <th className="border-b font-bold p-4 text-left">Time</th>
                <th className="border-b font-bold p-4 text-left">Date</th>
                <th className="border-b font-bold p-4 text-left">Workers</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td className="border-b p-4 text-blue-700">{entry.name}</td>
                  <td className="border-b p-4 text-gray-600">
                    {entry.initials}
                  </td>
                  <td className="border-b p-4 text-blue-600">{entry.task}</td>
                  <td className="border-b p-4 text-gray-700">{entry.time}</td>
                  <td className="border-b p-4 text-blue-700">{entry.date}</td>
                  <td className="border-b p-4 text-gray-700 text-center">
                    {entry.numWorkers}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
