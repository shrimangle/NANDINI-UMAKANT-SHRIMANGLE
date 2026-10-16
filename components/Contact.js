"use client";
import { useState } from "react";
import { SITE } from "@/lib/content";
import Reveal from "./Reveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Sends the message to /api/contact (saved in MongoDB + emailed to you)
  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: "", text: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not send message.");
      setStatus({ type: "ok", text: data.message || "Message sent!" });
      setForm({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      setStatus({ type: "err", text: `${err.message} You can also email me directly at ${SITE.email}` });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="reach-out" className="section">
      <Reveal as="h2" className="title">Let&apos;s Connect</Reveal>
      <div className="contact-grid">
        <Reveal className="contact-info">
          <h3>Want to collaborate?</h3>
          <p>I&apos;m open to entry-level opportunities to learn, build and grow. Feel free to reach out!</p>
          <ul>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <a href={SITE.phoneLink}>{SITE.phone}</a>
            </li>
            <li>
              <i className="fa-solid fa-location-dot"></i> Mahadevapura, Bengaluru
            </li>
            <li>
              <i className="fa-brands fa-github"></i>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer">{SITE.githubLabel}</a>
            </li>
            <li>
              <i className="fa-brands fa-linkedin"></i>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            </li>
          </ul>
        </Reveal>

        <Reveal as="form" className="contact-form" onSubmit={onSubmit}>
          <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={onChange} required maxLength={100} />
          <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={onChange} required maxLength={150} />
          <textarea name="message" rows={5} placeholder="Your Message" value={form.message} onChange={onChange} required maxLength={2000} />
          {/* honeypot: hidden from people, bots fill it */}
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={onChange}
            style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
            aria-hidden="true"
          />
          <button type="submit" className="btn primary" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>
          {status.text && <p className={`form-status ${status.type}`}>{status.text}</p>}
        </Reveal>
      </div>
    </section>
  );
}
