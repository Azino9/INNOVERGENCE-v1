import { useEffect, useRef } from 'react';
import capuh from '../assets/capuh.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Users, Trophy, Calendar, Zap } from 'lucide-react';

// Import hover images
import hulk from '../assets/download.jpeg';
import doctor from '../assets/doctor.jpg';
import volverin from '../assets/volverine.jpeg';
import spider from '../assets/spider.jpeg';
import arc from '../assets/arcreator.jpeg';
import loki from '../assets/Loki.jpg';
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const domains = [
    { icon: Shield, title: 'WEB DEVELOPEMENT', color: 'from-red-600 to-red-800', description: 'Defend the digital realm. Build security solutions and penetration testing tools.', hoverImage: loki },
    { icon: Zap, title: 'APP DEVELOPMENT', color: 'from-blue-600 to-blue-800', description: 'Harness the power of intelligence. Create smart systems and predictive models.', hoverImage: spider },
    { icon: Shield, title: 'BLOCKCHAIN', color: 'from-purple-600 to-purple-800', description: 'Forge the future of trust. Develop decentralized applications and smart contracts.', hoverImage: hulk },
    { icon: Zap, title: 'GEN AI', color: 'from-cyan-600 to-cyan-800', description: 'Command infinite resources. Build scalable cloud-native applications.', hoverImage: arc },
    { icon: Shield, title: 'AI/ML', color: 'from-green-600 to-green-800', description: 'Create invulnerable software. Develop applications with a security-first approach.', hoverImage: doctor },
    { icon: Shield, title: 'AGENTIC AI', color: 'from-green-600 to-green-800', description: 'Create invulnerable software. Develop applications with a security-first approach.', hoverImage: volverin },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from('.about-title', {
        scrollTrigger: { trigger: '.about-title', start: 'top 80%' },
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out',
      });

      // Animate about content
      gsap.from('.about-content', {
        scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Animate Battlefield title
      gsap.from('.battlefield-title', {
        scrollTrigger: { trigger: '.battlefield-title', start: 'top 85%' },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Animate each domain card
      gsap.utils.toArray('.domain-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: 'power2.out',
          delay: i * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-20 bg-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220,38,38,0.1) 2px, rgba(220,38,38,0.1) 4px)',
          }}
        ></div>
      </div>

      {/* Content */}
      {/* Background hero image for About section */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 w-full h-full pointer-events-none select-none">
        <img
          src={capuh}
          alt="Captain America Hero"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] max-w-none opacity-30 md:opacity-40 object-contain"
          style={{ filter: 'brightness(1.35) drop-shadow(0 0 40px #2563eb)', minWidth: '320px' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2
          className="about-title text-5xl md:text-7xl font-black text-center mb-16"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            textShadow: '0 0 20px rgba(220,38,38,0.8)',
            background: 'linear-gradient(to right, #dc2626, #fff, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          MISSION BRIEFING
        </h2>

        {/* About Description (added class for GSAP) */}
        <div className="about-content text-gray-300 text-center max-w-3xl mx-auto mb-20 leading-relaxed">
          <p>
            Welcome to the ultimate innovation arena where code meets creativity.
            Each domain below represents a different battlefield where your skills, logic,
            and imagination will be tested to the fullest. Choose your path wisely.
          </p>
        </div>

        {/* Battlefield Title */}
        <div className="mb-12 md:mb-16">
          <h3
            className="battlefield-title text-4xl md:text-5xl font-black text-center text-white uppercase"
            style={{
              textShadow: '0 0 15px rgba(220,38,38,0.8), 0 0 25px rgba(220,38,38,0.6)',
            }}
          >
            Choose Your Battlefield
          </h3>
        </div>

        {/* Domain Cards */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center"
        >
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <div
                key={index}
                className="domain-card group relative bg-black/50 border-2 border-red-900/50 rounded-lg overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 w-full max-w-xs min-h-[300px]"
                style={{
                  boxShadow:
                    '0 0 30px rgba(220,38,38,0.2), inset 0 0 10px rgba(0,0,0,0.5)',
                }}
              >
                {/* Hover image */}
                {domain.hoverImage && (
                  <img
                    src={domain.hoverImage}
                    alt={domain.title}
                    className={`absolute w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 object-contain ${
                      domain.title === 'AI/ML'
                        ? 'object-[50%_50%] scale-[1.45]'
                        : domain.title === 'GEN AI'
                        ? 'object-[50%_50%] scale-[1.85]'
                        : domain.title === 'AGENTIC AI'
                        ? 'object-[50%_50%] scale-125'
                        : domain.title === 'WEB DEVELOPEMENT'
                        ? 'object-[50%_5%] scale-120'
                        : domain.title === 'APP DEVELOPMENT'
                        ? 'object-[50%_-5%] scale-[1.6]'
                        : 'object-bottom'
                    }`}
                  />
                )}

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full group-hover:translate-y-12 transition-transform duration-300">
                  <div className="mb-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
                    <h4 className="text-lg font-black text-center text-white uppercase tracking-wider">
                      {domain.title}
                    </h4>
                  </div>

                  <div className="p-2 rounded transition-colors duration-300 group-hover:bg-black/80">
                    <p className="text-sm text-gray-400 text-center leading-relaxed">
                      {domain.description}
                    </p>
                  </div>
                </div>

                {/* Hover Border Overlay */}
                <div className="absolute inset-0 border-2 border-red-900/100 group-hover:border-red-800/50 rounded-lg pointer-events-none transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
