import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useInView, color } from "framer-motion";
import { FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';
import { RiPhpFill,RiJavaFill } from "react-icons/ri";
import { SiMysql,SiPostgresql,SiCypress } from "react-icons/si";
import dehemi from "./image/dehemi.png";
import Account from "./image/Account.png";
import voucher from "./image/voucher.png";
import ordergrn from "./image/ordergrn.png";
import orderdashboard from "./image/orderdashboard.png";
import templete from "./image/templete.png";
import tableconfig from "./image/tableconfig.png";
import normgroup from "./image/normgroup.png";
import category from "./image/category.jpeg";
import login from "./image/login.jpeg";
import resister from "./image/register.jpeg";
import addtocart from "./image/addtocart.jpeg";
import productlist from "./image/productlist.jpeg";
import checkout from "./image/checkout.jpeg";
import mine from "./image/mine.png";

// ─── Data ────────────────────────────────────────────────────────────────────
const ROLES = ["Full Stack Software Engineer", "Backend Developer"];

const NAV_LINKS = ["About", "Experience", "Projects", "Stack", "Contact"];

const TECH_STACK = [
  {
    category: "Languages",
    skills: [
      { label: "TypeScript", icon: "TS", color: "#3178c6" },
      { label: "JavaScript ES6+", icon: "JS", color: "#f7df1e" },
      { label: "Java", icon: <RiJavaFill />, color: "#f89820" },
      { label: "PHP", icon: <RiPhpFill />, color: "#777bb4" },
    ],
  },
  {
    category: "Frontend & UI",
    skills: [
      { label: "React.js", icon: "⚛", color: "#61dafb" },
      { label: "Tailwind CSS", icon: "≈", color: "#38bdf8" },
     
    ],
  },
  {
    category: "Backend & Databases",
    skills: [
      { label: "Node.js", icon: "⬡", color: "#68a063" },
      { label: "Express", icon: "⚡", color: "#ffffff" },
      { label: "PostgreSQL", icon: <SiPostgresql />, color: "#4169e1" },
      {label:"mySQL",icon:<SiMysql />, color:"#4479a1" },
      {label: "SQL", icon: "🗄️", color: "#e38c00" },
    ],

  },
  {
    category: "Testing & Tools",
    skills: [
      { label: "Cypress", icon: <SiCypress />, color: "#04b575" },
   { label:"GitHub", icon:<FiGithub /> , color:"#ffffff" },
    ],
  }
];
const EXPERIENCE = [
  {
    role: "Full Stack Software Engineer Intern",
    company: "Ceyinfo Solutions PVT Ltd.",
    period: "Auguest 2025 – Present",
    bullets: [
      "Architected and shipped end-to-end web applications using React.js and Node.js, serving  daily active users.",
      "Designed and implemented RESTful APIs with Express, reducing average response time by 35% through query optimization.",
      "Built scalable backend architecture on PostgreSQL with normalized schemas and indexed queries for high-throughput workloads.",
      "Developed end-to-end test suites using Cypress, improving application reliability and reducing production bugs.",
      "Collaborated with cross-functional teams in an Agile workflow, consistently delivering features on sprint cycles.",
    ],
  },
];

//projects data with images and highlights
const PROJECTS = [
  {
    name: "Hotel ERP System",
    tag: "Industrial · Full Stack",
    images:[Account,voucher,ordergrn,orderdashboard,templete,tableconfig],
    stack: ["React", "Node.js", "PostgreSQL", "Express","Cypress"],
    description:
      "Enterprise grade Hotel Management Platform with integrated Finance, Point-of-Sale, and Front-desk,Configuration,inventory,procurement modules. Designed for high-concurrency environments with role-based access control and real-time reporting dashboards.",
    highlights: ["Finance Module", "POS System", "Front-desk Services", "Configuration","Inventory Management","Procurement", "RBAC", "Real-time Reporting"],
    accent: "#38bdf8",
  },
  {
    name: " Norm Management Module",
    tag: "Academic · Full-stack",
    images:[normgroup,category],
    stack: ["React", "Node.js", "PostgreSQL", "Express"],
    description:"A comprehensive ERP module designed to manage construction norms, categories, and compliance standards. The system enables efficient handling of norm groups, category mapping, and validation rules through a well-structured and optimized PostgreSQL database. It ensures data consistency, scalability, and traceability with features such as performance-optimized queries.",
    highlights: ["Norm Group & Category Management", "Normalized PostgreSQL Schema Design", "RESTful API Architecture (Node.js + Express)", "Scalable Backend Architecture", "Regulatory Mapping"],
    accent: "#a78bfa",
  },
  {
    name:"Food Order Management System",
    tag:"Academic · System Architecture",
    images:[ login,resister,addtocart,productlist,checkout],
    stack:["PHP", "MySQL"],
    description:"A web-based application that allows customers to order food online. The system includes features such as menu browsing, cart management, and order tracking. Built using PHP for the backend and MySQL for the database, it provides a user-friendly interface for both customers and restaurant staff.",
    highlights:["Relational Database Design (MySQL)",  "Server-side Session Management","CRUD Operations for Menu & Orders"],
    accent:"#f43f5e",
  }
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | pausing | erasing

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;

    if (phase === "typing") {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pause);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("erasing"), 200);
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, wordIdx, words, speed, pause]);

  return display;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FadeSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="text-[10px] tracking-[0.35em] font-semibold text-sky-400 uppercase">{children}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-sky-400/30 to-transparent" />
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Nav({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <span
          style={{ fontFamily: "'Montserrat', Montserrat", letterSpacing: "-0.04em" }}
          className="text-2xl font-black text-white "
        >
          Deh<span className="text-sky-400">emi</span>
        </span>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => onNav(link.toLowerCase())}
                className={`text-xs tracking-widest uppercase font-medium transition-colors duration-200 ${
                  active === link.toLowerCase() ? "text-sky-400" : "text-slate-400 hover:text-white"
                }`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        <button
  onClick={() => onNav("contact")} 
  className="hidden md:inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-slate-900 bg-sky-400 hover:bg-sky-300 transition-colors px-4 py-2 rounded-full cursor-pointer"
>
  Hire Me
</button>
      </div>
    </motion.nav>
  );
}


