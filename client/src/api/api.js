import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api"; // Change this when deploying

// 🔹 Fetch All Polls
export const getPolls = async () => {
  try {
    const response = await axios.get(`${API_URL}/polls`);
    return response.data;
  } catch (error) {
    console.error("Error fetching polls:", error);
    return [];
  }
};

// 🔹 Create a New Poll
export const createPoll = async (eventName, dates, createdBy) => {
  try {
    const response = await axios.post(`${API_URL}/polls/create`, { eventName, dates, createdBy });
    return response.data;
  } catch (error) {
    console.error("Error creating poll:", error);
    return null;
  }
};

// 🔹 Vote for a Date
export const voteForDate = async (pollId, date, voterName) => {
  try {
    const response = await axios.post(`${API_URL}/polls/vote/${pollId}`, { pollId, date, voterName });
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Error voting. Please try again.", { position: "top-right" });
    // console.error("Error voting:", error);
    return null;
  }
};

// 🔹 Finalize Date (Send WhatsApp Notification)
export const finalizeDate = async (pollId, finalizedDate) => {
  try {
    const response = await axios.post(`${API_URL}/polls/finalize`, { pollId, finalizedDate });
    return response.data;
  } catch (error) {
    console.error("Error finalizing date:", error);
    return null;
  }
};
