import {
  azuga,
  Dashboard,
  Editor,
  NoImage,
  TCS,
  Telehealth,
  Ticket,
  url,
} from "@/assets";

/* ================================================================== */
/*  DATA                                                                */
/* ================================================================== */

const about = {
  overview1: `I am a dedicated and versatile full-stack developer with over 5 years of experience in designing and developing web applications, hybrid mobile apps, and other cutting-edge technologies. I have a strong background in various programming languages, frameworks, and emerging technologies, allowing me to create robust and scalable solutions across different platforms.`,
  overview2: `  I graduated with a B.Tech in Computer Science from the Government College of Engineering, Amravati, in 2021. My passion is centered on distributed systems, system design, and full-stack development. I enjoy pushing the limits of technology, constantly learning new tools and techniques to stay ahead in the field.  `,
  overview3: `  Driven by a commitment to excellence and a keen attention to detail, I aim to create impactful solutions that exceed expectations. I’m always eager to explore the latest advancements in technology, continuously growing my skills to deliver outstanding results in every project.`,
};

const projects = [
  {
    title: "pg-stats-cli",
    description:
      "pg-stats-cli is a Node.js command-line tool for inspecting PostgreSQL health, surfacing actionable performance findings, and helping manage useful extensions. It provides a quick overview of the database's health and performance, making it easier for developers and database administrators to identify and address potential issues.",
    tags: ["npm", "nodejs", "postgresql", "cli"],
    image: NoImage,
    source_code_link: [
      "https://github.com/patlepranay/pg-stats-cli",
    ],
    deploy_link: "https://www.npmjs.com/package/pg-stats-cli",
  },
  {
    title: "Telehealth Consultation",
    description:
      "A web-based platform tailored for hospitals integrates a video calling feature for appointments and addresses the requirement for a centralized repository managing both appointment schedules and patient medical histories. The inclusion of a single-page application enhances the overall user experience, providing a seamless and efficient interface. ",
    tags: ["react", "express", "materialUI", "socket.io"],
    image: Telehealth,
    source_code_link: [
      "https://github.com/patlepranay/major-project-front",
      "https://github.com/patlepranay/major-project-back",
    ],
    deploy_link: "https://major-project-2021.netlify.app/",
  },
  {
    title: "Whatsapp Web Bulk Sender",
    description:
      "Application for web automation based on Python with a GUI, enabling users to send customized messages to thousands in a single operation. Ideal for replacing broadcast messages in Whatsapp, application offers a user-friendly interface for efficient communication.",
    tags: ["python", "tkinter", "selenium"],
    image: NoImage,
  },
  {
    title: "Realtime Note Editor",
    description:
      "Developed an intuitive online editor using NextJS, facilitating document publishing and secure note creation. Implemented a real-time database with Convex, integrated social media login through Clerk, and employed Shadcn and Tailwind for seamless UI components. Additionally, the editing functionality was optimized using BlockNote, resulting in a user-friendly platform with advanced features for a streamlined document creation experience..",
    tags: ["nextjs", "clerk", "tailwind", "blocknote"],
    image: Editor,
    source_code_link: ["https://github.com/patlepranay/notion"],
    deploy_link: "https://noteapp-mu.vercel.app/",
  },
  {
    title: "Ticket Booking Application",
    description:
      "An event booking and registration application that serves as a comprehensive platform for hosting events and facilitating ticket reservations. The application offers users a seamless experience to both organize and participate in events. To enhance user convenience, a secure payment gateway has been integrated, leveraging Stripe for efficient and reliable financial transactions..",
    tags: ["nextjs", "clerk", "prisma", "shadcn"],
    image: Ticket,
    source_code_link: ["https://github.com/patlepranay/event-manager"],
    deploy_link: "https://event-manager-khaki-zeta.vercel.app/",
  },
  {
    title: "Realtime React Dashboard",
    description:
      " Dynamic real-time data dashboard, showcasing information through visually appealing charts and graphs. This interactive platform not only provides a comprehensive view of data but also incorporates the capability to update information in real-time, thanks to the integration of Socket.IO. The user-friendly interface ensures a seamless experience for monitoring and analyzing data trends, making it a valuable tool for decision-makers and analysts alike.",
    tags: ["react", "express", "socket.io", "tremor", "shadcn"],
    image: Dashboard,
    source_code_link: [
      "https://github.com/patlepranay/react-dashboard-front",
      "https://github.com/patlepranay/react-dashboard-back",
    ],
    deploy_link: "https://react-live-dashboard.netlify.app/",
  },
  {
    title: "Url Shortner App",
    description:
      " Comprehensive URL Shortener Application capable of generating short URLs from long ones. The application offers the flexibility to customize short URLs. Additionally, it includes functionality for users to monitor the performance of their shortened links, providing valuable insights for thorough analysis",
    tags: ["react", "express", "zustand", "mongodb", "shadcn"],
    image: url,
    source_code_link: [
      "https://github.com/patlepranay/url-shortner-front",
      "https://github.com/patlepranay/url-shortner-back",
    ],
    deploy_link: "https://url-short-app.vercel.app/",
  },
];

