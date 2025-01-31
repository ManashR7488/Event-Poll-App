import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getPolls, voteForDate } from "../api/api";

const socket = io("http://localhost:5000");

const Polls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const { data } = await getPolls();
      // console.log(data);
      setPolls(data || []);
    };
    fetchPolls();

    socket.on("pollUpdated", (updatedPoll) => {
      setPolls(prev => prev.map(p => p._id === updatedPoll._id ? updatedPoll : p));
    });
  }, []);

  const handleVote = async (pollId, date) => {
    await voteForDate(pollId, date);
  };

  return (
    <div>
      {polls.map(poll => (
        <div key={poll._id}>
          <h3>{poll.eventName} (by {poll.createdBy})</h3>
          {poll.dates.map(d => (
            <button key={d.date} onClick={() => handleVote(poll._id, d.date)}>
              {d.date} ({d.votes} votes)
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Polls;
