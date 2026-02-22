"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, } from "lucide-react"
const timelineData = [
  {
    id: 1,
    company: "EngenuityAi",
    role: "Apprentice Associate Software Engineer ",
    period: "2025 March - present",
    logo: "/company2.png",
    skills: ["JavaScript", "React", "Node.js"],
  },
  {
    id: 2,
    company: "EngenuityAi",
    role: "Intern - Software Engineer",
    period: "2024 August - 2025 March",
    logo: "/company2.png",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },

]

const skillsData = {
  "Programming Languages": [
    { name: "Java" ,proficiency: 100},
    { name: "Python",proficiency: 100 },
    { name: "JavaScript",proficiency: 100 },
    { name: "Kotlin",proficiency: 100 },
  ],
  "Frameworks/Libraries": [
    { name: "ReactJS" ,proficiency: 100},
    { name: "NextJS" ,proficiency: 100},
    { name: "React Native",proficiency: 100 },
    { name: "Node.js",proficiency: 100 },
    { name: "ASP.NET",proficiency: 100 },
  ],
  "Databases & Cloud": [
    { name: "MySQL" ,proficiency: 100},
    { name: "AWS Services" ,proficiency: 100},
  ],
  "Web Technologies": [
    { name: "HTML",proficiency: 100 },
    { name: "CSS",proficiency: 100 },
    { name: "TailwindCSS" ,proficiency: 100},
    { name: "Redux" ,proficiency: 100},
  ],
  Tools: [
    { name: "GitHub",proficiency: 100 },
    { name: "Sanity.io",proficiency: 100 },
  ],
}

export default function AboutMe() {
  return (
    <section id="about" className="py-12 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              About Me
            </span>
            <span className="ml-2"> 💻</span>
          </h2>
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-20">
            <div className="md:w-1/3">
              <div className="relative w-64 h-64 mx-auto">
                <Image
                    src="/Lumi.jpeg"
                    alt="Lumini Munasinghe"
                    fill
                    className="rounded-2xl object-cover shadow-2xl"
                />
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="prose prose-invert max-w-none text-center md:text-left">

                {/* Mobile Description */}
                <p className="text-lg leading-relaxed md:hidden">
                  Software Engineering Undergraduate 💻 | Apprentice Associate Software Engineer at EngenuityAi 🚀
                  Passionate about building scalable web and mobile applications using React, Next.js, Node.js, and AWS.
                </p>

                {/* Desktop Description */}
                <div className="hidden md:block">
                  <p className="text-2xl mb-6 font-semibold">
                    🚀 Hey, I'm <span className="text-purple-400">Lumini Munasinghe</span>!
                  </p>

                  <p className="mb-4 text-gray-300 leading-relaxed">
                    I'm a <strong>Software Engineering undergraduate</strong> and currently working as an{" "}
                    <strong>Apprentice Associate Software Engineer at EngenuityAi</strong>.
                    I specialize in building modern, scalable applications using{" "}
                    <strong>React, Next.js, TypeScript, and Node.js</strong>.
                  </p>

                  <p className="mb-4 text-gray-300 leading-relaxed">
                    My experience includes developing full-stack web applications,
                    working with <strong>AWS services</strong>, integrating APIs,
                    and building mobile applications with <strong>React Native</strong> and{" "}
                    <strong>Jetpack Compose</strong>.
                  </p>

                  <p className="text-gray-300 leading-relaxed">
                    I’m passionate about creating <strong>secure, efficient, and user-focused software
                    solutions</strong>,
                    and continuously expanding my expertise in <strong>AI-driven systems and cloud technologies</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                The Road So Far
              </span>
              <span className="ml-2 text-white">🛤️</span>
            </h3>
            <div className="relative">
              {/* Vertical Line (only visible on larger screens) */}
              <div
                  className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 hidden md:block"></div>

              {/* Timeline Items */}
              <div className="space-y-8">
                {timelineData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: index * 0.1}}
                        viewport={{once: true}}
                        className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 relative`}
                    >
                      {/* Content */}
                      <div className="md:w-1/2 p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-800">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                          <div
                              className="w-16 h-16 md:w-12 md:h-12 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden mb-4 md:mb-0 mx-auto md:mx-0">
                            <Image
                                src={item.logo || "/placeholder.svg"}
                                alt={item.company}
                                width={56}
                                height={56}
                                className="rounded-full"
                            />
                          </div>
                          <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold text-white">{item.role}</h3>
                            <h4 className="text-lg text-purple-400">{item.company}</h4>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mt-1">
                              <Calendar className="w-4 h-4"/>
                              <span className="text-sm">{item.period}</span>
                            </div>

                          </div>
                        </div>
                      </div>

                      <div
                          className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hidden md:block"></div>

                    </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center">
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
      Code Arsenal
    </span>
              <span className="ml-2 text-white">⚔️</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(skillsData).map(([category, skills]) => (
                  <div
                      key={category}
                      className="p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-800"
                  >
                    <h4 className="text-xl font-bold mb-6 text-purple-400 text-center md:text-left">
                      {category}
                    </h4>

                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill) => (
                          <motion.div
                              key={skill.name}
                              whileHover={{scale: 1.08}}
                              className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-gray-300 hover:text-white transition-all duration-300 cursor-default"
                          >
                            {skill.name}
                          </motion.div>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </div>


        </motion.div>
      </div>
    </section>
  )
}