const works = {
  title: `Ever since my college days, I've immersed myself in development,
          relishing hands-on experiences across various domains. The projects
          below represent not only my completed works but also valuable learning
          experiences. These endeavors have not only showcased my skills but
          also served as stepping stones in my continuous journey of growth and
          proficiency. I am enthusiastic about sharing these projects as they
          reflect my passion for hands-on learning and the evolving nature of my
          expertise.`,
};

const workExp = [
  {
    jobTitle: "Senior Software Engineer",
    companyName: "Azuga Telematics, Bangalore-Remote",
    date: `Nov 24 to Present`,
    details: [
      "Building telematics analytics platform using React and Django, delivering real-time insights and reporting capabilities for end users.",
      "Unified Power BI dashboards and custom APIs into a single responsive web interface, centralizing data visualization and decision - making tools.",
      "Designed and implemented a scalable AWS Step Functions and Lambda-based data pipeline, supporting automated ingestion and processing of data from multiple third - party telematics service providers(TSPs).",
      "Optimized PostgreSQL for time-series data by introducing advanced indexing and partitioning strategies, resulting in up to 100x faster query performance and dramatically improved frontend load times.",
    ],
    icon: azuga,
  },
  {
    jobTitle: "System Engineer : Full Stack Developer",
    companyName: "Tata Consultancy Services, Pune",
    date: `Jul 21 to Nov 24`,
    details: [
      "In my capacity as a Full Stack Developer, I manage and develop frontend interfaces, backend processes, and database structures, ensuring that all components work harmoniously together for a fluid and efficient application experience.",
      "Leading the backend engineering for a client project, tasks include designing database models and APIs to extrapolate essential information from raw data.",
      "Effectively managed an 8-member team and oversaw stand-up calls, client interactions, code reviews, and project strategies.",
      "Migrated legacy desktop applications into modern, responsive single-page applications using React hence enhancing user experience and improved accessibility.",
      " Proficiently implemented REST APIs along with the integration of AWS cloud services and authentication middleware.",
      " Enhanced system performance, leading to a 50% decrease in execution time. Additionally, played an active role in service deployment in Openshift with Jenkins CI/CD.",
      "Developed a hybrid web/mobile application to implement offline capabilities, refined synchronization processes, and resolved complex scalability issues, resulting in the improvement of network efficiency and overall performance.",
    ],
    icon: TCS,
  },
];

const lastUpdated = "08 Aug 2026";

const techStack = {
  languages: ["JavaScript", "C#", "Python", "Java"],
  frameworks: ["React", "NextJS", "Express", "Node JS", ".NET Core", "Angular 9"],
  technologies: ["AWS", "GCP", "Jenkins", "Docker", "Git", "Clerk", "Prisma"],
  misc: ["MSSQL", "MongoDB", "PostgreSQL", "HTML5", "CSS", "ShadCN", "Tailwind CSS"],
};

const allTech = Object.values(techStack).flat();

/* ================================================================== */
/*  SITE CONTENT — edit everything editable here.                       */
/*  Sections read from these exports; tweak copy in one place.          */
/* ================================================================== */

const resumeUrl = "/Pranay_Patle_Resume.pdf";

/* Public origin. Override with VITE_SITE_URL at build/deploy so the
   sitemap + canonical/OG URLs point at the real domain. */
const SITE_URL = (import.meta.env?.VITE_SITE_URL || "https://pranaypatle.dev").replace(/\/$/, "");

/* Absolute URL for social cards. logo.png is copied to public/ for a stable
   absolute URL. */
const ogImage = `${SITE_URL}/logo.png`;

/* Section ordering doubles as page order — nav, routing + sitemap follow this. */
const navItems = [
  { label: "Home", id: "home", path: "/" },
  { label: "About", id: "about", path: "/about" },
  { label: "Experience", id: "experience", path: "/experience" },
  { label: "Tech", id: "tech", path: "/tech" },
  { label: "Work", id: "projects", path: "/work" },
  { label: "Contact", id: "contact", path: "/contact" },
];

