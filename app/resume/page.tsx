const experience = [
  "Transcriptionist, Uber AI Solutions",
  "Air Traffic Control Transcriptionist, Alignerr",
  "Spanish Medical Annotation Subject Matter Expert, Centific",
  "Certified Medical Interpreter, Propio",
  "Cook, KPot Korean BBQ & Hot Pot",
  "Certified Medical Interpreter, Kelly Services",
  "Legal Interpreter, Kates Nussman Ellis Fahri & Earle, LLP",
  "Cook & Crew Member, Chipotle Mexican Grill",
  "Front & Back of House Crew Member, Gong Cha Taiwan"
];

const education = [
  "New Jersey City University",
  "Hudson County Community College",
  "North Bergen High School",
];

export default function ResumePage() {
  return (
    <div className="page-wrap">
      <section className="panel p-8 sm:p-10">
        <span className="kicker">Resume</span>
        <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">Professional Snapshot</h1>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <article className="info-card">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="muted mt-2">Camilo Gomez</p>
            <p className="muted">Manhattan, NY 10012</p>
            <div className="mt-3 flex flex-col gap-2">
              <a className="primary-link" href="mailto:c6m1lo@proton.me">
                c6m1lo@proton.me
              </a>
              <a
                className="primary-link"
                href="https://www.linkedin.com/in/camilogomezvalencia/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn Profile →
              </a>
              <a
                className="primary-link"
                href="https://github.com/fullstacknyc"
                target="_blank"
                rel="noreferrer"
                >GitHub Profile →</a>
                <a className="primary-link" href="https://www.discord.gg/Khd7HPUzRK" target="_blank" rel="noreferrer">
                Discord Server →
              </a>
            </div>
          </article>

          <article className="info-card">
            <h2 className="text-xl font-semibold">Skills</h2>
            <ul className="muted mt-2 space-y-1">
              <li>English/Spanish Translation, Annotation, & Transcription - Native Level</li>
              <li>Data Annotation and Quality Assurance of Sensitive NLP Datasets</li>
              <li>Medical Terminology and Interpretation</li>
              <li>Engineering across multiple domains and technologies (Biology, Nutrition, AI/LLM, Neural Networks, Kinesiology, Immunology, Medicine, Cybersecurity, & More)</li>
            </ul>
          </article>
        </div>

        <section className="mt-6 info-card">
          <h2 className="text-xl font-semibold">Experience</h2>
          <ul className="muted mt-2 space-y-1">
            {experience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-4 info-card">
          <h2 className="text-xl font-semibold">Education</h2>
          <ul className="muted mt-2 space-y-1">
            {education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}
