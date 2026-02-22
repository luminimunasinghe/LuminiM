"use client"

import type React from "react"
import emailjs from "@emailjs/browser"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

import {useState, useEffect, useRef} from "react"
import {
  Github,
  Linkedin,
  Twitter,

  Smartphone,
  PenTool,
} from "lucide-react"
import { Link as ScrollLink } from "react-scroll"
import CustomCursor from "../components/custom-cursor"
import Navbar from "../components/navbar"
import SocialIcon from "../components/social-icon"
import AboutMe from "../components/about-me"
import Loading from "../components/loading"
import InteractiveShapes from "../components/InteractiveShapes"
import {form} from "framer-motion/m";

export default function Home() {
  const form = useRef<HTMLFormElement>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000) // Show loading for 2 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null
  if (loading) return <Loading />



  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.current) return

    emailjs
        .sendForm(
            "service_ma2xp6d",
            "template_fa00q7a",
            form.current,
            "BKE8gLXVY340_ugsF"
        )
        .then(() => {
          setToast("Message sent successfully 🚀")

          setTimeout(() => {
            setToast(null)
          }, 5000)

          form.current?.reset()
        })
        .catch((error) => {
          setToast("Failed to send message ❌")

          setTimeout(() => {
            setToast(null)
          }, 5000)

          console.log(error)
        })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // You can add a console.log here if you want to verify it's working
    console.log("Form submission prevented")
  }

  function FloatingOrb({
                         size,
                         color,
                         x,
                         y,
                         delay,
                       }: {
    size: number
    color: string
    x: string
    y: string
    delay: number
  }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              left: x,
              top: y,
              background: color,
              filter: "blur(80px)",
              opacity: 0.35,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 7 + delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
        />
    )
  }

