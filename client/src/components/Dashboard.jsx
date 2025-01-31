import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPolls, voteForDate } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [polls, setPolls] = useState([]);
  const { user, logout } = useContext(AuthContext);
  // console.log(user);
  useEffect(() => {
    async function fetchPolls() {
      const data = await getPolls();
      setPolls(data);
    }
    fetchPolls();
  }, []);

  const handleVote = async (pollId, date, voterName) => {
    await voteForDate(pollId, date, voterName);
    setPolls(await getPolls()); // Refresh poll list
  };

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div className="bg-zinc-800 text-white min-h-screen ">
      <div className="nav bg-zinc-700 border-2 border-zinc-800 w-full h-30 px-3 py-1 flex">
        <div className="left h-full w-1/2">
          <h2 className="uppercase">Dashboard</h2>
          <h1 className="text-2xl">
            hii, <span className="uppercase">{user.name}</span>
          </h1>
        </div>
        <div className="right h-full w-1/2 flex justify-end items-end gap-2">
        <Link to="/create" className="text-white hover:underline p-2 rounded-md bg-blue-400">
        Create a New Poll
      </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
      {polls.map((poll) => (
        <div key={poll._id} className="bg-amber-600 m-2 w-fit p-3">
          <h3>{poll.eventName}</h3>
          {poll.dates.map((dateOption) => (
            <button
              key={dateOption.date}
              onClick={() => handleVote(poll._id, dateOption.date, user.id)}
              className="bg-blue-500 text-white p-2 rounded-md cursor-pointer mx-1 my-1"
            >
              {dateOption.date} ({dateOption.votes.length} votes)
            </button>
          ))}
          <Link to={`/poll/${poll._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
