import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nandini Shrimangle | MERN Stack & Java Full Stack Developer - Bengaluru",
  description:
    "Nandini Shrimangle - MERN Stack (MongoDB, Express.js, React.js, Node.js) and Java Full Stack Developer from Bengaluru. View projects, skills, experience and resume.",
  keywords: [
    "Nandini Shrimangle",
    "Nandini Umakant Shrimangle",
    "MERN stack developer",
    "Java full stack developer",
    "software developer Bengaluru",
    "React developer",
    "Node.js developer",
    "Next.js developer",
    "portfolio",
  ],
  authors: [{ name: "Nandini Shrimangle" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Nandini Shrimangle | MERN Stack & Java Full Stack Developer",
    description: "MERN Stack and Java Full Stack Developer from Bengaluru. See my projects, skills and resume.",
    url: "/",
  },
  twitter: { card: "summary" },
  // After adding your site to Google Search Console, put the verification code in .env.local
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230a0a0a'/%3E%3Ctext x='50' y='68' font-size='56' font-family='Arial' font-weight='700' text-anchor='middle' fill='white'%3EN%3C/text%3E%3C/svg%3E",
  },
};

export const viewport = { themeColor: "#0a0a0a", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nandini Umakant Shrimangle",
  alternateName: "Nandini Shrimangle",
  jobTitle: "MERN Stack & Java Full Stack Developer",
  email: "mailto:Shrimangalenandini28@gmail.com",
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
  alumniOf: "Yashoda Technical Campus, Satara",
  knowsAbout: ["MongoDB", "Express.js", "React.js", "Node.js", "Next.js", "Java", "SQL", "MySQL", "JavaScript", "HTML", "CSS"],
  sameAs: ["https://github.com/shrimangle", "https://linkedin.com/in/nandini-shrimangale-3b8450273"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
