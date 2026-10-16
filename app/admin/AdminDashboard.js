"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const emptyProject = { title: "", org: "", description: "", icon: "fa-solid fa-laptop-code", tags: "", github: "", live: "", order: 0 };

const fmt = (d) =>
  new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function AdminDashboard({ email }) {
  const router = useRouter();
  const [tab, setTab] = useState("messages");
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [dbConnected, setDbConnected] = useState(true);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(null); // opened message id
  const [editing, setEditing] = useState(null); // project form data (with _id when editing)

  const flash = (text) => {
    setNote(text);
    setTimeout(() => setNote(""), 3500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [m, p] = await Promise.all([
        fetch("/api/admin/messages").then((r) => (r.status === 401 ? null : r.json())),
        fetch("/api/admin/projects").then((r) => (r.status === 401 ? null : r.json())),
      ]);
      if (!m || !p) {
        router.replace("/login");
        return;
      }
      setMessages(m.messages || []);
      setProjects(p.projects || []);
      setDbConnected(Boolean(m.dbConnected && p.dbConnected));
    } catch {
      flash("Could not load data.");
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const unread = useMemo(() => messages.filter((m) => !m.read).length, [messages]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  };

  // ----- messages -----
  const toggleRead = async (m, read) => {
    const res = await fetch(`/api/admin/messages/${m._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    if (res.ok) setMessages((list) => list.map((x) => (x._id === m._id ? { ...x, read } : x)));
  };

  const openMessage = (m) => {
    setOpen(open === m._id ? null : m._id);
    if (!m.read) toggleRead(m, true);
  };

  const deleteMessage = async (m) => {
    if (!confirm(`Delete the message from ${m.name}?`)) return;
    const res = await fetch(`/api/admin/messages/${m._id}`, { method: "DELETE" });
    if (res.ok) {
      setMessages((list) => list.filter((x) => x._id !== m._id));
      flash("Message deleted.");
    } else flash("Could not delete.");
  };

  // ----- projects -----
  const startEdit = (p) => setEditing({ ...p, tags: (p.tags || []).join(", ") });

  const saveProject = async (e) => {
    e.preventDefault();
    const isEdit = Boolean(editing._id);
    const res = await fetch(isEdit ? `/api/admin/projects/${editing._id}` : "/api/admin/projects", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return flash(data.error || "Could not save project.");
    setEditing(null);
    flash(isEdit ? "Project updated." : "Project added.");
    load();
  };

  const deleteProject = async (p) => {
    if (!confirm(`Delete project "${p.title}"?`)) return;
    const res = await fetch(`/api/admin/projects/${p._id}`, { method: "DELETE" });
    if (res.ok) {
      flash("Project deleted.");
      load();
    } else flash("Could not delete.");
  };

  const set = (k) => (e) => setEditing({ ...editing, [k]: e.target.value });

  return (
    <div className="adm">
      <header className="adm-top">
        <div>
          <strong className="adm-brand">Nandini<span>.</span> Admin</strong>
          <span className="adm-muted adm-email">{email}</span>
        </div>
        <div className="adm-actions">
          <a href="/" target="_blank" rel="noopener noreferrer" className="adm-link">
            <i className="fa-solid fa-arrow-up-right-from-square"></i> View site
          </a>
          <button className="adm-btn" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </header>

      <main className="adm-main">
        {!dbConnected && (
          <div className="adm-warn">
            MongoDB is not connected. Add <code>MONGODB_URI</code> in <code>.env.local</code> (or your hosting
            environment variables) to save messages and edit projects.
          </div>
        )}
        {note && <div className="adm-note">{note}</div>}

        <div className="adm-cards">
          <div className="adm-card"><h3>{messages.length}</h3><p>Total messages</p></div>
          <div className="adm-card"><h3>{unread}</h3><p>Unread</p></div>
          <div className="adm-card"><h3>{projects.length}</h3><p>Projects</p></div>
        </div>

        <div className="adm-tabs">
          <button className={tab === "messages" ? "on" : ""} onClick={() => setTab("messages")}>
            Messages {unread > 0 && <span className="adm-badge">{unread}</span>}
          </button>
          <button className={tab === "projects" ? "on" : ""} onClick={() => setTab("projects")}>Projects</button>
        </div>

        {loading && <p className="adm-muted">Loading...</p>}

        {/* ---------- MESSAGES ---------- */}
        {!loading && tab === "messages" && (
          <div className="adm-list">
            {messages.length === 0 && <p className="adm-muted">No messages yet.</p>}
            {messages.map((m) => (
              <div key={m._id} className={`adm-msg ${m.read ? "" : "unread"}`}>
                <div className="adm-msg-head" onClick={() => openMessage(m)}>
                  <div>
                    <strong>{m.name}</strong> <span className="adm-muted">&lt;{m.email}&gt;</span>
                    <div className="adm-muted adm-small">{fmt(m.createdAt)}</div>
                  </div>
                  <i className={open === m._id ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i>
                </div>
                {open === m._id && (
                  <div className="adm-msg-body">
                    <p>{m.message}</p>
                    <div className="adm-row">
                      <a className="adm-btn" href={`mailto:${m.email}?subject=Re: your message`}>
                        <i className="fa-solid fa-reply"></i> Reply
                      </a>
                      <button className="adm-btn" onClick={() => toggleRead(m, !m.read)}>
                        Mark as {m.read ? "unread" : "read"}
                      </button>
                      <button className="adm-btn danger" onClick={() => deleteMessage(m)}>
                        <i className="fa-solid fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ---------- PROJECTS ---------- */}
        {!loading && tab === "projects" && (
          <div>
            <div className="adm-row adm-between">
              <h2 className="adm-h2">Projects</h2>
              <button className="adm-btn primary" disabled={!dbConnected} onClick={() => setEditing({ ...emptyProject, order: projects.length + 1 })}>
                <i className="fa-solid fa-plus"></i> Add project
              </button>
            </div>

            <div className="adm-list">
              {projects.map((p) => (
                <div key={p._id} className="adm-msg">
                  <div className="adm-msg-head" style={{ cursor: "default" }}>
                    <div>
                      <strong><i className={p.icon}></i> {p.title}</strong>{" "}
                      <span className="adm-muted">{p.org}</span>
                      <div className="adm-muted adm-small">{(p.tags || []).join(" · ")}</div>
                    </div>
                    <div className="adm-row">
                      <button className="adm-btn" disabled={!dbConnected} onClick={() => startEdit(p)}>Edit</button>
                      <button className="adm-btn danger" disabled={!dbConnected} onClick={() => deleteProject(p)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ---------- PROJECT FORM (modal) ---------- */}
      {editing && (
        <div className="adm-modal" onClick={() => setEditing(null)}>
          <form className="adm-modal-card" onClick={(e) => e.stopPropagation()} onSubmit={saveProject}>
            <h2 className="adm-h2">{editing._id ? "Edit project" : "Add project"}</h2>

            <label>Title *</label>
            <input value={editing.title} onChange={set("title")} required maxLength={120} />

            <label>Company / type</label>
            <input value={editing.org} onChange={set("org")} placeholder="e.g. Personal Project" maxLength={120} />

            <label>Description *</label>
            <textarea rows={4} value={editing.description} onChange={set("description")} required maxLength={1000} />

            <label>Tags (comma separated)</label>
            <input value={editing.tags} onChange={set("tags")} placeholder="React, Node.js, MongoDB" />

            <label>Icon (Font Awesome class)</label>
            <input value={editing.icon} onChange={set("icon")} placeholder="fa-solid fa-laptop-code" />

            <div className="adm-two">
              <div>
                <label>GitHub link</label>
                <input value={editing.github} onChange={set("github")} placeholder="https://github.com/..." />
              </div>
              <div>
                <label>Live link</label>
                <input value={editing.live} onChange={set("live")} placeholder="https://..." />
              </div>
            </div>

            <label>Order (1 shows first)</label>
            <input type="number" value={editing.order} onChange={set("order")} />

            <div className="adm-row" style={{ marginTop: 14 }}>
              <button type="submit" className="adm-btn primary">Save</button>
              <button type="button" className="adm-btn" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
