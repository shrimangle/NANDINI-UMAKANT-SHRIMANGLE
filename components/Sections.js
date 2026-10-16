import { skills, experience, education } from "@/lib/content";
import Reveal from "./Reveal";
import Stat from "./Stat";

export function About() {
  return (
    <section id="bio" className="section">
      <Reveal as="h2" className="title">Who I Am</Reveal>
      <div className="about-grid">
        <Reveal className="about-text">
          <p>
            I&apos;m a Computer Science Engineering student (B.E., 2024 – 2026) with a strong foundation in Core Java,
            SQL, OOP, HTML, CSS and JavaScript. I have completed a Java Full Stack Development internship where I
            worked on real projects, including live applications.
          </p>
          <p>
            I enjoy building both sides of a web app – a clean, responsive frontend with React.js and a solid backend
            with Node.js, Express.js and MongoDB or MySQL, including authentication, roles and databases.
          </p>
          <p>
            I&apos;m currently looking for entry-level <strong>Software Developer</strong> or{" "}
            <strong>Full Stack Developer</strong> opportunities.
          </p>
        </Reveal>
        <Reveal className="stats">
          <Stat value={3} label="Major Projects" />
          <Stat value={2} label="Internships" />
          <Stat value={10} label="Technologies" />
        </Reveal>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="expertise" className="section">
      <Reveal as="h2" className="title">What I Know</Reveal>
      <div className="skills-grid">
        {skills.map((s) => (
          <Reveal key={s.title} className={`skill-card ${s.mern ? "mern" : ""}`}>
            <i className={s.icon}></i>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section">
      <Reveal as="h2" className="title">Experience</Reveal>
      <div className="timeline">
        {experience.map((e) => (
          <Reveal key={e.company} className="t-item">
            <div className="dot"></div>
            <div className="t-card">
              <h3>
                {e.title} {e.duration && <small>({e.duration})</small>}
              </h3>
              <h4>{e.company}</h4>
              <ul>
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="section">
      <Reveal as="h2" className="title">Education &amp; Certifications</Reveal>
      <div className="edu-grid">
        {education.map((e) => (
          <Reveal key={e.title} className="edu-card">
            <span className="year">{e.year}</span>
            <h3>{e.title}</h3>
            <p>{e.place}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ResumeBox() {
  return (
    <section id="resume" className="section">
      <Reveal className="resume-box">
        <h2 className="title">My Resume</h2>
        <p>
          Explore my skills, experience and projects in a well-structured PDF. Download it to know more about how I can
          contribute to your team.
        </p>
        <a href="/documents/Resume.pdf" download className="btn primary">
          <i className="fa-solid fa-download"></i> Download Resume
        </a>
      </Reveal>
    </section>
  );
}
