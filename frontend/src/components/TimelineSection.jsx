import { useState, useEffect, useRef } from 'react';
import strange from '../assets/strange.png';
import grootBadge from "../assets/groot-badge.png";
import blackPanther from '../assets/Black Panther.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, Trophy, Users, CheckCircle, PlayCircle, Send } from 'lucide-react'; 

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
  const sectionRef = useRef(null);
  const [flippedCards, setFlippedCards] = useState({});

  const phases = [
    // ... your phases data remains unchanged
    { id: 1, title: 'Registration Opens', date: 'September 28, 2025', time: '00:00 IST', status: 'completed', icon: Users, details: 'Assemble your team of 5 heroes. Choose your domain wisely.', color: 'from-green-600 to-green-800' },
    { id: 2, title: 'Registration Deadline', date: 'October 5, 2025', time: '23:59 IST', status: 'completed', icon: Calendar, details: 'Final call! Lock in your team roster before midnight.', color: 'from-yellow-600 to-yellow-800' },
    { id: 3, title: 'Event Launch', date: 'October 11, 2025', time: '14:00 IST', status: 'upcoming', icon: PlayCircle, details: 'Orientation and opening ceremony to kickstart!', color: 'from-blue-600 to-blue-800' },
    { id: 4, title: 'Ignition Time', date: 'October 11, 2025', time: '15:00 IST', status: 'upcoming', icon: Clock, details: 'Unleash your ideas—start coding now!', color: 'from-purple-600 to-purple-800' },
    { id: 5, title: 'Checkpoint No:1', date: 'October 11, 2025', time: '18:00 IST', status: 'upcoming', icon: CheckCircle, details: '“Score 15 points and kickstart your hackathon journey!”', color: 'from-red-600 to-red-800' },
    { id: 6, title: 'Checkpoint No:2', date: 'October 11, 2025', time: '23:00 IST', status: 'upcoming', icon: CheckCircle, details: '“Earn 25 points as you tackle the next challenge!”', color: 'from-red-600 to-red-800' },
    { id: 7, title: 'Checkpoint No:3', date: 'October 12, 2025', time: '05:00 IST', status: 'upcoming', icon: CheckCircle, details: '“Grab 25 points and push towards the final stage!”', color: 'from-red-600 to-red-800' },
    { id: 8, title: 'Checkpoint No:4', date: 'October 12, 2025', time: '13:00 IST', status: 'upcoming', icon: CheckCircle, details: '“Conquer the ultimate challenge for 35 points and glory!”', color: 'from-red-600 to-red-800' },
    { id: 9, title: 'Submission ', date: 'October 12, 2025', time: '15:00 IST', status: 'upcoming', icon: Send, details: 'Send in your project and claim your hard-earned points!', color: 'from-orange-600 to-orange-800' },
    { id: 10, title: 'Results & Networking', date: 'October 12, 2025', time: '15:00 - 16:00 IST', status: 'upcoming', icon: Trophy, details: 'Winner announcement and networking with sponsors.', color: 'from-pink-600 to-pink-800' }
  ];

  const toggleCard = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from('.timeline-title', { scrollTrigger: { trigger: '.timeline-title', start: 'top 80%', }, opacity: 0, scale: 0.5, duration: 1, ease: 'back.out(1.7)' });
        gsap.from('.timeline-card', { scrollTrigger: { trigger: '.timeline-container', start: 'top 80%', }, opacity: 0, y: 100, stagger: 0.15, duration: 0.8, ease: 'power3.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  
  const getStatusBadge = (status) => {
    const styles = { completed: 'bg-green-500/20 text-green-400 border-green-500/50', active: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50 animate-pulse', upcoming: 'bg-gray-500/20 text-gray-400 border-gray-500/50' };
    return styles[status];
  };

  return (
    <section id="timeline" ref={sectionRef} className="relative py-20 bg-gradient-to-b from-black via-red-950/10 to-black overflow-hidden">
        {/* ... your background images and titles remain unchanged */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-0 w-full h-full pointer-events-none select-none">
            <img src={strange} alt="Doctor Strange Hero" className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] max-w-none opacity-35 md:opacity-45 object-contain" style={{ filter: 'brightness(1.35) drop-shadow(0 0 40px #dc2626)', minWidth: '320px' }}/>
        </div>
        <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(220,38,38,0.5) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="timeline-title text-5xl md:text-7xl font-black text-center mb-4" style={{ fontFamily: '"Bebas Neue", sans-serif', textShadow: '0 0 20px rgba(220,38,38,0.8)', background: 'linear-gradient(to right, #dc2626, #fff, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                MISSION TIMELINE
            </h2>
            <p className="text-center text-gray-400 mb-16 text-lg">
                Click on any card to reveal mission details
            </p>

            <div className="timeline-container relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-600 via-red-500 to-red-600 hidden md:block" style={{ boxShadow: '0 0 20px rgba(220,38,38,0.6)' }}></div>
                <div className="space-y-12">
                    {phases.map((phase, index) => {
                        const Icon = phase.icon;
                        const isFlipped = flippedCards[phase.id];
                        const isLeft = index % 2 === 0;

                        return (
                            <div key={phase.id} className={`timeline-card relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <div onClick={() => toggleCard(phase.id)} className="relative cursor-pointer group" style={{ perspective: '1000px' }}>
                                        <div className="relative transition-transform duration-700 transform-style-3d" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                                            {/* Front of the card */}
                                            <div className="bg-gradient-to-br from-black/80 to-red-950/30 backdrop-blur-sm border-2 border-red-900/50 rounded-lg p-6 shadow-lg group-hover:border-red-500/70 transition-all duration-300" style={{ backfaceVisibility: 'hidden', boxShadow: '0 0 30px rgba(220,38,38,0.2)', }}>
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-3 bg-gradient-to-br ${phase.color} rounded-lg`}><Icon className="w-6 h-6 text-white" /></div>
                                                        <div>
                                                            <h3 className="text-xl font-black text-white uppercase tracking-wider">{phase.title}</h3>
                                                            <p className="text-sm text-gray-400 mt-1">{phase.date}</p>
                                                        </div>
                                                    </div>
                                                    {/* The only change is here: wrap the span in a condition */}
                                                    {phase.status !== 'upcoming' && (
                                                      <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${getStatusBadge(phase.status)}`}>
                                                        {phase.status}
                                                      </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-red-400 mb-4">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="text-sm font-semibold">{phase.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-300 leading-relaxed">Click to reveal details</p>
                                            </div>

                                            {/* Back of the card (flipped state) */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-red-950/80 to-black/80 backdrop-blur-sm border-2 border-red-500 rounded-lg p-6 shadow-lg" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', boxShadow: '0 0 40px rgba(220,38,38,0.4)', }}>
                                                <img
                                                    src={grootBadge}
                                                    alt="Groot Badge"
                                                    className="absolute top-4 right-4 w-12 h-12 object-contain z-20 animate-pulse"
                                                    style={{ filter: 'brightness(1.3) drop-shadow(0 0 4px #ef4444)' }}
                                                />
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className={`p-3 bg-gradient-to-br ${phase.color} rounded-lg`}><Icon className="w-6 h-6 text-white" /></div>
                                                    <h3 className="text-xl font-black text-white uppercase">Mission Brief</h3>
                                                </div>
                                                <p className="text-white text-base leading-relaxed mb-4">{phase.details}</p>
                                                <div className="flex items-center justify-between pt-4 border-t border-red-500/30">
                                                    <span className="text-sm text-red-400 font-semibold">{phase.date}</span>
                                                    <span className="text-sm text-red-400 font-semibold">{phase.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 items-center justify-center">
                                    <div className="w-12 h-12 bg-black rounded-full border-4 border-red-600 flex items-center justify-center" style={{ boxShadow: '0 0 20px rgba(220,38,38,0.8)' }}>
                                        <img 
                                            src={blackPanther} 
                                            alt="Timeline Event Icon" 
                                            className="w-full h-full object-cover rounded-full" 
                                        />
                                    </div>
                                </div>
                                <div className="hidden md:block w-5/12"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </section>
  );
};

export default TimelineSection;