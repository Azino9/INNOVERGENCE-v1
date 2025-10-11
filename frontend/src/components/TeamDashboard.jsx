import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Link } from "react-scroll";
import { Shield, Crown, Users, LogOut, Menu, X, Github, ExternalLink } from "lucide-react";
import GlobalTimer from "./GlobalTimer";
import { UserContext } from "../context/UserContext";
import api from "../api";
import Folder from "./Folder";
import Webcam from "react-webcam";
import socket, { onEvent, offEvent } from "../socket";
import fly from '../assets/flying-iron-removebg-preview.png';
import ave from '../assets/a.png';
import Attendance from "./Attendance";

import GlareHover from '../components/GlareHover';
import SpotlightCard from "./SpotlightCard"; // Corrected import path assuming it's in the same folder

// Marvel character images (omitted for brevity)
const marvelImages = {
  "Iron Man": "/marvel/ironman.png",
  "Captain America": "/marvel/captainamerica.png",
  "Thor": "/marvel/thor.png",
  "Hulk": "/marvel/hulk.png",
  "Spider-Man": "/marvel/spiderman.png",
  "Black Widow": "/marvel/blackwidow.png",
  "Captain Marvel": "/marvel/captainmarvel.png",
  "Scarlet Witch": "/marvel/scarletwitch.jpg",
  "Valkyrie": "/marvel/valkyrie.png",
  "Gamora": "/marvel/gamora.png",
};

const getMarvelImage = (member) => {
  if (!member || !member.marvelCharacter) return "/marvel/default.jpg";
  return marvelImages[member.marvelCharacter] || "/marvel/default.jpg";
};

// --- FIX STARTS HERE ---

// 1. ProfileCard is now simplified to only render the inner content.
//    The background, border, padding, and shadow styles have been removed from here.
const ProfileCard = ({ member }) => (
  <div className="text-center">
    <img
      src={getMarvelImage(member)}
      alt={member.name}
      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.6)] object-cover"
    />
    <h3 className="text-lg font-bold text-red-500">{member.marvelCharacter}</h3>
    <p className="text-red-400 text-sm mb-2">{member.role || "Member"}</p>
    <p className="text-gray-300 text-xs mb-3">aka {member.name}</p>
  </div>
);

// --- FIX ENDS HERE ---

// Leader Card (updated to golden yellow)
const LeaderCard = ({ leader, teamInfo }) => (
  <div className="relative overflow-hidden bg-black/90 border-2 border-amber-500 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(245,158,11,0.5)] hover:shadow-[0_0_80px_rgba(251,191,36,0.8)] hover:border-amber-400 transition-all duration-300 hover:-translate-y-2">
    <div className="flex flex-col items-center">
      <img
        src={getMarvelImage(leader)}
        alt={leader.name}
        // Changed border and shadow to amber
        className="w-40 h-40 rounded-full mb-6 border-4 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.7)] object-cover"
      />
      <h3 className="text-3xl font-bold flex items-center gap-2">
        <Crown size={28} className="text-yellow-300" />
        {/* Changed text to amber */}
        <span className="text-red-500">{leader.marvelCharacter}</span>
      </h3>
      {/* Changed text to amber */}
      <p className="text-amber-300 text-lg mt-2">{leader.role || "Team Leader"}</p>
      <p className="text-gray-300 text-sm italic mb-4">aka {leader.name}</p>

      {/* Changed border, shadow, and text colors to amber/yellow */}
      <div className="w-full mt-4 bg-black/60 border border-amber-600 rounded-xl p-4 text-left hover:shadow-[0_0_30px_rgba(217,119,6,0.6)] transition-all duration-300">
        <h4 className="text-lg font-semibold text-amber-300 flex items-center gap-2 mb-2">
          <Users size={20} className="text-amber-300" /> Team Details
        </h4>
        <p className="text-gray-300"><span className="text-amber-400 font-bold">Team Name:</span> {teamInfo.teamName}</p>
        <p className="text-gray-300"><span className="text-amber-400 font-bold">Team Number:</span> {teamInfo.teamNumber}</p>
        <p className="text-gray-300"><span className="text-amber-400 font-bold">Members:</span> {teamInfo.members.length}</p>
      </div>
    </div>
  </div>
);

// Cloudinary config
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/duaey89ln/upload";
const UPLOAD_PRESET = "avengersHackathon";

