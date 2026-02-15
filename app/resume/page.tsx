const experience = [
  "Transcriptionist, Uber AI Solutions",
  "Air Traffic Control Domain Specialist, Alignerr",
  "Transcription, Annotation, and Summarization, Centific",
  "Certified Medical Interpreter, Propio",
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
            </div>
          </article>

          <article className="info-card">
            <h2 className="text-xl font-semibold">Skills</h2>
            <ul className="muted mt-2 space-y-1">
              <li>English and Spanish (native fluency)</li>
              <li>Data annotation and transcription quality control</li>
              <li>Medical interpretation and terminology handling</li>
              <li>NLP-focused review and summarization workflows</li>
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
