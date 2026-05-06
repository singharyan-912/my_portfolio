import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = ["Home", "About", "Skills", "Projects", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold font-['Space_Grotesk'] text-primary">
          AS<span className="text-foreground">.</span>
        </span>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                active === item ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <a
          href="#contact"
          onClick={() => scrollTo("Contact")}
          className="hidden md:inline-flex px-5 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
