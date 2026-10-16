// Cleans the project form data sent from the admin panel.
export function cleanProject(body) {
  const tags = Array.isArray(body.tags)
    ? body.tags
    : String(body.tags || "")
        .split(",");
  return {
    title: String(body.title || "").trim(),
    org: String(body.org || "").trim(),
    description: String(body.description || "").trim(),
    icon: String(body.icon || "").trim() || "fa-solid fa-laptop-code",
    tags: tags.map((t) => String(t).trim()).filter(Boolean),
    github: String(body.github || "").trim(),
    live: String(body.live || "").trim(),
    order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
  };
}

const isUrl = (v) => !v || /^https?:\/\//i.test(v);

export function validateProject(p) {
  if (!p.title || !p.description) return "Title and description are required.";
  if (!isUrl(p.github) || !isUrl(p.live)) return "GitHub / Live links must start with http:// or https://";
  return null;
}
