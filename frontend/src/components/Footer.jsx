import { useState, useEffect } from 'react';
import { Shield, Mail, MapPin, Phone, Twitter, Linkedin, Instagram, ExternalLink, MessageCircle } from 'lucide-react';
import spideyswing from '../assets/spideyswing.png';

const Footer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('2025-10-11T00:00:00');
      const difference = eventDate - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer id="footer" className="relative bg-black border-t-2 border-red-900/50 overflow-hidden">
      {/* Background hero image */}
      <div className="absolute left-0 bottom-0 z-0 w-full h-full pointer-events-none select-none">
        <img
          src={spideyswing}
          alt="Spidey Swing Hero"
          className="absolute left-0 bottom-0 w-[350px] max-w-none opacity-40 md:opacity-50 object-contain"
          style={{ filter: 'brightness(2.1) drop-shadow(0 0 80px #dc2626)', minWidth: '180px' }}
        />
      </div>

      <div className="absolute inset-0">
        <div className="starfield"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/5 to-black"></div>
      </div>
      <div className="absolute bottom-0 right-0 opacity-5">
        <Shield className="w-96 h-96 text-red-500" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: About */}
          <div>
            <h3
              className="text-3xl font-black mb-4"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                textShadow: '0 0 15px rgba(220,38,38,0.8)',
                background: 'linear-gradient(to right, #dc2626, #fff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              INNOVERGENCE XXV
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              A 24-hour innovation battleground where heroes unite to build the future. Join us for an epic journey of coding, collaboration, and creation.
            </p>
          </div>
          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xl font-black text-white uppercase mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              Mission Navigation
            </h4>
            <ul className="space-y-2">
              {['About', 'Timeline', 'Prizes', 'Sponsors', 'FAQ', 'Register'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">▸</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div>
            <h4 className="text-xl font-black text-white uppercase mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-500" />
              Mission Control
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3 hover:text-red-400 transition-colors cursor-pointer">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">mlsckare@klu.ac.in</span>
              </li>
              <li className="flex items-start gap-3 hover:text-red-400 transition-colors cursor-pointer">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">+91 9962581115</span>
              </li>
              <li className="flex items-start gap-3 hover:text-red-400 transition-colors cursor-pointer">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">KARE Campus, Tamil Nadu, India</span>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-xs text-gray-500 uppercase font-bold mb-3">Follow The Mission</p>
              <div className="flex gap-3">
                {/* X / Twitter */}
                <a
                  href="https://x.com/mlsckare"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-10 h-10 bg-red-950/30 border border-red-900/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 hover:bg-red-950/50 transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/mlsckare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 bg-red-950/30 border border-red-900/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 hover:bg-red-950/50 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                {/* Instagram */}
                <a
                  href="https://chat.google.com/dm/gaVe_cAAAAE/3QcWT6fQI58/3QcWT6fQI58?cls=10"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 bg-red-950/30 border border-red-900/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 hover:bg-red-950/50 transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                {/* WhatsApp (custom SVG) */}
                <a
                  href="https://wa.me/919962581115"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 bg-red-950/30 border border-red-900/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 hover:bg-red-950/50 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.52 3.48A11.81 11.81 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.09 1.52 5.82L0 24l6.34-1.6A11.88 11.88 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.23-6.21-3.48-8.52zm-8.5 16.25c-1.77 0-3.52-.48-5.05-1.38l-.36-.21-3.78.95.99-3.68-.24-.38A9.91 9.91 0 0 1 2 12c0-5.52 4.48-10 10-10 2.66 0 5.15 1.04 7.01 2.93A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.45-7.91c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.18.2-.36.22-.66.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.18 0-.38 0-.58 0s-.52.07-.8.37c-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.1 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Column 4: Partners */}
          <div>
            <h4 className="text-xl font-black text-white uppercase mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              Allied Forces
            </h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <div>
                <p className="text-red-400 font-bold mb-1">Title Partners</p>
                <p>Space Zee Tech Chennai</p>
                <p>K7 Computing</p>
                <p>UNLOX</p>
              </div>
              <div>
                <p className="text-red-400 font-bold mb-1">Host & Tech</p>
                <p>KARE</p>
                <p>Microsoft Learn</p>
              </div>
              <div>
                <p className="text-red-400 font-bold mb-1">Community</p>
                <p>MLSC KARE</p>
                <p>Tech Community</p>
              </div>
            </div>
          </div>
        </div>
        {/* Production Credits */}
        <div className="border-t border-red-900/30 pt-8">
          <div className="bg-gradient-to-r from-red-950/20 via-red-900/10 to-red-950/20 border border-red-900/30 rounded-lg p-6 mb-8">
            <h4 className="text-lg font-black text-white uppercase mb-4 text-center">
              Production Credits
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-center text-sm text-gray-400">
              <div>
                <p className="text-red-400 font-bold mb-1">Organized By</p>
                <p>Microsoft Learn Student Chapter</p>
                <p>KARE</p>
              </div>
              <div>
                <p className="text-red-400 font-bold mb-1">Powered By</p>
                <p>Space Zee Tech & K7 Computing</p>
                <p>Microsoft Learn</p>
              </div>
              <div>
                <p className="text-red-400 font-bold mb-1">Supported By</p>
                <p>Tech Community</p>
                <p>Industry Partners</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              &copy; 2025 INNOVERGENCE XXV. All rights reserved.
              <span className="text-red-500 ml-2">MLSC KARE</span>
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-red-500 transition-colors flex items-center gap-1">
                Privacy Policy <ExternalLink className="w-3 h-3" />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors flex items-center gap-1">
                Terms of Service <ExternalLink className="w-3 h-3" />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors flex items-center gap-1">
                Code of Conduct <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .starfield {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 20px 30px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 60px 70px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 50px 50px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 80px, white, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.3;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </footer>
  );
};
export default Footer;