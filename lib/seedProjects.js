// Starting projects. Saved into MongoDB the first time the site connects. Manage them later from /admin.
const seedProjects = [
  {
    title: "MV Tech",
    org: "Excerpt Technologies",
    description:
      "A full stack application with a dedicated admin panel for managing the platform. Worked on both the user-facing interface and the admin side.",
    icon: "fa-solid fa-laptop-code",
    tags: ["Full Stack", "Java", "Admin Panel"],
    github: "",
    live: "",
    order: 1,
  },
  {
    title: "Bank Zone",
    org: "Excerpt Technologies",
    description:
      "A full stack banking application with secure authentication and authorization. Implemented multiple user roles with role-based access to features.",
    icon: "fa-solid fa-building-columns",
    tags: ["Full Stack", "Authentication", "Role-Based Access"],
    github: "",
    live: "",
    order: 2,
  },
  {
    title: "Dentist Website",
    org: "Personal Project",
    description:
      "A responsive dental clinic website with service pages, appointment information and contact details.",
    icon: "fa-solid fa-tooth",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "",
    live: "",
    order: 3,
  },
];
export default seedProjects;
