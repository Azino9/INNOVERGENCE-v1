import React, { useState, useEffect } from "react";
import ghostrider from '../assets/ghostrider.png';

const GlobalTimer = () => {
  const [_, setTick] = useState(0);

  // 🕒 Fixed daily target: 3 PM
  const getToday3PM = () => {
    const t = new Date();
    t.setHours(15, 45, 0, 0);
    return t.getTime();
  };

  const getTomorrow3PM = () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    t.setHours(15, 45, 0, 0);
    return t.getTime();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const now = Date.now();
  const targetToday = getToday3PM();

  // 🟡 Before 3 PM → countdown to today's 3 PM
  // 🟢 After 3 PM → countdown to tomorrow's 3 PM (24 hrs)
  const isBeforeTarget = now < targetToday;
  const timerEnd = isBeforeTarget ? targetToday : getTomorrow3PM();

  const timeLeft = timerEnd - now > 0 ? timerEnd - now : 0;

  const hours = String(Math.floor(timeLeft / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");
  const timerChars = `${hours}:${minutes}:${seconds}`.split("");

  return (
    <div className="fixed bottom-4 right-10 flex flex-col items-end z-50">
      <div className="relative animate-fade-in-up flex items-center group transition-transform duration-300 hover:scale-110">
        <img
          src={ghostrider}
          alt="ghost rider img"
          className="w-20 h-20 object-contain rounded-xl -mr-8 shadow-lg z-10 transition-transform duration-300"
        />
        <div className="bg-black/70 shadow-xl p-3 py-4 pl-10 pr-5 rounded-2xl text-[#87CEFA] font-semibold text-base flex items-center space-x-2 backdrop-blur-xl z-0 timer-blink-outline transition-transform duration-300">
          <div className="flex flex-col items-center min-w-[100px]">
            <div className="text-white mb-1 text-base font-bold tracking-wide">
              {isBeforeTarget ? "Time Left to Start" : "Timer"}
            </div>
            <div className="flex space-x-1">
              {timerChars.map((char, idx) => (
                <span
                  key={idx}
                  className={`w-5 h-7 text-base flex items-center justify-center rounded-md ${
                    char === ":"
                      ? "text-[#00BFFF]"
                      : "bg-[#1E90FF]/20 text-white"
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .timer-blink-outline {
          box-shadow: 0 0 0 4px #dc6f26ff, 0 0 20px 4px #dc6f26ff;
          animation: blink-red-outline 1s infinite;
        }
        @keyframes blink-red-outline {
          0%, 100% {
            box-shadow: 0 0 0 4px #dc6f26ff, 0 0 20px 4px #dc6f26ff;
          }
          50% {
            box-shadow: 0 0 0 6px #dc6f26ff, 0 0 40px 8px #dc6f26ff;
          }
        }
      `}</style>
    </div>
  );
};

export default GlobalTimer;