// ─── Grid Lines ───────────────────────────────────────────────────────────────
  function GridOverlay() {
    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
          linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)
        `,
              backgroundSize: "60px 60px",
            }}
        />
    )
  }

// ─── Particles ────────────────────────────────────────────────────────────────
  function Particle({ delay, duration }: { delay: number; duration: number }) {
    const left = `${Math.random() * 100}%`
    const size = Math.random() * 2 + 1

    return (
        <motion.div
            className="absolute rounded-full bg-purple-400 pointer-events-none"
            style={{ left, bottom: -10, width: size, height: size, opacity: 0 }}
            animate={{ y: [0, -window.innerHeight - 20], opacity: [0, 0.8, 0] }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
        />
    )
  }

  function ParticleField() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 25 }).map((_, i) => (
              <Particle
                  key={i}
                  delay={Math.random() * 10}
                  duration={8 + Math.random() * 10}
              />
          ))}
        </div>
    )
  }

// ─── Animated Counter ─────────────────────────────────────────────────────────
  function AnimatedCounter({ value, label }: { value: string; label: string }) {
    return (
        <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            {value}
          </div>
          <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{label}</div>
        </motion.div>
    )
  }

// ─── Tech Badge ───────────────────────────────────────────────────────────────
  function TechBadge({ label, delay }: { label: string; delay: number }) {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.4 }}
            whileHover={{ scale: 1.08, y: -2 }}
            className="px-3 py-1 text-xs rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 cursor-default select-none"
        >
          {label}
        </motion.span>
    )
  }

// ─── Typing Text ──────────────────────────────────────────────────────────────
  function TypingText({ texts }: { texts: string[] }) {
    const [index, setIndex] = useState(0)
    const [displayed, setDisplayed] = useState("")
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
      const current = texts[index]
      let timeout: NodeJS.Timeout

      if (!deleting && displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
      } else if (!deleting && displayed.length === current.length) {
        timeout = setTimeout(() => setDeleting(true), 2000)
      } else if (deleting && displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      } else if (deleting && displayed.length === 0) {
        setDeleting(false)
        setIndex((i) => (i + 1) % texts.length)
      }

      return () => clearTimeout(timeout)
    }, [displayed, deleting, index, texts])

    return (
        <span>
      {displayed}
          <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-5 bg-purple-400 ml-0.5 align-middle"
          />
    </span>
    )
  }

// ─── Mouse-follow Glow ────────────────────────────────────────────────────────
  function MouseGlow() {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    useEffect(() => {
      const move = (e: MouseEvent) => {
        x.set(e.clientX)
        y.set(e.clientY)
      }
      window.addEventListener("mousemove", move)
      return () => window.removeEventListener("mousemove", move)
    }, [x, y])

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background: useTransform(
                  [x, y],
                  ([mx, my]) =>
                      `radial-gradient(400px at ${mx}px ${my}px, rgba(139,92,246,0.08) 0%, transparent 70%)`
              ),
            }}
        />
    )
  }

  return (
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <CustomCursor/>
        <Navbar/>
        <InteractiveShapes/>

        <section
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050508]"
        >
          {/* Background image with overlay */}
          <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{backgroundImage: "url('/bg.jpeg')"}}
          />
          <div className="absolute inset-0 bg-[#050508]/80"/>

          {/* Ambient orbs */}
          <FloatingOrb size={500} color="radial-gradient(circle, #7c3aed, transparent)" x="-10%" y="10%" delay={0}/>
          <FloatingOrb size={400} color="radial-gradient(circle, #db2777, transparent)" x="70%" y="60%" delay={2}/>
          <FloatingOrb size={300} color="radial-gradient(circle, #4f46e5, transparent)" x="40%" y="-10%" delay={4}/>

          {/* Grid */}
          <GridOverlay/>

          {/* Particles */}
          <ParticleField/>

          {/* Mouse glow */}
          <MouseGlow/>

          {/* ── Main Card ── */}
          <div className="container relative z-10 px-4 mx-auto">
            <motion.div
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: "easeOut"}}
                className="max-w-3xl mx-auto"
            >
              {/* Glass card */}
              <div
                  className="relative rounded-3xl p-8 md:p-12 text-center"
                  style={{
                    background: "rgba(10, 10, 20, 0.65)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(139, 92, 246, 0.2)",
                    boxShadow:
                        "0 0 0 1px rgba(139,92,246,0.1), 0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
              >
                {/* Top glow line */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 pointer-events-none"
                    style={{
                      background:
                          "linear-gradient(90deg, transparent, rgba(139,92,246,0.8), rgba(236,72,153,0.8), transparent)",
                    }}
                />

                <motion.h1
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5, duration: 0.8}}
                    className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 leading-tight tracking-tight"
                    style={{fontFamily: "'Clash Display', 'Syne', sans-serif"}}
                >
                  <span className="text-white">Hey, I'm</span>
                  <br/>
                  <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                            "linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #fb923c 100%)",
                      }}
                  >
                Lumini Munasinghe
              </span>
                </motion.h1>

                {/* Typing role */}
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.9}}
                    className="text-base md:text-lg text-gray-400 mb-6 font-light tracking-wide"
                >
                  🚀{" "}
                  <TypingText
                      texts={[
                        "Full-Stack Developer",
                        "Software Engineer",
                        "Undergraduate",
                      ]}
                  />
                </motion.div>

                {/* Tech badges */}
                <motion.div
                    className="flex flex-wrap justify-center gap-2 mb-8"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1}}
                >
                  {["React", "Next.js", "Node.js", "TypeScript", ".Net", "AWS"].map((t, i) => (
                      <TechBadge key={t} label={t} delay={1.0 + i * 0.07}/>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-10"
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1.2}}
                >
                  <ScrollLink to="work" smooth duration={500}>
                    <motion.button
                        whileHover={{scale: 1.04}}
                        whileTap={{scale: 0.97}}
                        className="relative px-7 py-3 rounded-xl font-semibold text-sm text-white overflow-hidden group"
                        style={{
                          background: "linear-gradient(135deg, #7c3aed, #db2777)",
                          boxShadow: "0 4px 24px rgba(124,58,237,0.4)",
                        }}
                    >
                      <span className="relative z-10">View Projects ↗</span>
                      <div
                          className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                    </motion.button>
                  </ScrollLink>

                  <ScrollLink to="contact" smooth duration={500}>
                    <motion.button
                        whileHover={{scale: 1.04}}
                        whileTap={{scale: 0.97}}
                        className="px-7 py-3 rounded-xl font-semibold text-sm text-white border transition-all duration-300"
                        style={{
                          borderColor: "rgba(139,92,246,0.5)",
                          background: "rgba(139,92,246,0.08)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(139,92,246,0.2)"
                          e.currentTarget.style.borderColor = "rgba(139,92,246,0.9)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(139,92,246,0.08)"
                          e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)"
                        }}
                    >
                      Contact Me
                    </motion.button>
                  </ScrollLink>
                </motion.div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"/>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <AnimatedCounter value="5+" label="Projects"/>
                  <AnimatedCounter value="1+" label="Years Coding"/>
                  <AnimatedCounter value="10+" label="Technologies"/>
                </div>

                {/* Bottom glow line */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2 pointer-events-none"
                    style={{
                      background:
                          "linear-gradient(90deg, transparent, rgba(236,72,153,0.5), transparent)",
                    }}
                />
              </div>

              {/* Scroll hint */}
              <motion.div
                  className="flex justify-center mt-8"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 1.8}}
              >
                <motion.div
                    animate={{y: [0, 8, 0]}}
                    transition={{duration: 2, repeat: Infinity}}
                    className="flex flex-col items-center gap-1 text-gray-600 text-xs tracking-widest uppercase"
                >
                  <span>Scroll</span>
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                    <rect x="5.5" y="0.5" width="5" height="9" rx="2.5" stroke="currentColor"/>
                    <motion.circle
                        cx="8"
                        cy="4"
                        r="1.5"
                        fill="currentColor"
                        animate={{cy: [4, 7, 4]}}
                        transition={{duration: 1.5, repeat: Infinity}}
                    />
                    <path d="M4 14l4 5 4-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container px-4 mx-auto">
            <AboutMe/>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-24 bg-gradient-to-b from-gray-900 to-black">
          <div className="container px-4 mx-auto">
            <motion.div
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                viewport={{once: true}}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          What I've Built
        </span>
                <span className="ml-2 text-white">🚀</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                <EnhancedProjectCard
                    title="Flag Generator App"
                    description="Jetpack Compose mobile application that dynamically displays country flags with SQLite-based local storage."
                    tags={["Kotlin", "Jetpack Compose", "SQLite"]}
                />

                <EnhancedProjectCard
                    title="Student Progress Finder"
                    description="Python-based academic tracking tool enabling students and teachers to calculate and monitor performance."
                    tags={["Python", "Data Processing"]}
                />

                <EnhancedProjectCard
                    title="Queue Management System"
                    description="Java OOP-based system for managing food shop queues, handling customers, and calculating orders efficiently."
                    tags={["Java", "OOP"]}
                />

                <EnhancedProjectCard
                    title="Travel Website Quiz"
                    description="Interactive quiz and informational website designed to improve user engagement using modern web technologies."
                    tags={["HTML", "CSS", "JavaScript"]}
                />

                <EnhancedProjectCard
                    title="Football Club Generator"
                    description="Mobile app fetching football club data via API and storing locally with SQLite for efficient access."
                    tags={["Kotlin", "API Integration", "SQLite"]}
                />

                <EnhancedProjectCard
                    title="AI-Integrated Web Applications"
                    description="Developed full-stack applications using React, Next.js, Node.js, and AWS, integrating AI-driven features."
                    tags={["React", "Next.js", "Node.js", "AWS"]}
                />

              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-black">
          <div className="container px-4 mx-auto">
            <motion.div
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                viewport={{once: true}}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Let's Connect
        </span>
                <span className="ml-2 text-white">💬</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

                {/* Left Side – Contact Info */}
                <div className="space-y-8">
                  <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-8 rounded-2xl">
                    <h3 className="text-xl font-semibold text-white mb-6">
                      Get In Touch
                    </h3>

                    <p className="text-gray-400 mb-6">
                      I'm always open to discussing new projects, new opportunities,
                      and innovative ideas in software development and AI.
                    </p>

                    <div className="space-y-4 text-gray-300">

                      <div>
                        <span className="text-purple-400 font-medium">Email:</span>
                        <p>luminimunasinghe260@gmail.com</p>
                      </div>

                      <div>
                        <span className="text-purple-400 font-medium">Phone:</span>
                        <p>+94 71 210 4157</p>
                      </div>

                      <div>
                        <span className="text-purple-400 font-medium">Location:</span>
                        <p>Colombo, Sri Lanka</p>
                      </div>

                      <div>
                        <span className="text-purple-400 font-medium">GitHub:</span>
                        <p>github.com/luminimunasinghe</p>
                      </div>

                      <div>
                        <span className="text-purple-400 font-medium">LinkedIn:</span>
                        <p>linkedin.com/in/luminisandeepamunasinghe</p>
                      </div>

                    </div>

                    <div className="mt-8">
                      <a
                          href="https://drive.google.com/file/d/16RuNhcM1Z9KpUY5AyEHn9TsHZKuePCeD/view?usp=drive_link"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all"
                      >
                        View CV
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-8 rounded-2xl">
                  <form ref={form} onSubmit={sendEmail} className="space-y-6">

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Your Name
                      </label>
                      <input
                          type="text"
                          name="user_name"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Your Email
                      </label>
                      <input
                          type="email"
                          name="user_email"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Your Message
                      </label>
                      <textarea
                          name="message"
                          rows={5}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-500 outline-none transition"
                      />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg text-white bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 transition-all"
                    >
                      Send Message
                    </button>
                    {toast && (
                        <div className="mt-2 text-center text-sm text-green-400">
                          {toast}
                        </div>
                    )}

                  </form>
                </div>


              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer with Social Links */}
        <footer className="py-12 bg-gradient-to-t from-gray-900 to-black">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <SocialIcon icon={<Github/>} href="https://github.com/luminimunasinghe" label="GitHub"/>
              <SocialIcon icon={<Linkedin/>} href="https://www.linkedin.com/in/luminisandeepamunasinghe-890a0b260/"
                          label="LinkedIn"/>
              <SocialIcon
                  icon={<Smartphone/>}
                  href="#"
                  label="Mobile Apps"
                  className="opacity-50 cursor-not-allowed"
                  onClick={(e) => {
                    e.preventDefault()

                    console.log("Mobile icon click prevented")
                  }}
              />
            </div>
            <div className="text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} luminiMunasinghe. All rights reserved.</p>
              <ContactEmail/>
            </div>
          </div>
        </footer>
      </div>
  )
}

function ContactEmail() {
  return (
      <div className="mt-2">
        <a href="luminimunasinghe260@gmail.com" className="text-purple-400 hover:text-purple-300">
          luminimunasinghe260@gmail.com
        </a>
      </div>
  )
}

function EnhancedProjectCard({title, description, tags}) {
  return (
      <motion.div
          whileHover={{y: -10}}
          className="p-6 rounded-2xl bg-gray-900/60 backdrop-blur-md border border-gray-800 hover:border-purple-500/40 transition-all duration-300 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-white mb-4">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
              <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-gray-300"
              >
            {tag}
          </span>
          ))}
        </div>
      </motion.div>
  )
}
