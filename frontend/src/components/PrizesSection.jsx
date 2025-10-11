import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, Star, Heart } from 'lucide-react';
import CardSwap, { Card } from './CardSwap';
import bg1 from '../assets/infinity.jpeg'
import bg2 from '../assets/Mjolnir tattoo.jpeg'
import bg3 from '../assets/Capitán América.jpeg'
import loki from '../assets/loki.png';
gsap.registerPlugin(ScrollTrigger);

const PrizesSection = () => {
  const sectionRef = useRef(null);

  const prizes = [
    {
      place: '1st Place',
      artifact: 'Infinity Gauntlet',
      prize: '₹10,000',
      internship: 'Internship Opportunity',
      bgImage: bg1,
      glow: 'rgba(234, 179, 8, 0.6)',
      icon: '🥇',
      rank: 1
    },
    {
      place: '2nd Place',
      artifact: 'Mjolnir',
      prize: '₹7,000',
      internship: 'Internship Opportunity',
      bgImage: bg2,
      glow: 'rgba(156, 163, 175, 0.6)',
      icon: '🥈',
      rank: 2
    },
    {
      place: '3rd Place',
      artifact: "Captain's Shield",
      prize: '₹5,000',
      internship: 'Internship Opportunity',
      bgImage: bg3,
      glow: 'rgba(234, 88, 12, 0.6)',
      icon: '🥉',
      rank: 3
    }
  ];

  const specialAwards = [
    {
      title: "Innovation Reactor",
      icon: Star,
      description: "For the team that brings Arc Reactor-level innovation to the battlefield",
      reward: "Certificate + Exclusive Goodies + Internship Opportunity",
      color: 'from-slate-900 via-slate-800 to-slate-900',
      badge: "GENIUS AWARD"
    },
    {
      title: "Avengers Assemble",
      icon: Heart,
      description: "Ultimate team synergy that rivals the greatest superhero alliance",
      reward: "Team Certificates + Premium Merchandise",
      color: 'from-zinc-900 via-neutral-800 to-zinc-900',
      badge: "UNITY POWER"
    },
    {
      title: "Code Infinity",
      icon: Award,
      description: "Wielding the power of flawless code like the Infinity Stones",
      reward: "Excellence Certificate + Tech Goodies + Mentorship",
      color: 'from-stone-900 via-gray-800 to-stone-900',
      badge: "TECH MASTERY"
    },
    {
      title: "Hero's Choice",
      icon: Trophy,
      description: "The project that captures the hearts of every hero in the arena",
      reward: "Champion Trophy + Special Recognition + Goodies",
      color: 'from-neutral-900 via-slate-800 to-neutral-900',
      badge: "FAN FAVORITE"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.prizes-title', {
        scrollTrigger: {
          trigger: '.prizes-title',
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: 'back.out(1.7)'
      });

      gsap.from('.prize-card', {
        scrollTrigger: {
          trigger: '.prizes-container',
          start: 'top 80%',
        },
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.special-award', {
        scrollTrigger: {
          trigger: '.special-awards',
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="prizes"
      ref={sectionRef}
      className="relative py-20 min-h-screen bg-black overflow-hidden"
    >
      {/* Background hero image for Prizes section */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 w-full h-full pointer-events-none select-none">
        <img
          src={loki}
          alt="Loki Hero"
          className="absolute -left-32 top-[30%] -translate-y-1/2 w-[600px] max-w-none opacity-70 md:opacity-80 object-contain"
          style={{ filter: 'brightness(2.1) drop-shadow(0 0 80px #a3e635)', minWidth: '320px' }}
        />
      </div>
      {/* Existing background overlay */}
      {/* Background hero image for Prizes section */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 w-full h-full pointer-events-none select-none">
        <img
          src={loki}
          alt="Loki Hero"
          className="absolute -left-32 top-[30%] -translate-y-1/2 w-[600px] max-w-none opacity-70 md:opacity-80 object-contain"
          style={{ filter: 'brightness(2.1) drop-shadow(0 0 80px #a3e635)', minWidth: '320px' }}
        />
      </div>
      {/* Existing background overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="prizes-title text-5xl md:text-7xl font-black text-center mb-4"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            textShadow: '0 0 20px rgba(220,38,38,0.8)',
            background: 'linear-gradient(to right, #dc2626, #fff, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          LEGENDARY ARTIFACTS
        </h2>

        <p className="text-center text-gray-400 mb-4 text-lg">
          Claim the rewards worthy of heroes
        </p>

        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-red-900/50 to-yellow-900/50 backdrop-blur-sm border-2 border-red-500/50 rounded-full px-8 py-3 shadow-lg shadow-red-500/30">
            <span className="text-yellow-400 font-black text-2xl tracking-wider">
              ₹22K Prize Pool
            </span>
          </div>
        </div>

        {/* Prizes */}
        <div className="prizes-container grid md:grid-cols-3 gap-8 mb-20">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="prize-card group relative h-96 w-full flex flex-col justify-center items-center"
            >
              <div
                className={`relative rounded-lg p-8 transform hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden h-full w-full flex flex-col justify-center`}
                style={{
                  boxShadow: `0 0 40px ${prize.glow}, 0 20px 60px rgba(0,0,0,0.8)`,
                  minHeight: '24rem',
                  minWidth: '100%',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  backgroundImage: `url(${prize.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Overlay for better image visibility and text contrast */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'rgba(0,0,0,0.45)',
                    zIndex: 2,
                  }}
                ></div>
                <div className="absolute top-0 right-0 text-9xl opacity-10 font-black" style={{zIndex: 3}}>
                  {prize.icon}
                </div>

                <div className="relative z-10" style={{zIndex: 4}}>
                  <div className="text-center mb-6">
                    <div className="inline-block px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full mb-4">
                      <span className="text-white font-black text-sm uppercase tracking-wider">
                        {prize.place}
                      </span>
                    </div>

                    <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-wider">
                      {prize.artifact}
                    </h3>
                  </div>

                  <div className="space-y-4 text-center">
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border-2 border-white/20">
                      <p className="text-sm text-white/80 font-semibold uppercase mb-2">
                        Cash Prize
                      </p>
                      <p className="text-4xl font-black text-white">
                        {prize.prize}
                      </p>
                    </div>

                    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border-2 border-white/20">
                      <p className="text-sm text-white/80 font-semibold uppercase mb-2">
                        Internship
                      </p>
                      <p className="text-lg font-black text-white leading-tight">
                        {prize.internship}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
                    zIndex: 5,
                  }}
                ></div>
              </div>

              {prize.rank === 1 && (
                <div
                  className="absolute -top-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full font-black text-sm uppercase transform rotate-12"
                  style={{ boxShadow: '0 0 20px rgba(220,38,38,0.8)', zIndex: 10 }}
                >
                  Winner!
                </div>
              )}
              {prize.rank === 2 && (
                <div
                  className="absolute -top-4 -right-4 bg-gray-600 text-white px-4 py-2 rounded-full font-black text-sm uppercase transform rotate-12"
                  style={{ boxShadow: '0 0 20px rgba(156,163,175,0.8)', zIndex: 10 }}
                >
                  Runner Up
                </div>
              )}
              {prize.rank === 3 && (
                <div
                  className="absolute -top-4 -right-4 bg-orange-600 text-white px-4 py-2 rounded-full font-black text-sm uppercase transform rotate-12"
                  style={{ boxShadow: '0 0 20px rgba(234,88,12,0.8)', zIndex: 10 }}
                >
                  2nd Runner Up
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Special Awards */}
        <div className="special-awards">
          <h3
            className="text-3xl md:text-4xl font-black text-center mb-12 text-white uppercase"
            style={{ textShadow: '0 0 15px rgba(220,38,38,0.6)' }}
          >
            Special Recognition Awards
          </h3>

          {/* Split Layout: Description Left, Cards Right */}
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Side: Description */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h4 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight" style={{ fontFamily: 'Bangers, sans-serif' }}>
                  Special Hero Awards
                </h4>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Stand out from the crowd! These legendary awards recognize teams who demonstrate extraordinary prowess in specific areas of excellence.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4 text-gray-200 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600/80 to-red-700/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-red-500/30 border border-red-500/20">
                    <svg className="w-6 h-6 text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-black text-lg block mb-1 text-red-400">Innovation Reactor</span>
                    <span className="text-gray-400 text-sm">Tony Stark-level genius innovation & creativity</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-200 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600/80 to-red-700/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-red-500/30 border border-red-500/20">
                    <svg className="w-6 h-6 text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-black text-lg block mb-1 text-red-400">Avengers Assemble</span>
                    <span className="text-gray-400 text-sm">Unstoppable teamwork & perfect coordination</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-200 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600/80 to-red-700/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-red-500/30 border border-red-500/20">
                    <svg className="w-6 h-6 text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-black text-lg block mb-1 text-red-400">Code Infinity</span>
                    <span className="text-gray-400 text-sm">Infinity Stone-powered technical excellence</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-200 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600/80 to-red-700/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-red-500/30 border border-red-500/20">
                    <svg className="w-6 h-6 text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-black text-lg block mb-1 text-red-400">Hero's Choice</span>
                    <span className="text-gray-400 text-sm">The people's champion - voted by the community</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-red-900/30">
                <p className="text-gray-400 text-sm italic">
                  ⚡ <span className="font-semibold text-yellow-400">Win Multiple Awards:</span> Each team can claim multiple special awards on top of the main prizes!
                </p>
              </div>
            </div>

            {/* Right Side: CardSwap */}
            <div className="relative h-[600px]">
              <CardSwap
                width={350}
                height={450}
                cardDistance={60}
                verticalDistance={70}
                delay={4000}
                pauseOnHover={true}
                easing="elastic"
              >
                {specialAwards.map((award, index) => {
                  const Icon = award.icon;
                  return (
                    <Card 
                      key={index}
                      className={`bg-gradient-to-br ${award.color} backdrop-blur-md border-2 border-white/40 shadow-2xl overflow-hidden`}
                      style={{
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(220,38,38,0.3)'
                      }}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
                        {/* Diagonal Pattern Background */}
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                        }}></div>

                        {/* Large Number in Background with Comic Style */}
                        <div 
                          className="absolute top-6 right-6 text-9xl font-black text-white/20"
                          style={{ fontFamily: 'Bangers, sans-serif' }}
                        >
                          {index + 1}
                        </div>

                        {/* Top Corner Badge */}
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-yellow-400/60 shadow-lg">
                          <span className="text-yellow-300 text-xs font-black uppercase tracking-widest">
                            {award.badge}
                          </span>
                        </div>

                        {/* Icon with Glow Effect */}
                        <div className="mb-6 p-6 bg-white/30 rounded-full backdrop-blur-sm relative">
                          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                          <Icon className="w-16 h-16 text-white relative z-10" strokeWidth={2.5} />
                        </div>

                        {/* Title with Comic Font */}
                        <h4 
                          className="text-3xl font-black text-white text-center mb-3 uppercase leading-tight relative z-10"
                          style={{ 
                            fontFamily: 'Bangers, sans-serif',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.3)'
                          }}
                        >
                          {award.title}
                        </h4>

                        {/* Decorative Line */}
                        <div className="w-24 h-1 bg-white/40 rounded-full mb-4"></div>

                        {/* Description */}
                        <p className="text-white/95 text-center text-base mb-6 font-semibold leading-relaxed px-2">
                          {award.description}
                        </p>

                        {/* Reward Badge with Enhanced Styling */}
                        <div className="mt-auto relative">
                          <div className="absolute inset-0 bg-yellow-400/30 blur-lg rounded-full"></div>
                          <div className="relative bg-gradient-to-r from-yellow-400/30 to-yellow-500/30 backdrop-blur-sm border-2 border-yellow-400/60 rounded-full px-6 py-3 shadow-lg">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-yellow-200 font-black text-sm uppercase tracking-wider">
                                {award.reward}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 border-white/20 rounded-bl-lg"></div>
                        <div className="absolute top-0 right-0 w-20 h-20 border-r-4 border-t-4 border-white/20 rounded-tr-lg"></div>
                      </div>
                    </Card>
                  );
                })}
              </CardSwap>
            </div>
          </div>
        </div>

        {/* 👇 ADD YOUR EXTRA SECTION BELOW HERE */}
        <div className="mt-20 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Bonus Rewards</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Additional surprises await! Stay tuned for mystery giveaways and exclusive sponsor perks.
          </p>
        </div>

      </div>
    </section>
  );
};

export default PrizesSection;