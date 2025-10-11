import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/duaey89ln/upload";
const UPLOAD_PRESET = "avengersHackathon";

const AttendanceWebcam = ({ onUpload }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  // Capture image from webcam
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot({ quality: 0.7 });
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  // Reset capture
  const resetCapture = () => {
    setCapturedImage(null);
    setUploadedUrl(null);
  };

  // Upload image to Cloudinary
  const uploadToCloudinary = async () => {
    if (!capturedImage) return;

    setUploading(true);
    try {
      // Convert base64 to Blob
      const blob = await (await fetch(capturedImage)).blob();
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUploadedUrl(data.secure_url);

      // ✅ Notify parent about uploaded URL
      if (onUpload) onUpload(data.secure_url);

      resetCapture();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload photo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-semibold mb-4">Attendance Webcam</h2>

      {!capturedImage ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded-lg shadow-md"
          />
          <button
            onClick={capture}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Capture Photo
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={capturedImage}
            alt="Captured"
            className="rounded-lg shadow-md"
          />
          <div className="mt-4 flex gap-4">
            <button
              onClick={resetCapture}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Retake
            </button>
            <button
              onClick={uploadToCloudinary}
              disabled={uploading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {uploadedUrl && (
            <p className="mt-2 text-green-700">
              Uploaded URL:{" "}
              <a
                href={uploadedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View Photo
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceWebcam;
