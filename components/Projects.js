import Reveal from "./Reveal";

// Receives the projects from the server (MongoDB) as a prop
export default function Projects({ projects = [] }) {
  return (
    <section id="work" className="section">
      <Reveal as="h2" className="title">My Works</Reveal>
      <div className="projects-grid">
        {projects.map((p) => (
          <Reveal as="article" key={p._id || p.title} className="project">
            <div className="p-icon">
              <i className={p.icon || "fa-solid fa-laptop-code"}></i>
            </div>
            <h3>{p.title}</h3>
            <span className="org">{p.org}</span>
            <p>{p.description}</p>
            <div className="tags">
              {(p.tags || []).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {(p.github || p.live) && (
              <div className="p-links">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github"></i> Code
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i> Live
                  </a>
                )}
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