function Hero() {
  const typed = useTypewriter(ROLES, 75, 2200);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // අකුරු අතර පරතරය පොඩ්ඩක් වැඩි කළා ලස්සනට පේන්න
        delayChildren: 0.5,    // Page එක load වෙලා තත්පර 0.5 කට පසු පටන් ගනී
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section id="about" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <span className="inline-block text-[10px] tracking-[0.4em] uppercase text-sky-400 font-semibold mb-6">
                Available for opportunities
              </span>
            </motion.div>

            {/* --- ප්‍රධාන Name Animation එක මෙතනින් --- */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.04em", lineHeight: 1.05 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6"
            >
              <span className="inline-block">
                {"Dehemi".split("").map((letter, index) => (
                  <motion.span key={index} variants={childVariants} className="inline-block">
                    {letter}
                  </motion.span>
                ))}
              </span>
              <br />
              <span className="inline-block">
                {"Upeksha".split("").map((letter, index) => (
                  <motion.span key={index} variants={childVariants} className="inline-block">
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
            {/* -------------------------------------- */}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.5 }} className="mb-8 h-10 flex items-center">
              <span style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "-0.02em" }} className="text-xl md:text-2xl text-sky-300 font-medium">
                {typed}<span className="animate-pulse text-sky-400">|</span>
              </span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.8 }} className="text-slate-400 text-lg max-w-xl leading-relaxed mb-12">
              I build high-performance, production-grade systems — from seamless user interfaces to robust backend architectures.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="bg-sky-400 text-slate-900 font-semibold text-sm px-6 py-3 rounded-full hover:scale-105 transition-all">View Projects →</a>
              <a href="#contact" className="border border-white/10 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/5 transition-all">Get in Touch</a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative shrink-0 flex items-center justify-center"
          >
            <img src={mine} alt="Dehemi Upeksha" 
          className="w-[450px] h-auto transition-all duration-700 block relative z-10"
    style={{ 
      maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
    }}
             />
           <div className="absolute inset-0 bg-sky-400/10 blur-[100px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <FadeSection>
          <SectionLabel className="text-sky-400 font-[12px font-serif]">Experience</SectionLabel>
        </FadeSection>

        {EXPERIENCE.map((exp, i) => (
          <FadeSection key={i}>
            <div className="relative pl-8 border-l border-sky-400/20">
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />

              <div className="mb-2 flex flex-wrap items-baseline gap-3">
                <h3
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}
                  className="text-xl font-bold text-white"
                >
                  {exp.role}
                </h3>
                <span className="text-sky-400 font-medium text-sm font-serif">@ {exp.company}</span>
              </div>

              <p className="text-[12px] tracking-widest uppercase text-slate-500 font-semibold mb-6 ">{exp.period}</p>

              <ul className="space-y-3">
                {exp.bullets.map((b, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.1 }}
                    className="flex gap-3 text-slate-400 text-sm leading-relaxed"
                  >
                    <span className="text-sky-400 mt-1 shrink-0">▸</span>
                    <span>{b}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeSection>
        ))}
      </div>
    </section>
  );
}

 function ProjectImageSlider({ images, accent }) {
  const [index, setIndex] = useState(0);

  // සෑම තත්පර 4කට වරක් image එක මාරු වීම
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl bg-slate-900/50 border border-white/5">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover shadow-lg"
          alt="Project Screenshot"
        />
      </AnimatePresence>
      
      {/* පින්තූරය යටින් ඇති කුඩා indicator dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? "w-4" : "w-1 bg-white/30"
            }`}
            style={{ backgroundColor: i === index ? accent : undefined }}
          />
        ))}
      </div>
    </div>
  );
} 
  

function Projects() {
  return (
    <section id="projects" className="py-28">
      <div className="max-w-6xl mx-auto px-6 font-serif font-[12px]">
        <FadeSection>
          <SectionLabel>Projects</SectionLabel>
        </FadeSection>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <FadeSection key={i}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative h-full bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 overflow-hidden cursor-default"
              >
              
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(600px circle at 50% 0%, ${p.accent}08, transparent 60%)` }}
                />

                {/* Top bar accent */}
                <div
                  className="absolute top-0 left-8 right-8 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.accent}60, transparent)` }}
                />

                <span
                  className="inline-block text-[10px] tracking-[0.3em] uppercase font-semibold mb-4"
                  style={{ color: p.accent }}
                >
                  {p.tag}
                </span>

                <h3
                  style={{  letterSpacing: "-0.03em" }}
                  className="text-2xl font-black text-white mb-3 font-serif"
                >
                  {p.name}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">{p.description}</p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-semibold px-3 py-1 rounded-full border"
                      style={{ color: p.accent, borderColor: `${p.accent}30`, background: `${p.accent}10` }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                  {p.images && p.images.length > 0 && (
                  <ProjectImageSlider images={p.images} accent={p.accent} />
                )}

                {/* Highlight chips */}
                <div className="flex flex-wrap gap-2">
                  {p.highlights.map((h) => (
                    <span key={h} className="text-[10px] text-slate-500 px-2 py-0.5 bg-white/5 rounded-md">
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="py-28">
      <div className="max-w-6xl mx-auto px-6 font-serif font-[12px]">
        <FadeSection>
          <SectionLabel>Tech Stack</SectionLabel>
        </FadeSection>

        <div className="space-y-16">
          {TECH_STACK.map((group, idx) => (
            <div key={idx}>
              {/* Category Title */}
              <motion.h4 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xs tracking-[0.2em] uppercase text-slate-500 font-bold mb-8 flex items-center gap-4"
              >
                {group.category}
                <div className="h-px flex-1 bg-white/5" />
              </motion.h4>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {group.skills.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 150 }}
                    whileHover={{ 
                      y: -5, 
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.2)" 
                    }}
                    className="group flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl transition-all duration-300"
                  >
                    <span
                      className="text-xl transition-all duration-300 group-hover:scale-110"
                      style={{ 
                        color: item.color, 
                        filter: `drop-shadow(0 0 8px ${item.color}40)` 
                      }}
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");
  
  emailjs.sendForm(
    'service_yklkfk8',
    'template_i6zjyh8',
    form.current,
    '2iThQIdjfkNv_ZA-_'
  ).then((result) => {
        setStatus("Message Sent Successfully! ");
        form.current.reset(); 
    }, (error) => {
        setStatus("Failed to send. Please try again. ");
    });
  };
  return (
    <section id="contact" className="py-28">
      <div className="max-w-4xl mx-auto px-8 flex-col items-center">
        <FadeSection>
          <SectionLabel>Contact Me</SectionLabel>
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-3xl p-8 md:p-12 overflow-hidden relative">
            
            <form ref={form} onSubmit={sendEmail} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">Name</label>
                  <input 
                    type="text" name="from_name" required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">Email</label>
                  <input 
                    type="email" name="from_email" required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">Message</label>
                <textarea 
                  name="message" rows="5" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-400 transition-colors"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-sky-400 hover:bg-sky-300 text-slate-900 font-bold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                Send Message
              </button>

              {status && <p className="text-center text-sm text-sky-400 mt-4">{status}</p>}
            </form>
            <div className="flex justify-center items-center gap-6 mt-8 ">
          <a href="https://github.com/upekshadehemi" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <FiGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/dehemi-upeksha-62b92a368" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
            <FiLinkedin size={20} />
          </a>
         
        </div>

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/5 blur-[100px] -z-10" />
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em" }} className="text-sm font-bold text-white">
          Deh<span className="text-sky-400">emi</span>
        </span>
        
        <p className="text-xs text-slate-600">© 2025 Dehemi. Crafted with precision.</p>
        <p className="text-xs text-slate-600">React · Tailwind · Framer Motion</p>
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");

  // Background gradient animation state
  const [bgIdx, setBgIdx] = useState(0);
  const BG_GRADIENTS = [
    "radial-gradient(ellipse at 20% 50%, #0f172a 0%, #020617 60%, #111827 100%)",
    "radial-gradient(ellipse at 80% 30%, #111827 0%, #0f172a 60%, #020617 100%)",
    "radial-gradient(ellipse at 50% 80%, #020617 0%, #111827 50%, #0f172a 100%)",
  ];

  useEffect(() => {
    const t = setInterval(() => setBgIdx((i) => (i + 1) % BG_GRADIENTS.length), 12000);
    return () => clearInterval(t);
  }, []);

  const handleNav = (section) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(section);
  };

  // Track active section on scroll
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.toLowerCase());
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@400;500&display=swap');
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #38bdf840; border-radius: 2px; }
      `}</style>

      {/* Animated background */}
      <motion.div
        key={bgIdx}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
        style={{ background: BG_GRADIENTS[bgIdx] }}
        className="fixed inset-0 -z-10"
      />

      <Nav active={activeSection} onNav={handleNav} />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
