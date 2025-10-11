import api from "../api";


export const getMyTeam = async () => {
  try {
    const response = await api.get("/teams/my-team"); // backend uses req.user.teamId
    return response.data; // full team object
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch team");
  }
};