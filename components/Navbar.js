"use client";
import { useState } from "react";
import { navLinks } from "@/lib/content";
import { useActiveSection } from "./hooks";

const ids = navLinks.map((l) => l.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  return (
    <header className="navbar">
      <a href="#intro" className="logo">
        Nandini<span>.</span>
      </a>
      <button className="menu-btn" aria-label="Menu" onClick={() => setOpen(!open)}>
        <i className={open ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </button>
      <nav className={open ? "open" : ""}>
        {navLinks.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={active === l.id ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