// Problem Statement (omitted for brevity)
const ProblemStatement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const problem = {
    number: 1,
    title: "AI-Powered Traffic Management System",
    description: `Develop an AI-driven system that analyzes real-time traffic data to optimize signal timings and reduce congestion. The system should integrate live feeds from cameras or sensors, detect traffic density, and adapt in real-time. Bonus points for using predictive analytics and visual dashboards.`,
  };

  return (
    <div
      className="relative bg-gradient-to-br from-red-950/30 to-black/60 border-2 border-red-800 rounded-2xl p-6 transition-all duration-300 hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(255,0,0,0.5)] cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-red-400 font-semibold mb-1 uppercase tracking-wider">
            Problem Statement #{problem.number}
          </p>
          <h4 className="text-xl font-bold text-white tracking-wide">{problem.title}</h4>
        </div>
        <svg
          className={`w-6 h-6 text-red-500 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-gray-300 leading-relaxed">{problem.description}</p>
      </div>
    </div>
  );
};

// Code Submission (omitted for brevity)
const CodeSubmission = () => {
  const EXTERNAL_SUBMISSION_LINK = "https://forms.gle/avengers-hackathon-submission-form";
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const getStatusMessage = () => {
    if (submissionStatus === 'success') {
      return "Redirecting... Please submit your code on the official external form.";
    }
    return "Use the github repository link below to upload you Project.";
  };

  const handleLinkClick = () => {
    setSubmissionStatus('success');
    window.open(EXTERNAL_SUBMISSION_LINK, '_blank');
    setTimeout(() => setSubmissionStatus(null), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-red-950/30 to-black/60 border-2 border-red-800 rounded-2xl p-6 transition-all duration-300 hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(255,0,0,0.5)]">
      <h3 className="text-2xl font-bold mb-4 text-red-500 flex items-center gap-2">
        <Github size={24} className="text-red-400" /> Code Submission Portal
      </h3>
      <p className={`mb-6 text-sm ${submissionStatus === 'success' ? 'text-green-400' : 'text-gray-300'}`}>
        {getStatusMessage()}
      </p>


      <p className="mt-4 text-xs text-yellow-400/80 p-2 border border-yellow-800/50 rounded bg-black/50">
        <span className="text-yellow-200 font-semibold mr-2">Form URL :</span>
        <a
          href={EXTERNAL_SUBMISSION_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-yellow-300 break-all font-mono inline-flex items-center gap-1"
        >
          <ExternalLink size={12} className="text-yellow-400 shrink-0" />
          {EXTERNAL_SUBMISSION_LINK}
        </a>
      </p>
    </div>
  );
};

const RubricCard = ({ title, total, points }) => (
  <div className="p-4 rounded-xl bg-black/85 border border-red-700 text-gray-200 shadow-[0_0_25px_rgba(255,0,0,0.4)] text-xs">
    <h4 className="text-sm font-bold text-red-400 mb-2">{title}</h4>
    <ul className="space-y-1">
      {points.map((p, i) => (
        <li key={i} className="text-gray-300">• {p}</li>
      ))}
    </ul>
    <p className="mt-2 text-red-500 font-semibold text-[10px]">{total}</p>
  </div>
);

// --- MAIN TEAM DASHBOARD ---
const TeamDashboard = () => {
  const { token, user, logout } = useContext(UserContext);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const greetingText = user && user.name
    ? user.isLeader
      ? `Welcome, Commander ${user.name}!` // Leader greeting
      : `Hello, Agent ${user.name}!`     // Member greeting
    : 'Welcome to AVENGERS HQ!'; // Safe default message

  // Attendance + Webcam states (omitted for brevity)
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      setCapturedImage(webcamRef.current.getScreenshot());
    }
  }, []);

  const resetCapture = () => setCapturedImage(null);

  const uploadToCloudinary = async () => {
    if (!capturedImage) return null;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", capturedImage);
      formData.append("upload_preset", UPLOAD_PRESET);
      const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error(err);
      alert("Upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleMarkAttendance = async (sessionNumber) => {
    const imageUrl = await uploadToCloudinary();
    if (!imageUrl) return;

    try {
      const res = await api.post("/attendance/mark", { sessionNumber, imageUrl }, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.data.success) throw new Error(res.data.error || "Failed");
      alert("Attendance marked successfully!");
      setCapturedImage(null);

      setTeam(prev => {
        const updatedAttendance = prev.attendance.map(sess =>
          sess.sessionNumber === sessionNumber ? { ...sess, status: 'Present', imageUrl } : sess
        );
        return { ...prev, attendance: updatedAttendance };
      });
    } catch (err) {
      console.error(err);
      alert(err.message || "Unexpected error");
      resetCapture();
    }
  };

  // Log out handler
  const handleLogout = () => {
    if (logout) {
      logout();
      window.location.href = '/';
    } else {
      console.error("UserContext does not provide a logout function.");
      window.location.href = '/login';
    }
  };


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Problem Statement", href: "/problem-select", requiresLeader: true },
    { name: "Logout", href: "/login" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.get("/teams/my-team", { headers: { Authorization: `Bearer ${token}` } });
        setTeam(res.data);
      } catch (err) {
        console.error("Failed to fetch team:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchTeam();
  }, [token]);

  useEffect(() => {
    const handleAttendanceMarked = (data) => {
      setTeam(prev => {
        if (!prev) return prev;
        const updatedAttendance = prev.attendance.map(sess =>
          sess.sessionNumber === data.sessionNumber ? { ...sess, status: data.status, imageUrl: data.imageUrl } : sess
        );
        return { ...prev, attendance: updatedAttendance };
      });
    };
    onEvent("attendance:marked", handleAttendanceMarked);
    return () => offEvent("attendance:marked", handleAttendanceMarked);
  }, []);

  if (loading) return <div className="text-center p-10 text-white">Loading...</div>;
  if (!team) return <div className="text-center p-10 text-white">No team data found.</div>;

  const leader = team.members.find(m => m.isLeader);
  const members = team.members.filter(m => !m.isLeader);

  if (!leader) return <div className="text-center p-10 text-white">Error: Could not find team leader data.</div>;


  const currentOpenSession = team.attendance.find(sess => sess.status === 'Open');
  const currentSessionNumber = currentOpenSession ? currentOpenSession.sessionNumber : null;
  const boundMarkAttendance = currentSessionNumber
    ? async () => {
      if (!capturedImage) {
        capture();
        return;
      }
      await handleMarkAttendance(currentSessionNumber);
    }
    : null;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white">
      {/* NAVBAR */}
      <nav className={`fixed w-full z-30 transition-all duration-300 ${scrolled ? 'bg-black/95 shadow-xl' : 'bg-transparent pt-4'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center py-3">
          <h1 className="text-2xl font-bold text-red-600 flex items-center gap-2"><Shield size={24} className="text-red-500" /> AVENGERS HQ</h1>

          {token && (
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map(link => {
                if (link.requiresLeader && user && !user.isLeader) {
                  return null;
                }

                if (link.name === "Logout") {
                  return (
                    <button
                      key={link.name}
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-red-500 transition duration-200 cursor-pointer text-sm font-medium uppercase tracking-wider flex items-center gap-1"
                    >
                      <LogOut size={16} /> {link.name}
                    </button>
                  );
                } else {
                  return (
                    <RouterLink
                      key={link.name}
                      to={link.href}
                      className="text-gray-300 hover:text-red-500 transition duration-200 cursor-pointer text-sm font-medium uppercase tracking-wider"
                    >
                      {link.name}
                    </RouterLink>
                  );
                }
              })}
            </div>
          )}

          {token && (
            <button className="lg:hidden text-red-500" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>

        {token && mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 p-4 border-t border-red-800 absolute w-full">
            {navLinks.map(link => {
              if (link.requiresLeader && user && !user.isLeader) {
                return null;
              }

              if (link.name === "Logout") {
                return (
                  <button
                    key={link.name}
                    onClick={handleLogout}
                    className="w-full text-left py-2 text-gray-300 hover:text-red-500 transition duration-200 cursor-pointer text-sm font-medium uppercase tracking-wider flex items-center gap-1"
                  >
                    <LogOut size={16} /> {link.name}
                  </button>
                );
              } else {
                return (
                  <RouterLink
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)} // Close menu on click
                    className="block w-full text-left py-2 text-gray-300 hover:text-red-500 transition duration-200 cursor-pointer text-sm font-medium uppercase tracking-wider"
                  >
                    {link.name}
                  </RouterLink>
                );
              }
            })}
          </div>
        )}
      </nav>


      {/* MAIN CONTENT */}
      <div className="pt-24 px-6 md:px-12 pb-32 max-w-7xl mx-auto">
        {/* Leader & Members */}
        <p className="text-lg font-semibold text-right mb-4 text-gray-300">
          <span className="text-red-400 font-bold">{greetingText}</span>
        </p>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Team Leader Column */}
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-3xl font-bold flex items-center gap-2 mb-2">
              <Crown size={26} className="text-yellow-400" />
              <span className="text-red-500">Team Leader</span>
            </h2>

            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              className="w-full"
            >
              <LeaderCard leader={leader} teamInfo={team} />
            </GlareHover>
          </div>

          {/* Team Members Column */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-red-500">Team Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              
              {/* --- FIX STARTS HERE --- */}
              {/* 2. The styles are now applied to SpotlightCard, and the spotlightColor is updated. */}
              {members.map(member => (
                <SpotlightCard
                  key={member._id}
                  spotlightColor="rgba(239, 68, 68, 0.3)" 
                  className="bg-black/80 border border-red-700 rounded-xl p-6 shadow-[0_0_30px_rgba(255,0,0,0.5)] hover:shadow-[0_0_60px_rgba(255,0,0,0.9)] hover:border-red-500 transition-all duration-300 hover:-translate-y-2"
                >
                  <ProfileCard member={member} />
                </SpotlightCard>
              ))}
              {/* --- FIX ENDS HERE --- */}
              
            </div>
          </div>
        </section>


        {/* Problem Statement */}
        <section className="mt-16 bg-black/70 border border-red-700/70 p-6 rounded-xl shadow-[0_0_30px_rgba(255,0,0,0.3)] backdrop-blur-sm">
          <h3 className="text-3xl font-bold mb-6 text-red-500 text-center uppercase tracking-widest">🧩 Problem Statement</h3>
          <ProblemStatement />
        </section>

        {/* Code Submission */}
        {user && user.isLeader && (
          <section className="mt-16 bg-black/70 border border-red-700/70 p-6 rounded-xl shadow-[0_0_30px_rgba(255,0,0,0.3)] backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-6 text-red-500 text-center uppercase tracking-widest">🔗 Submit Your Code</h3>
            <CodeSubmission />
          </section>
        )}
{/* Attendance Log */}
<section className="mt-16">
  <div className="flex items-center justify-between mb-8">
    <h3 className="text-3xl font-bold text-red-500 uppercase tracking-widest">⚡️ Mission Attendance Log</h3>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-start">
    <Attendance
      attendanceSessions={team.attendance}
      onUpdate={data =>
        setTeam(prev => {
          const updated = prev.attendance.map(sess =>
            sess.sessionNumber === data.sessionNumber
              ? { ...sess, status: data.status, imageUrl: data.imageUrl }
              : sess
          );
          return { ...prev, attendance: updated };
        })
      }
    />
  </div>
</section>


        {/* Rubrics Section */}
        <div className="mt-12 mb-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-red-500 uppercase tracking-wide">📋 Check Below for the Rubrics</h3>
          <p className="text-gray-300 mt-2">Review how each stage of your project will be evaluated. Make sure to check each criterion!</p>
        </div>

        <div className="flex w-full max-w-5xl mx-auto items-center relative min-h-[500px] mt-6 px-4">
          <div className="relative w-[150px] md:w-[300px] self-start pt-20 mr-8 mt-20">
            <img src={ave} alt="Ave Image" className="w-full h-auto rounded-lg relative z-10 brightness-75 opacity-40" />
          </div>
          <div className="flex-1 flex justify-center ml-26">
            <Folder size={2} color="#d63246" className="custom-folder" items={[<RubricCard
              key="r1"
              title="🧠 Review 1 – Understanding, Planning & Prototype"
              total="15 Points"
              points={[
                "Problem Understanding – Clear grasp of PS & objectives (5)",
                "Solution Approach & Planning – Logical and feasible (5)",
                "Prototype / Initial Design – Early demo/mockups (5)",
                "⚠ Penalty: -5 for plagiarism or copied concept.",
              ]}
            />,
            <RubricCard
              key="r2"
              title="⚙ Review 2 – Development Progress & Technical Implementation"
              total="25 Points"
              points={[
                "Core Feature Progress – Tangible progress on key features (10)",
                "Technical Depth – Efficient tech usage & data handling (10)",
                "Team Collaboration – Clear roles & communication (5)",
                "⚠ Penalty: -5 to -10 for copied GitHub/YT project without credit.",
              ]}
            />,
            <RubricCard
              key="r3"
              title="🔁 Review 3 – Refinement, Integration & Innovation"
              total="25 Points"
              points={[
                "Feedback Implementation – Addressed review comments (10)",
                "System Integration – Cohesive working flow (5)",
                "Innovation & Originality – Creative, unique ideas (5)",
                "Documentation – Clean code & README (5)",
              ]}
            />,
            <RubricCard
              key="r4"
              title="🚀 Review 4 – Final Solution, Functionality & Impact"
              total="35 Points"
              points={[
                "Problem-Solution Fit – Solves assigned PS effectively (10)",
                "Functionality & Completeness – Fully working product (10)",
                "Innovation & Creativity – Unique tech usage (5)",
                "UI/UX & Presentation – Smooth and clear (5)",
                "Originality & Ethics – No plagiarism (5)",
              ]}
            />,]} />
          </div>
          <div className="relative w-[150px] md:w-[300px] self-start pt-20">
            <img src={fly} alt="Flying Iron Man" className="w-full h-auto rounded-lg relative z-10 brightness-75 opacity-40" />
          </div>
        </div>
      </div>
      <GlobalTimer />
    </div>
  );
};

export default TeamDashboard;
