import React, { useState, useRef, useCallback, useContext, useEffect } from "react";
import Webcam from "react-webcam";
import { UserContext } from "../context/UserContext";
import api from "../api"; 
import socket, { onEvent, offEvent } from "../socket";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/duaey89ln/upload";
const UPLOAD_PRESET = "avengersHackathon";

const videoConstraints = { width: 640, height: 480, facingMode: "user" };

const Attendance = ({ attendanceSessions, onUpdate }) => {
  const { token } = useContext(UserContext);
  const webcamRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  
  // Capture webcam image
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const resetCapture = () => setCapturedImage(null);

  // Upload image to Cloudinary
  const uploadToCloudinary = async () => {
    if (!capturedImage) return null;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", capturedImage);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
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

  // Mark attendance
  const handleMarkAttendance = async (sessionNumber) => {
    const imageUrl = await uploadToCloudinary();
    if (!imageUrl) return;

    try {
      const { data } = await api.post("/attendance/mark", { sessionNumber, imageUrl });
      if (!data.success) throw new Error(data.error || "Failed");
      resetCapture();
      setSelectedSession(null);
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Listen for real-time updates
  useEffect(() => {
    const handleAttendanceMarked = (data) => {
      if (onUpdate) onUpdate(data);

      // Update captured image if modal is open for this session
      setCapturedImage((prev) => {
        if (selectedSession && data.sessionNumber === selectedSession) {
          return data.imageUrl || prev;
        }
        return prev;
      });
    };

    onEvent("attendance:marked", handleAttendanceMarked);
    return () => offEvent("attendance:marked", handleAttendanceMarked);
  }, [onUpdate, selectedSession]);

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4 text-red-500">🛡 Attendance Log</h3>

      <table className="w-full border-collapse text-left text-sm mb-6">
        <thead>
          <tr className="bg-gradient-to-r from-red-700 to-black text-white">
            <th className="p-3 border-b border-red-700">Mission</th>
            <th className="p-3 border-b border-red-700 text-center">Status</th>
            <th className="p-3 border-b border-red-700 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
  {attendanceSessions.map((session) => {
    // Determine status based on session.started
    const status = session.started ? "Started" : "Not Started";
    const colorClass = session.started ? "text-green-500" : "text-blue-400";

    return (
      <tr
        key={session.sessionNumber}
        className="border-b border-red-800/40 hover:bg-red-700/10 transition"
      >
        <td className="p-3 font-semibold">Mission {session.sessionNumber}</td>
        <td className={`p-3 text-center font-semibold ${colorClass}`}>
          {status}
        </td>
        <td className="p-3 text-center">
          {session.imageUrl ? (
            <img
              src={session.imageUrl}
              className="w-16 h-16 rounded-md mx-auto"
            />
          ) : session.actions && session.actions.length > 0 ? (
            session.actions.map((action) => (
              <button
                key={action.label}
                className={`px-3 py-1 rounded text-white transition ${
                  action.color === "blue"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : action.color === "green"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
                onClick={() => {
                  if (action.onClick) action.onClick(session.sessionNumber);
                  else {
                    setSelectedSession(session.sessionNumber);
                    setModalOpen(true);
                  }
                }}
              >
                {action.label}
              </button>
            ))
          ) : (
            <span className="text-gray-400">—</span>
          )}
        </td>
      </tr>
    );
  })}
</tbody>


      </table>

      {/* Modal */}
      {modalOpen && selectedSession && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-black/80 rounded-xl p-6 w-[400px] relative">
            <button
              className="absolute top-2 right-2 text-red-500 font-bold text-xl"
              onClick={() => {
                setModalOpen(false);
                setSelectedSession(null);
                resetCapture();
              }}
            >
              &times;
            </button>

            <h4 className="text-xl font-bold text-red-400 mb-4">Capture Your Face</h4>

            <div className="flex flex-col items-center">
              {!capturedImage ? (
                <>
                  <Webcam
                    audio={false}
                    height={240}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={320}
                    videoConstraints={videoConstraints}
                    className="rounded-xl border-2 border-red-600 shadow-lg"
                  />
                  <button
                    className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    onClick={capture}
                  >
                    Capture
                  </button>
                </>
              ) : (
                <>
                  <img
                    src={capturedImage}
                    alt="captured"
                    className="rounded-xl border-2 border-red-600 w-80 h-auto mb-2"
                  />
                  <div className="flex gap-3">
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      onClick={resetCapture}
                    >
                      Retake
                    </button>
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      onClick={() => handleMarkAttendance(selectedSession)}
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Submit"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
