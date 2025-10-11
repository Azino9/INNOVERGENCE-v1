import React, { useEffect, useState, useCallback } from "react";
// ProblemSelection component: lets team leaders select a problem statement for their team.
import { io } from "socket.io-client";
import { getAllProblems, selectProblem } from "../services/problemService";
import { getMyTeam } from "../services/teamService";
import Swal from "sweetalert2";
import clsx from "clsx";

const socket = io("https://mlsc-admin-backend-1.onrender.com");

const ProblemSelection = ({ token }) => {
  const [problems, setProblems] = useState([]);
  const [teamInfo, setTeamInfo] = useState(null);
  const [selectedProblemId, setSelectedProblemId] = useState(null); // confirmed selection
  const [pendingProblemIds, setPendingProblemIds] = useState([]); // being selected
  const [expandedIds, setExpandedIds] = useState([]); // which cards are expanded to show full description

  // Memoize leader check for performance
  const isLeader = teamInfo?.members?.some((m) => m.isLeader);

  // Prepare sorted problems for rendering (full problems at bottom)
  const sortedProblems = problems
    .map((p) => {
      const isFull = p.teams.length >= 2;
      const isSelectedForTeam = selectedProblemId === p._id;
      const isPending = pendingProblemIds.includes(p._id);
      const canSelect = isLeader && !isFull && !isSelectedForTeam && !isPending && !selectedProblemId;
      const progressPercent = Math.min(100, (p.teams.length / 2) * 100);
      return { ...p, isFull, isSelectedForTeam, isPending, canSelect, progressPercent };
    })
    .sort((a, b) => a.isFull - b.isFull);

  useEffect(() => {
    let isMounted = true;

    // Fetch team and problem data
    const fetchData = async () => {
      try {
        const team = await getMyTeam(token);
        if (!isMounted) return;
        setTeamInfo(team);

        const problemList = await getAllProblems(token);
        if (!isMounted) return;
        // Enforce teamLimit = 2 for all problems
        setProblems(problemList.map(p => ({ ...p, teamLimit: 2 })));
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();

    const handleProblemUpdate = (updatedProblem) => {
      setProblems((prev) =>
        prev.map((p) => (p._id === updatedProblem._id ? updatedProblem : p))
      );

      // Remove from pending if someone confirmed selection
      setPendingProblemIds((prev) => prev.filter((id) => id !== updatedProblem._id));

      // Update selectedProblemId if our team selected it
      if (updatedProblem.teams.some((t) => t._id === teamInfo?._id)) {
        setSelectedProblemId(updatedProblem._id);
      }
    };

    socket.on("problemUpdated", handleProblemUpdate);

    return () => {
      isMounted = false;
      socket.off("problemUpdated", handleProblemUpdate);
    };
  }, [token, teamInfo?._id]);

  const handleSelect = useCallback(
    async (problemId) => {
      if (!isLeader) {
        return Swal.fire("Error", "Only team leaders can select a problem!", "error");
      }

      const selectedProblem = problems.find((p) => p._id === problemId);

      const { isConfirmed } = await Swal.fire({
        title: "Confirm Selection",
        html: `Are you sure your team wants to select <b>${selectedProblem.title}</b>?<br><small>This action cannot be undone.</small> `,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, select it!",
      });

      if (!isConfirmed) return;

      // Add to pending to lock it immediately
      setPendingProblemIds((prev) => [...prev, problemId]);

      try {
        await selectProblem(problemId, token);
        setSelectedProblemId(problemId); // confirm selection
        setPendingProblemIds((prev) => prev.filter((id) => id !== problemId));

        Swal.fire({
          title: "Selected!",
          text: "Your team has locked this problem. Other problems are now unavailable for your team.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        setPendingProblemIds((prev) => prev.filter((id) => id !== problemId));

        Swal.fire({
          title: "Error",
          text: err.response?.data?.message ?? "Problem selection failed. Maybe another team selected it!",
          icon: "error",
        });
      }
    },
    [teamInfo, token, problems]
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6" aria-label="Problem Selection">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Problem Statements
      </h1>
      <div className="mb-8 text-center">
        <span className="text-md text-gray-700 bg-yellow-100 px-4 py-2 rounded-xl inline-block">
          <b>Note:</b> Only <span className="text-blue-600 font-bold">2 teams</span> can select each problem statement. Once full, selection is locked.
        </span>
    </div>
      {/* Horizontal scrollable row of problem cards */}
      <div className="flex space-x-6 overflow-x-auto py-4 px-2">
        {sortedProblems.map(({ _id, title, description, subTopic, teams, isFull, isSelectedForTeam, isPending, canSelect, progressPercent }) => {
          const isExpanded = expandedIds.includes(_id);
          return (
          <div
            key={_id}
            style={{ minWidth: 340 }}
            className={clsx(
              "bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1",
              isFull ? "opacity-60" : ""
            )}
            aria-label={`Problem card: ${title}`}
          >
            <h2 className={clsx("text-2xl font-semibold mb-3", isFull ? "text-gray-500 line-through" : "text-gray-800")}>{title}</h2>
            <p className={clsx("mb-4", isFull ? "text-gray-400 line-through" : "text-gray-600")}>
              {isExpanded ? description : description}
            </p>
            {/* Short preview when not expanded */}
            {!isExpanded && (
              <p className="text-gray-600 mb-2 line-clamp-3">{description}</p>
            )}
            <div className="flex items-center justify-between mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {subTopic}
              </span>
              <span className="text-sm text-gray-500" aria-label="Teams selected">
                {teams.length}/2 Teams
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Selected Teams</label>
                <button
                  type="button"
                  onClick={() => setExpandedIds((prev) => prev.includes(_id) ? prev.filter((x) => x !== _id) : [...prev, _id])}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  {isExpanded ? "Less" : "More"}
                </button>
              </div>
              <select className="w-full rounded-lg border-gray-300 text-gray-700 bg-gray-50 p-2" disabled={teams.length === 0}>
                {teams.length === 0 ? (
                  <option>No teams selected yet</option>
                ) : (
                  teams.map((team) => (
                    <option key={team._id || team.teamNumber}>
                      {team.teamName} {team.teamNumber ? `(#${team.teamNumber})` : ""}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {subTopic}
              </span>
              <span className="text-sm text-gray-500" aria-label="Teams selected">
                {teams.length}/2 Teams
              </span>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Selected Teams:</label>
              <select className="w-full rounded-lg border-gray-300 text-gray-700 bg-gray-50 p-2" disabled={teams.length === 0}>
                {teams.length === 0 ? (
                  <option>No teams selected yet</option>
                ) : (
                  teams.map((team) => (
                    <option key={team._id || team.teamNumber}>
                      {team.teamName} {team.teamNumber ? `(#${team.teamNumber})` : ""}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4" aria-label="Selection progress">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <button
              onClick={() => handleSelect(_id)}
              disabled={!canSelect}
              aria-disabled={!canSelect}
              aria-label={
                isSelectedForTeam
                  ? "Selected by your team"
                  : isPending
                  ? "Pending selection"
                  : !isLeader
                  ? "Leader Only"
                  : isFull
                  ? "Full (2/2 teams)"
                  : "Select Problem"
              }
              className={clsx(
                "w-full py-3 rounded-2xl font-semibold text-white transition",
                isSelectedForTeam
                  ? "bg-green-500 cursor-not-allowed"
                  : isPending
                  ? "bg-yellow-500 cursor-not-allowed"
                  : !isFull && canSelect
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              )}
            >
              {isSelectedForTeam
                ? "✅ Selected by your team"
                : isPending
                ? "⏳ Pending..."
                : !isLeader
                ? "Leader Only"
                : isFull
                ? "Full (2/2 teams)"
                : "Select Problem"}
            </button>
          </div>
        );
        })}
      </div>
    </div>
  );
};

export default ProblemSelection;
