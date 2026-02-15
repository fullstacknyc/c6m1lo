const projects = [
  {
    title: "LinkedIn Profile",
    description: "Professional background, recent roles, and endorsements.",
    href: "https://www.linkedin.com/in/camilogomezvalencia",
    cta: "View profile",
  },
  {
    title: "Stripe Donation",
    description: "Donate any amount to support ongoing projects and site maintenance.",
    href: "https://buy.stripe.com/dRm8wPh2Z2ZS1XB2XJ9oc09",
    cta: "Donate",
  },
  {
    title: "Referral Resources",
    description: "A curated list of referral links and programs.",
    href: "/referral",
    cta: "Open page",
  },
  {
    title: "Discord Server",
    description: "Join the community for discussions, collaborations, and updates.",
    href: "https://discord.gg/Khd7HPUzRK",
    cta: "Join server",
  }
];

export default function ProjectsPage() {
  return (
    <div className="page-wrap">
      <section className="panel p-8 sm:p-10">
        <span className="kicker">Projects</span>
        <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">Projects</h1>
        <p className="muted mt-4 max-w-2xl">
          A quick index of public-facing links that represent current work and profile details.
        </p>
        <div className="mt-8 grid-cards">
          {projects.map((project) => (
            <article key={project.title} className="info-card">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="muted mt-2">{project.description}</p>
              <a
                className="primary-link mt-4"
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={project.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {project.cta} →
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
