import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { About, Skills, Experience, Education, ResumeBox } from "@/components/Sections";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { getProjects } from "@/lib/projects";

// Rebuilt at most once a minute; the admin panel also refreshes it instantly when you edit projects.
export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects projects={projects} />
        <Education />
        <ResumeBox />
        <Contact />
      </main>
      <footer>
        <p>
          &copy; {new Date().getFullYear()} Nandini Shrimangle. All rights reserved. ·{" "}
          <a href="/login" style={{ opacity: 0.45 }}>Admin</a>
        </p>
      </footer>
    </>
  );
}
