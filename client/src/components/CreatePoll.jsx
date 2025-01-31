import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPoll } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const CreatePoll = () => {
  const [eventName, setEventName] = useState("");
  const [dates, setDates] = useState([]);
  const [dateInput, setDateInput] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleAddDate = () => {
    if (!dateInput) return;

    if (dates.includes(dateInput)) {
      toast.warning("This date is already selected!", {
        position: "top-right",
      });
    } else {
      setDates([...dates, dateInput]);
      setDateInput("");
      toast.success("Date added successfully!", { position: "top-right" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPoll(eventName, dates, user); // Replace with logged-in user
    navigate("/dashboard");
  };

  return (
    <div className="text-white bg-zinc-800 min-h-screen flex flex-col items-center justify-start">
      <div className="top w-full py-2">
        <h2 className="text-2xl">Create a New Poll</h2>
      </div>
      <div className="bottom px-5 flex w-full h-[80vh] justify-between items-center">
        <div className="left w-1/2 flex justify-center h-full pt-15">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 p-3 w-fit border border-orange-300 h-fit items-center rounded-4xl bg-zinc-600 shadow-md shadow-orange-800"
          >
            <input
              type="text"
              placeholder="Event Name OR Place Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              className="w-150 bg-zinc-700 px-3 py-2 rounded-[10px] outline-none"
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddDate}
                className="bg-yellow-300 text-black px-3 py-1 rounded-sm"
              >
                Add Date
              </button>
            </div>
            <button
              type="submit"
              className="text-black cursor-pointer bg-blue-600 px-10 py-1 rounded-full"
            >
              Create Poll
            </button>
          </form>
        </div>
        <div className="right w-1/2 bg-zinc-900 h-full p-3">
          <h3>Selected Dates:</h3>
          <ul>
            {dates.map((date, index) => (
              <li key={index} className="text-yellow-500">{date}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
