import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Mail, MessageCircle } from 'lucide-react';
import thanos from '../assets/thanos.png';

gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      emoji: '👥',
      question: 'Who can participate in INNOVERGENCE XXV?',
      answer: 'All students from any college or university are welcome! Form a team of 5 members and choose your domain. Each team must have a designated leader who will handle registrations and communications.',
      position: 'left'
    },
    {
      emoji: '🎯',
      question: 'How do domain selections work?',
      answer: 'Choose from 6 battlefields: Web Development, App Development, AI/ML, Gen AI, Agentic AI, Blockchain. Pick the domain that aligns with your team\'s expertise and passion. Problem statements will be domain-specific.',
      position: 'right'
    },
    {
      emoji: '⏰',
      question: 'What are the important dates?',
      answer: 'Registration opens September 28 and closes October 5, 2025 at 11:59 PM. The 24-hour hackathon runs from October 11 (3:00 PM) to October 12 (3:00 PM), with judging and awards on October 12 afternoon.',
      position: 'left'
    },
    {
      emoji: '🏆',
      question: 'What prizes can we win?',
      answer: '1st Place: ₹10,000 , 2nd Place: ₹7,000 and 3rd Place: ₹5,000 .Top performance will get Internship Offers Plus special awards for innovation, teamwork, technical excellence, and people\'s choice!',
      position: 'right'
    },
    {
      emoji: '💻',
      question: 'What equipment should we bring?',
      answer: 'Bring your laptops, chargers, and any specific hardware you need. WiFi, power outlets, and workspace will be provided. We recommend backup batteries and essential development tools pre-installed.',
      position: 'left'
    },
    {
      emoji: '🧠',
      question: 'Will mentorship be available?',
      answer: 'Absolutely! Industry experts and technical mentors as well as our volunteers will be available 24/7 throughout the hackathon. Get guidance on technical challenges, domain expertise, and presentation skills.',
      position: 'right'
    },
    {
      emoji: '🚀',
      question: 'What happens during the 24 hours?',
      answer: 'After problem statement reveal at 3:00 PM, you have 24 hours to ideate, develop, and deploy your solution. There are 4 checkpoints for mentor feedback. Submit by 3:00 PM next day[October 12], followed by presentations and judging.',
      position: 'left'
    },
    {
      emoji: '⚖️',
      question: 'How will projects be judged?',
      answer: 'Judging criteria include: Innovation & creativity (30%), Technical implementation (30%), Real-world impact (20%), Presentation quality (10%), and Team collaboration (10%) as well as originality of the code.',
      position: 'right'
    },
    {
      emoji: '🌟',
      question: 'Is this beginner-friendly?',
      answer: 'No! No experience? No problem. We have mentors as well as volunteers to guide you. Just bring your ideas and a desire to learn!',
      position: 'left'
    }
  ];

  const tips = [
    'Start planning your project idea before the event',
    'Practice your pitch - you\'ll have limited time to impress judges',
    'Bring comfortable clothes and personal essentials for 24 hours',
    'Network with other teams during breaks'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-title', {
        scrollTrigger: {
          trigger: '.faq-title',
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: 'back.out(1.7)'
      });

      gsap.from('.faq-bubble', {
        scrollTrigger: {
          trigger: '.faq-container',
          start: 'top 80%',
        },
        opacity: 0,
        x: (index) => index % 2 === 0 ? -100 : 100,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="relative py-20 bg-gradient-to-b from-black via-red-950/10 to-black overflow-hidden">
      {/* Background hero image for FAQ section */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 w-full h-full pointer-events-none select-none">
        <img
          src={thanos}
          alt="Thanos Hero"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[800px] max-w-none opacity-40 md:opacity-50 object-contain"
          style={{ filter: 'brightness(2.1) drop-shadow(0 0 180px #dc2626)', minWidth: '480px' }}
        />
      </div>
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(220,38,38,0.5) 1px, transparent 0)',
          backgroundSize: '30px 30px'
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="faq-title text-5xl md:text-7xl font-black text-center mb-4"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            textShadow: '0 0 20px rgba(220,38,38,0.8)',
            background: 'linear-gradient(to right, #dc2626, #fff, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          MISSION INTEL
        </h2>

        <p className="text-center text-gray-400 mb-16 text-lg">
          Everything you need to know about your mission
        </p>

        <div className="faq-container space-y-6 mb-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const isLeft = faq.position === 'left';

            return (
              <div
                key={index}
                className={`faq-bubble flex ${isLeft ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`relative max-w-2xl w-full group cursor-pointer ${isLeft ? 'mr-auto' : 'ml-auto'}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <div
                    className={`bg-gradient-to-br from-red-950/30 to-black/50 backdrop-blur-sm border-2 ${isOpen ? 'border-red-500' : 'border-red-900/50'} rounded-2xl p-6 transition-all duration-300 hover:border-red-500/70 relative`}
                    style={{
                      boxShadow: isOpen ? '0 0 30px rgba(220,38,38,0.4)' : '0 0 10px rgba(220,38,38,0.1)',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-2xl border-2 border-red-500/50">
                          {faq.emoji}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-lg font-black text-white uppercase tracking-wide leading-tight">
                            {faq.question}
                          </h3>
                          <ChevronDown
                            className={`w-6 h-6 text-red-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </div>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
                        >
                          <p className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`absolute ${isLeft ? '-right-3' : '-left-3'} top-8 w-6 h-6 bg-gradient-to-br from-red-950/30 to-black/50 border-2 ${isOpen ? 'border-red-500' : 'border-red-900/50'} transform rotate-45`}
                      style={{
                        clipPath: isLeft
                          ? 'polygon(0 0, 100% 0, 100% 100%)'
                          : 'polygon(0 0, 0 100%, 100% 100%)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-red-950/30 to-black/50 backdrop-blur-sm border-2 border-red-900/50 rounded-lg p-8"
            style={{ boxShadow: '0 0 30px rgba(220,38,38,0.2)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-black text-white uppercase">Still Need Help?</h3>
            </div>

            <p className="text-gray-300 mb-6">
              Our mission control team is ready to assist you with any questions or concerns.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:mlsckare@klu.ac.in"
                className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="font-semibold">mlsckare@klu.ac.in</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">+91 98765 43210</span>
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-950/30 to-black/50 backdrop-blur-sm border-2 border-red-900/50 rounded-lg p-8"
            style={{ boxShadow: '0 0 30px rgba(220,38,38,0.2)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-black text-white uppercase">Quick Mission Tips</h3>
            </div>

            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-500 font-black mt-1">▸</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
