import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Video from '../assets/video.mp4';
import Arrow from '../assets/arrow.png';
import TextType from './TextType'; // Make sure this path is correct
import DecryptedText from './DecryptedText'; // Make sure this path is correct

const HeroSection = () => {
  const videoRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);

  // Show button on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll after first video play
  const handleVideoEnd = () => {
    if (!hasAutoScrolled) {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
      setHasAutoScrolled(true);
    }
  };

  return (
    <div className="relative w-screen overflow-x-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-screen z-0">
        <video
  ref={videoRef}
  className="w-full h-full object-cover"
  autoPlay
  muted
  playsInline
  onEnded={handleVideoEnd} // trigger scroll when video ends
>
  <source src={Video} type="video/mp4" />
</video>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* First Slide – Empty with Scroll Down Button */}
      <section className="h-screen relative z-10">
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="animate-bounce border-2 border-white rounded-full w-16 h-16 flex items-center justify-center hover:bg-white transition absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          {Arrow && (
            <img
              src={Arrow}
              alt="Scroll Down"
              className="w-7 h-7 transition duration-300"
              style={{
                filter: 'invert(100%)',
              }}
              onMouseOver={e => (e.currentTarget.style.filter = 'invert(25%) sepia(100%) saturate(500%) hue-rotate(0deg) brightness(100%)')}
              onMouseOut={e => (e.currentTarget.style.filter = 'invert(100%)')}
            />
          )}
        </button>
      </section>

      {/* Second Slide – Hero Texts with Button and Stars */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center relative z-10 px-4">
        {/* Stars Layer */}
        <div className="absolute inset-0 z-0">
          <div className="stars"></div>
        </div>

        {/* Hero Texts */}
 <div
          className="mb-6 flex justify-center flex-wrap relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            textShadow: '0 0 30px rgba(220,38,38,0.8), 0 0 60px rgba(220,38,38,0.4), 0 5px 20px rgba(0,0,0,0.8)',
            background: 'linear-gradient(to bottom, #fff, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.1em',
          }}
        >
          <TextType
            text={["MLSC HACKATHON 2025"]}
            typingSpeed={100}
            showCursor={true}
            cursorCharacter="▌"
            cursorClassName="futuristic-cursor"
            loop={false} // Changed from true to false
            startOnVisible={true}
          />
        </div>

        <p className="text-xl md:text-2xl text-gray-300 mb-2 font-bold tracking-wide text-center relative z-10">
          <DecryptedText 
            text="INNOVERGENCE XXV" 
            animateOn="view" 
            speed={35}
            sequential={true}
            characters="01ABCDEF#%&*/\?|░▒▓█"
          />
        </p>
        <p className="text-base md:text-lg text-red-400 mb-8 font-semibold text-center relative z-10">
          <DecryptedText 
            text="October 11-12, 2025 | 24-Hour Innovation Battleground" 
            animateOn="view" 
            speed={35}
            sequential={true}
            characters="01ABCDEF#%&*/\?|░▒▓█"
          />
        </p>

        {/* Button */}
        {showButton && (
          <div className="flex flex-col items-center justify-center space-y-4 mt-4 relative z-10">
            <div className="text-white text-xl font-bold">
              Get ready for the mission!
            </div>
            <Link to="/login">
              <button className="px-8 py-4 bg-red-600 text-white font-bold text-xl tracking-widest rounded-xl shadow-[0_0_20px_rgba(255,0,0,0.7)] hover:shadow-[0_0_40px_rgba(255,0,0,0.9)] transform transition duration-300 hover:scale-110">
                ASSEMBLE YOUR TEAM
              </button>
            </Link>
          </div>
        )}
      </section>

      {/* Embedded CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image:
            radial-gradient(2px 2px at 20px 30px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 60px 70px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 50px 50px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 80px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 10px, white, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: twinkle 5s infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .futuristic-cursor {
          color: #dc2626;
          text-shadow: 0 0 15px #ef4444;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;