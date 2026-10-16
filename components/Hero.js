"use client";
import { roles, SITE } from "@/lib/content";
import { useTyping } from "./hooks";
import Reveal from "./Reveal";

export default function Hero() {
  const typed = useTyping(roles);

  return (
    <section id="intro" className="hero">
      <Reveal className="hero-text">
        <p className="hello">Hello, I&apos;m</p>
        <h1>{SITE.name}</h1>
        <h2>
          <span>{typed}</span>
          <span className="cursor">|</span>
        </h2>
        <p className="hero-desc">
          Computer Science Engineering student and MERN Stack (MongoDB, Express.js, React.js, Node.js) and Java Full
          Stack developer. I build responsive, full stack web applications and love turning ideas into working
          products.
        </p>
        <div className="btns">
          <a href="#work" className="btn primary">See Projects</a>
          <a href="#reach-out" className="btn">Contact Me</a>
        </div>
        <div className="socials">
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href={`mailto:${SITE.email}`} aria-label="Email">
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
      </Reveal>
      <Reveal className="hero-img">
        <div className="img-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/photo.png" alt="Nandini Shrimangle" />
        </div>
      </Reveal>
    </section>
  );
}
