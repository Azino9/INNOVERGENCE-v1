import api from "../api";

// Get all problems
export const getAllProblems = async (token) => {
  const res = await api.get("/problems", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Select a problem
export const selectProblem = async (problemId, token) => {
  const res = await api.post(
    `/problems/${problemId}/select`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
