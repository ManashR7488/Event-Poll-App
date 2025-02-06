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

  const handleFinalize = async () => {
   const res = await finalizeDate(pollId);
    console.log(res);
    setPoll({ ...poll, finalizedDate: res.finalizedDate });
  };

  if (!poll) return <h2>Loading...</h2>;

  return (
    <div className="border m-2">
      <h2>{poll.eventName}</h2>
      {poll.finalizedDate ? (
        <h3>Finalized Date: {poll.finalizedDate}</h3>
      ) : (
        <>
            <button onClick={() => handleFinalize()} className="bg-blue-500 hover:bg-blue-600 cursor-pointer px-3 py-1 m-2 rounded-md text-white">
              view
            </button>
          
        </>
      )}
    </div>
  );
};

export default PollDetails;
