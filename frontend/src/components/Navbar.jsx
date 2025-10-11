import { useState, useEffect, useContext } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --------------------------
  // Navigation Links
  // --------------------------
  const guestLinks = [
    { name: "About", href: "#about" },
    { name: "Timeline", href: "#timeline" },
    { name: "Prizes", href: "#prizes" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "FAQ", href: "#faq" },
    { name: "Assemble Your Team", href: "/login" },
  ];

  const authLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "About", href: "#about" },
    { name: "Timeline", href: "#timeline" },
    { name: "Prizes", href: "#prizes" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "FAQ", href: "#faq" },
    { name: "Logout", href: "/login" },
  ];

  const navLinks = user ? authLinks : guestLinks;

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-lg ${
        scrolled
          ? "bg-black/30 border-b border-white/10 shadow-[0_0_30px_rgba(220,38,38,0.3)]"
          : "bg-black/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              className="text-3xl font-black tracking-wider"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                textShadow:
                  "0 0 20px rgba(220,38,38,0.8), 0 0 40px rgba(220,38,38,0.4)",
                background:
                  "linear-gradient(to right, #dc2626, #ef4444, #dc2626)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              INNOVERGENCE XXV
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) =>
                link.name === "Logout" ? (
                  <button
                    key={link.name}
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-400 rounded-lg 
                    hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(255,0,0,0.4)] hover:shadow-[0_0_25px_rgba(255,0,0,0.8)]"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                ) : link.name === "Assemble Your Team" ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold rounded-lg 
                      shadow-[0_0_15px_rgba(220,38,38,0.6)] hover:shadow-[0_0_25px_rgba(220,38,38,1)] 
                      hover:scale-105 transition-all duration-300 uppercase tracking-wider"
                  >
                    {link.name}
                  </a>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-300 hover:text-red-500 px-3 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-110"
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-red-500 transition-colors"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-red-900/50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) =>
              link.name === "Logout" ? (
                <button
                  key={link.name}
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full px-3 py-2 border-2 border-red-600 text-red-400 rounded-md text-center 
                    hover:bg-red-600 hover:text-white font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.4)]"
                >
                  <LogOut className="inline mr-1" size={16} /> Logout
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 font-bold uppercase tracking-wider transition-all duration-300 ${
                    link.name === "Assemble Your Team"
                      ? "bg-red-700 text-white rounded-md hover:bg-red-600 text-center"
                      : "text-gray-300 hover:text-red-500"
                  }`}
                >
                  {link.name}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;