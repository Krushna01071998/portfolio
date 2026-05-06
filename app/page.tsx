"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const roles = [
  "Senior Backend Engineer",
  "Java 21 & Spring Boot Expert",
  "Microservices Architect",
  "Kafka & Event Systems Engineer",
  "AWS & Azure Cloud Engineer",
]

const TYPING_SPEED = 75
const DELETING_SPEED = 35
const PAUSE_AFTER_TYPE = 1800
const PAUSE_AFTER_DELETE = 400

const skills = [
  "Java 21", "Spring Boot 3.x", "Apache Kafka", "Microservices",
  "AWS", "Azure", "Kubernetes", "Docker", "PostgreSQL", "MongoDB",
  "Spring WebFlux", "GraphQL", "gRPC", "Terraform", "Redis",
  "Apache Spark", "Hadoop", "ELK Stack", "New Relic", "OAuth2",
]

const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Production Incidents Reduced", value: "50%" },
  { label: "Dev Cycle Faster", value: "30%" },
  { label: "Enterprise Clients", value: "3" },
]

export default function Home() {
  const [displayed, setDisplayed] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [time, setTime] = useState("")
  const [linesDone, setLinesDone] = useState(false)

  useEffect(() => {
    const tick = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB"))
    }, 1000)
    setTimeout(() => setLinesDone(true), 1000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const current = roles[roleIndex]

    if (!isDeleting && displayed === current) {
      setIsPaused(true)
      setTimeout(() => { setIsPaused(false); setIsDeleting(true) }, PAUSE_AFTER_TYPE)
      return
    }
    if (isDeleting && displayed === "") {
      setIsPaused(true)
      setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(false)
        setRoleIndex((i) => (i + 1) % roles.length)
      }, PAUSE_AFTER_DELETE)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayed((prev) =>
        isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      )
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED)

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, isPaused, roleIndex])

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono px-6 py-12 md:px-16">

      <div className="flex items-center justify-between text-xs text-green-600 mb-8 border-b border-green-900 pb-3">
        <span>krushna@portfolio:~</span>
        <div className="flex items-center gap-4">
          <span className="text-green-800">SPR Software Systems — Senior Developer</span>
          <span>{time}</span>
        </div>
      </div>

      <div className={`text-xs text-green-800 mb-8 space-y-1 transition-opacity duration-700 ${linesDone ? "opacity-100" : "opacity-0"}`}>
        <p>&gt; Booting portfolio v2025...</p>
        <p>&gt; Loading: Java 21 · Spring Boot 3.x · Kafka · AWS · Kubernetes</p>
        <p>&gt; Clients: Nordstrom (USA) · Magna International (Germany) · sCharge (India)</p>
        <p>&gt; Status: <span className="text-green-400">READY</span></p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start max-w-5xl">

        <div className="flex-shrink-0">
          <div className="w-28 h-28 rounded-sm border border-green-800 overflow-hidden bg-green-950">
            <Image
              src="/avatar.jpg"
              alt="Krushna Chaudhari"
              width={112}
              height={112}
              className="object-cover w-full h-full grayscale"
            />
          </div>
          <div className="mt-3 space-y-1 text-xs text-green-700">
            <p>Pune, Maharashtra</p>
            <p>India</p>
          </div>
        </div>

        <div className="flex-1 space-y-6">

          <div>
            <p className="text-green-700 text-xs mb-1">$ whoami</p>
            <h1 className="text-3xl md:text-4xl font-bold text-green-300 tracking-tight">
              Krushna D. Chaudhari
            </h1>
          </div>

          <div>
            <p className="text-green-700 text-xs mb-1">$ current_role</p>
            <div className="text-lg md:text-xl text-green-400 h-7 flex items-center">
              <span>{displayed}</span>
              <span className="ml-1 w-2 h-4 bg-green-400 inline-block animate-pulse" />
            </div>
          </div>

          <div>
            <p className="text-green-700 text-xs mb-1">$ cat summary.txt</p>
            <p className="text-green-600 text-sm leading-relaxed max-w-2xl">
              Senior Backend Engineer with 5+ years architecting high-availability microservices
              for global enterprise clients — Nordstrom (USA) and Magna International (Germany).
              Expert in Java 21, Spring Boot 3.x, and Kafka-driven event systems on AWS/Azure.
              Delivered 30% faster development cycles and 50% fewer production incidents through
              CI/CD automation and proactive observability.
            </p>
          </div>

          <div>
            <p className="text-green-700 text-xs mb-2">$ cat metrics.json</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="border border-green-900 p-3">
                  <div className="text-green-300 text-xl font-bold">{s.value}</div>
                  <div className="text-green-800 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-green-700 text-xs mb-2">$ ls skills/</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="border border-green-900 text-green-600 text-xs px-2 py-1 hover:border-green-600 hover:text-green-400 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-green-700 text-xs mb-2">$ ls links/</p>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/projects" className="text-green-500 hover:text-green-300 underline underline-offset-4 transition-colors">
                ./projects
              </a>
              <a href="https://github.com/Krushna01071998" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-300 underline underline-offset-4 transition-colors">
                ./github
              </a>
              <a href="https://www.linkedin.com/in/krushna-d-chaudhari-1a842024a" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-300 underline underline-offset-4 transition-colors">
                ./linkedin
              </a>
              <a href="mailto:krushna.chaudhari2026@gmail.com" className="text-green-500 hover:text-green-300 underline underline-offset-4 transition-colors">
                ./contact
              </a>
              <a href="tel:+917385498630" className="text-green-500 hover:text-green-300 underline underline-offset-4 transition-colors">
                ./phone
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-16 border-t border-green-900 pt-6">
        <p className="text-green-800 text-xs mb-3">$ cat experience.log</p>
        <div className="space-y-4 max-w-4xl">

          <div className="border-l-2 border-green-900 pl-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-1">
              <span className="text-green-400 text-sm font-bold">Senior Developer — SPR Software Systems</span>
              <span className="text-green-800 text-xs">Jun 2025 – Present · Hyderabad (Remote)</span>
            </div>
            <p className="text-green-700 text-xs mb-2">Client: Nordstrom, USA</p>
            <div className="space-y-1 text-xs text-green-700">
              <p>&gt; Architected Purchase Order microservice for Nordstrom using Java 21 + Spring Boot 3.3</p>
              <p>&gt; Engineered Kafka event-driven architecture with Confluent Schema Registry + Apache Avro</p>
              <p>&gt; Built fault-tolerant services with Spring WebFlux, OpenFeign, Resilience4j circuit breakers</p>
              <p>&gt; Reduced provisioning time via Terraform + Kubernetes with Kustomize</p>
            </div>
          </div>

          <div className="border-l-2 border-green-900 pl-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-1">
              <span className="text-green-400 text-sm font-bold">Software Engineer — Ielektron Technologies</span>
              <span className="text-green-800 text-xs">Sep 2022 – Jun 2025 · Pune</span>
            </div>
            <p className="text-green-700 text-xs mb-2">Client: Magna International, Germany</p>
            <div className="space-y-1 text-xs text-green-700">
              <p>&gt; Architected ADAS video labeling platform using Spark, Hadoop, Kafka for ML pipelines</p>
              <p>&gt; Cut development effort by 30% via reusable microservice libraries</p>
              <p>&gt; Reduced production incidents by 50% with ELK Stack + Grafana observability</p>
            </div>
          </div>

          <div className="border-l-2 border-green-900 pl-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-1">
              <span className="text-green-400 text-sm font-bold">Software Developer Associate — Zeta IT Innovations</span>
              <span className="text-green-800 text-xs">Jan 2021 – Sep 2022 · Bengaluru (Remote)</span>
            </div>
            <p className="text-green-700 text-xs mb-2">Client: sCharge, India</p>
            <div className="space-y-1 text-xs text-green-700">
              <p>&gt; Built EV charging microservices on AWS with Spring Boot, Docker, Kubernetes</p>
              <p>&gt; Implemented real-time WebSocket communication via OCPP protocol</p>
              <p>&gt; Established GitHub Actions CI/CD for zero-downtime containerized deployments</p>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-10 border-t border-green-900 pt-6 max-w-4xl">
        <p className="text-green-800 text-xs mb-3">$ cat education.txt</p>
        <div className="border-l-2 border-green-900 pl-4">
          <span className="text-green-400 text-sm font-bold">B.E. Computer Engineering — RTM Nagpur University</span>
          <p className="text-green-700 text-xs mt-1">2016 – 2021 · CGPA: 8.43 / 10 · Nagpur, India</p>
        </div>
      </div>

      <div className="mt-10 text-green-900 text-xs flex items-center gap-1">
        <span>krushna@portfolio:~$</span>
        <span className="w-2 h-3 bg-green-900 inline-block animate-pulse ml-1" />
      </div>

    </main>
  )
}
