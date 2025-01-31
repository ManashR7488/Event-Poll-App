import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { finalizeDate, getPolls } from "../api/api";

const PollDetails = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    async function fetchPoll() {
      const polls = await getPolls();
      const selectedPoll = polls.find((p) => p._id === pollId);
      setPoll(selectedPoll);
    }
    fetchPoll();
  }, [pollId]);

  const handleFinalize = async (date) => {
    await finalizeDate(pollId, date);
    setPoll({ ...poll, finalizedDate: date });
  };

  if (!poll) return <h2>Loading...</h2>;

  return (
    <div className="border m-2">
      <h2>{poll.eventName}</h2>
      {poll.finalizedDate ? (
        <h3>Finalized Date: {poll.finalizedDate}</h3>
      ) : (
        <>
          {poll.dates.map((dateOption) => (
            <button key={dateOption.date} onClick={() => handleFinalize(dateOption.date)}>
              Finalize {dateOption.date} ({dateOption.votes} votes)
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default PollDetails;
