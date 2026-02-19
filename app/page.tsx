"use client";

import { useEffect, useMemo, useState } from "react";

type Section = {
  id: string;
  label: string;
  heading: string;
  description: string;
  points: string[];
};

const sections: Section[] = [
  {
    id: "why-me",
    label: "Why Me",
    heading: "Trusted Across High-Stakes, Detail-Heavy Work",
    description:
      "I deliver where precision matters: AI data quality, language interpretation, and production-grade execution. You get someone who ships, adapts fast, and protects quality under pressure.",
    points: [
      "NLP labeling and QA experience with quality-first workflows",
      "Cross-domain execution spanning AI/ML, software, and cybersecurity",
      "Strong communication and clean handoffs in async environments",
    ],
  },
  {
    id: "capabilities",
    label: "Capabilities",
    heading: "Technical Depth With Business-Focused Outcomes",
    description:
      "From front-end delivery to structured analysis, I focus on measurable outcomes, not noise. I combine engineering discipline with practical strategy to move projects forward quickly.",
    points: [
      "TypeScript, React, Tailwind, and modern web delivery",
      "Prompt engineering, model feedback loops, and testing routines",
      "Automation mindset: reduce repetitive work, increase reliability",
    ],
  },
  {
    id: "proof",
    label: "Proof",
    heading: "Execution You Can Validate",
    description:
      "My portfolio shows a pattern: identify problems, design better systems, and deploy solutions that keep delivering value over time.",
    points: [
      "Portfolio projects built around utility and usability",
      "Community-driven initiatives and collaborative technical work",
      "SEO/content + engineering integration for real-world websites",
    ],
  },
  {
    id: "impact",
    label: "Impact",
    heading: "Built To Create Compounding Value",
    description:
      "I design work that scales: clear architecture, maintainable decisions, and systems that continue to perform with minimal supervision.",
    points: [
      "Asynchronous ownership with clear updates and documentation",
      "Fast learning loop to absorb new domains and constraints",
      "Long-term thinking without slowing short-term delivery",
    ],
  },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [progress, setProgress] = useState(0);

  const sectionIds = useMemo(() => sections.map((section) => section.id), []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: 0.45,
        },
      );

      observer.observe(element);
      observers.push(observer);
    });

    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const nextProgress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, nextProgress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [sectionIds]);

  return (
    <div className="home-page">
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <section className="home-hero panel">
        <p className="kicker">Camilo Gomez</p>
        <h1>
          I turn ambiguity into shipped, high-quality results. If you need reliable
          execution with speed, I am your unfair advantage.
        </h1>
        <p className="muted hero-copy">
          I combine AI data operations, software engineering, and systems thinking to
          deliver practical outcomes. You are not hiring potential, you are hiring
          production momentum.
        </p>
        <div className="hero-actions">
          <a href="/resume" className="hero-btn hero-btn-primary">
            View Resume
          </a>
          <a href="/projects" className="hero-btn hero-btn-secondary">
            Explore Projects
          </a>
        </div>
      </section>

      <div className="scroller-layout">
        <aside className="scroller-nav panel" aria-label="Section navigation">
          <p className="nav-title">On this page</p>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={activeSection === section.id ? "is-active" : ""}
            >
              {section.label}
            </a>
          ))}
        </aside>

        <div className="scroller-content">
          {sections.map((section, index) => (
            <section
              id={section.id}
              key={section.id}
              className="scroller-panel panel"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <p className="kicker">{section.label}</p>
              <h2>{section.heading}</h2>
              <p className="muted">{section.description}</p>
              <ul>
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          ))}

          <section className="scroller-panel panel final-cta">
            <p className="kicker">Let&apos;s Build</p>
            <h2>Need someone who can think deeply and execute immediately?</h2>
            <p className="muted">
              I can help you accelerate delivery, improve quality, and create assets that
              keep working long after launch.
            </p>
            <div className="hero-actions">
              <a href="/support" className="hero-btn hero-btn-primary">
                Work With Me
              </a>
              <a
                href="https://buy.stripe.com/dRm8wPh2Z2ZS1XB2XJ9oc09"
                target="_blank"
                rel="noreferrer"
                className="hero-btn hero-btn-secondary"
              >
                Support My Work
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