/* Per-route SEO — title/description/canonical-path used by <Seo> + sitemap. */
const seo = {
  home: {
    title: "Pranay Patle · Full-Stack Software Engineer",
    desc: "Pranay Patle is a full-stack software engineer building scalable web applications, real-time products and cloud systems.",
  },
  about: {
    title: "About · Pranay Patle — Full-Stack Engineer",
    desc: "5+ years designing and building web apps, hybrid mobile apps and distributed systems. B.Tech CSE, GCOE Amravati.",
  },
  experience: {
    title: "Experience · Pranay Patle — Full-Stack Engineer",
    desc: "Senior Software Engineer at Azuga Telematics and System Engineer at Tata Consultancy Services. Full-stack engineering experience.",
  },
  tech: {
    title: "Tech Stack · Pranay Patle",
    desc: "Languages, frameworks and tools I use daily — JavaScript, React, NextJS, Node, AWS, GCP and more.",
  },
  projects: {
    title: "Work · Pranay Patle — Projects",
    desc: "Selected projects and builds by Pranay Patle — CLI tools, realtime apps, dashboards and full-stack products.",
  },
  contact: {
    title: "Contact · Pranay Patle",
    desc: "Have a role, an idea, or a tricky system-design problem? Reach out — pranayhpatle@gmail.com.",
  },
};

/* Section headings — eyebrow/index/title per section. */
const headings = {
  about: { index: "01", eyebrow: "Behind the code", title: "About Me" },
  experience: { index: "02", eyebrow: "Battle tested", title: "Career Log" },
  tech: { index: "03", eyebrow: "Weapons of choice", title: "Tech Arsenal" },
  works: { index: "04", eyebrow: "Things shipped", title: "Build Log" },
  contact: { index: "05", eyebrow: "Your move", title: "Let's Connect" },
};

/* Hero — giant name, kicker line, HUD stat strip, CTAs, bottom bar. */
const hero = {
  kicker: {
    prefix: "▸",
    role: "full-stack software engineer",
    divider: "//",
    extras: "web · cloud · ai",
  },
  firstName: "Pranay",
  lastName: "Patle",
  hud: [
    { value: "5+ yrs", text: " shipping products" },
    { sep: true },
    { text: "building things that scale" },
    { sep: true, hide: true },
    { text: "performance optimization", hide: true },
    { sep: true, hide: true },
    { text: "event-driven systems ", hide: true },
  ],
  scrollText: "build - ship - scale - repeat",
  metaText: "2D · 2026",
  cta: [
    { kind: "primary", label: "view work", href: "/work" },
    { kind: "outline", label: "contact me", href: "/contact" },
    { kind: "link", label: "resume ↗", href: resumeUrl, external: true },
  ],
};

/* About — quick-fact cards + focus-area chips. `icon` maps to a lucide
   component in the section: role → Cog, based → MapPin, education → GraduationCap. */
const aboutFacts = [
  { icon: "role", label: "Role", value: "Senior Software Engineer · Full Stack" },
  { icon: "based", label: "Based", value: "Remote · Bengaluru, India" },
  { icon: "education", label: "Education", value: "B.Tech CSE · GCOE Amravati, 2021" },
];
const focusAreas = [
  "Distributed systems",
  "System design",
  "Real-time apps",
  "Cloud",
  "Full-stack",
];

/* Tech groups — labels paired with techStack keys by order below. */
const techGroups = [
  { key: "languages", label: "Languages" },
  { key: "frameworks", label: "Frameworks" },
  { key: "technologies", label: "Technologies" },
  { key: "misc", label: "Tools & Data" },
];

/* Contact — copy + reach links. */
const contact = {
  intro: `Have a role, an idea, or a tricky system-design problem? My inbox is always open — let's build something great.`,
  email: "pranayhpatle@gmail.com",
  phone: "+91 81808 75642",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/pranayhpatle/" },
    { label: "Instagram", href: "https://www.instagram.com/campooter_ng_near/" },
    { label: "GitHub", href: "https://github.com/patlepranay" },
    { label: "LeetCode", href: "https://leetcode.com/u/pranay29/" },
  ],
  form: {
    nameLabel: "Your name",
    namePlaceholder: "Michael Scott",
    emailLabel: "Your email",
    emailPlaceholder: "michael@dundermifflin.com",
    messageLabel: "Message",
    messagePlaceholder: "World's Best Boss",
    submit: "Send message",
    sending: "Sending…",
  },
};

/* Footer copy. */
const footer = {
  marker: "✱",
  builtWith: "built with",
  by: "by",
  name: "Pranay Patle",
  source: "Source",
  sourceHref: "https://github.com/patlepranay/developer_portfolio",
  updatedLabel: "Last updated",
};

export {
  workExp,
  about,
  projects,
  works,
  lastUpdated,
  techStack,
  allTech,
  resumeUrl,
  SITE_URL,
  ogImage,
  navItems,
  seo,
  headings,
  hero,
  aboutFacts,
  focusAreas,
  techGroups,
  contact,
  footer,
};
