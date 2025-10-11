import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {  Building2, Award, Users, Globe } from 'lucide-react';
import hack from '../assets/hack.png';

gsap.registerPlugin(ScrollTrigger);
const SponsorsSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [focusedSponsor, setFocusedSponsor] = useState(null);
  const sponsors = [
    {
      name: 'Space Zee Tech Chennai',
      category: 'Title Partner',
      logo: Building2,
      offerings: ['Internship Opportunities', 'Technical Mentorship', 'Internship'],
      description: 'Leading tech innovation company providing cutting-edge solutions and career opportunities.',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      name: 'K7 Computing',
      category: 'Title Partner',
      logo: Award,
      offerings: ['Cybersecurity Internship', 'Security Workshops', 'Internship'],
      description: 'Premier cybersecurity solutions provider with industry-leading expertise.',
      color: 'from-red-600 to-orange-600'
    },
    {
      name: 'UNLOX',
      category: 'Title Partner',
      logo: Building2,
      offerings: ['Exciting Prizes', 'Mentorship', 'Internship'],
      description: 'Dynamic innovation company empowering ideas through cutting-edge technology and creative solutions.',
      color: 'from-green-600 to-teal-600'
    },
    {
      name: 'KARE',
      category: 'Host & Technology',
      logo: Building2,
      offerings: ['Venue & Infrastructure', 'Technical Support', 'Academic Partnership'],
      description: 'Host institution providing world-class facilities and academic excellence.',
      color: 'from-purple-600 to-pink-600'
    },

    {
      name: 'MLSC KARE',
      category: 'Community Partner',
      logo: Users,
      offerings: ['Event Organization', 'Student Engagement', 'Tech Community'],
      description: 'Student-led Microsoft Learn chapter fostering innovation and learning.',
      color: 'from-yellow-600 to-orange-600'
    },
    {
      name: 'Tech Community',
      category: 'Supporting Partner',
      logo: Users,
      offerings: ['Networking', 'Mentorship', 'Community Support'],
      description: 'Vibrant tech ecosystem supporting emerging developers and innovators.',
      color: 'from-indigo-600 to-purple-600'
    }
  ];
  useEffect(() => {
    const interval = setInterval(() => {
        // Only advance if a user hasn't manually focused on a sponsor
        if (focusedSponsor === null) {
            setActiveIndex((prev) => (prev + 1) % sponsors.length);
        }
    }, 4000);
    return () => clearInterval(interval);
  }, [sponsors.length, focusedSponsor]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sponsors-title', {
        scrollTrigger: {
          trigger: '.sponsors-title',
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: 'back.out(1.7)'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  const activeSponsor = focusedSponsor !== null ? sponsors[focusedSponsor] : sponsors[activeIndex];
  return (
    <section id="sponsors" ref={sectionRef} className="relative py-20 bg-gradient-to-b from-black via-cyan-950/10 to-black overflow-hidden">
      {/* Background hero image for Sponsors section */}
      <div className="absolute right-0 top-[30%] -translate-y-1/2 z-0 w-full h-full pointer-events-none select-none">
        <img
          src={hack}
          alt="Hack Hero"
          className="absolute right-0 top-[50%] -translate-y-1/2 w-[350px] max-w-none opacity-70 md:opacity-80 object-contain"
          style={{ filter: 'brightness(2.1) drop-shadow(0 0 80px #06b6d4)', minWidth: '180px' }}
        />
      </div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(6, 182, 212, 0.1) 50px, rgba(6, 182, 212, 0.1) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(6, 182, 212, 0.1) 50px, rgba(6, 182, 212, 0.1) 51px)',
          }}
        ></div>
        <div className="hologram-particles"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="sponsors-title text-5xl md:text-7xl font-black text-center mb-4"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            textShadow: '0 0 20px rgba(6, 182, 212, 0.8)',
            background: 'linear-gradient(to right, #06b6d4, #fff, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          S.H.I.E.L.D PARTNERS
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">
          Allied forces powering innovation
        </p>
        <div className="mb-16">
          <div className="relative hologram-container max-w-3xl mx-auto">
            <div className="hologram-display relative bg-black/50 backdrop-blur-sm border-2 border-cyan-500/50 rounded-lg p-8"
              style={{
                boxShadow: '0 0 40px rgba(6, 182, 212, 0.4), inset 0 0 40px rgba(6, 182, 212, 0.1)',
              }}
            >
              <div className="scanning-line"></div>
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${activeSponsor.color} rounded-full mb-4 hologram-pulse`}>
                  <activeSponsor.logo className="w-12 h-12 text-white" />
                </div>
                <div className="inline-block px-4 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full mb-3">
                  <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    {activeSponsor.category}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-wider"
                  style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.6)' }}
                >
                  {activeSponsor.name}
                </h3>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                  {activeSponsor.description}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {activeSponsor.offerings.map((offering, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-lg text-cyan-300 text-sm font-semibold"
                    >
                      {offering}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          {sponsors.map((sponsor, index) => {
            const Logo = sponsor.logo;
            const isActive = focusedSponsor !== null ? focusedSponsor === index : activeIndex === index;
            return (
              <button
                key={index}
                onClick={() => setFocusedSponsor(index)}
                onMouseOver={() => setFocusedSponsor(index)}
                onMouseLeave={() => setFocusedSponsor(null)}
                className={`group relative bg-black/50 backdrop-blur-sm border-2 rounded-lg p-4 transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-cyan-900/50 hover:border-cyan-500/50'
                }`}
                style={{
                  boxShadow: isActive
                    ? '0 0 30px rgba(6, 182, 212, 0.5)'
                    : '0 0 10px rgba(6, 182, 212, 0.1)',
                }}
              >
                <div className={`flex flex-col items-center justify-center h-full ${isActive ? 'animate-pulse' : ''}`}>
                  <div className={`p-3 bg-gradient-to-br ${sponsor.color} rounded-full mb-2`}>
                    <Logo className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-center text-gray-400 font-semibold leading-tight">
                    {sponsor.name}
                  </span>
                </div>
                {isActive && (
                  <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg animate-ping opacity-75"></div>
                )}
              </button>
            );
          })}
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-black/80 to-cyan-950/30 backdrop-blur-sm border-2 border-cyan-900/50 rounded-lg p-6"
            style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)' }}
          >
            <h4 className="text-xl font-black text-cyan-400 mb-4 uppercase flex items-center gap-2">
              <Building2 className="w-6 h-6" />
              Title Partners
            </h4>
            <div className="space-y-2">
              <p className="text-gray-300 font-semibold">Space Zee Tech Chennai</p>
              <p className="text-gray-300 font-semibold">K7 Computing</p>
              <p className="text-gray-300 font-semibold">UNLOX</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-black/80 to-cyan-950/30 backdrop-blur-sm border-2 border-cyan-900/50 rounded-lg p-6"
            style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)' }}
          >
            <h4 className="text-xl font-black text-cyan-400 mb-4 uppercase flex items-center gap-2">
              <Globe className="w-6 h-6" />
              Host & Technology
            </h4>
            <div className="space-y-2">
              <p className="text-gray-300 font-semibold">KARE</p>
              <p className="text-gray-300 font-semibold">Microsoft Learn</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-black/80 to-cyan-950/30 backdrop-blur-sm border-2 border-cyan-900/50 rounded-lg p-6"
            style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)' }}
          >
            <h4 className="text-xl font-black text-cyan-400 mb-4 uppercase flex items-center gap-2">
              <Users className="w-6 h-6" />
              Community Partners
            </h4>
            <div className="space-y-2">
              <p className="text-gray-300 font-semibold">MLSC KARE</p>
              <p className="text-gray-300 font-semibold">Tech Community</p>
            </div>
          </div>
        </div>
        
      </div>
      {/* FIX: Removed the 'jsx' attribute from the style tag */}
      <style>{`
        .hologram-particles {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(2px 2px at 20% 30%, rgba(6, 182, 212, 0.3), transparent),
                            radial-gradient(2px 2px at 60% 70%, rgba(6, 182, 212, 0.3), transparent),
                            radial-gradient(1px 1px at 50% 50%, rgba(6, 182, 212, 0.3), transparent);
          background-size: 200px 200px;
          animation: float 20s linear infinite;
        }
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-200px); }
        }
        .scanning-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), transparent);
          animation: scan 3s linear infinite;
        }
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(400px); }
        }
        .hologram-pulse {
          animation: hologramPulse 2s ease-in-out infinite;
        }
        @keyframes hologramPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 40px rgba(6, 182, 212, 0.8);
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
};
export default SponsorsSection;