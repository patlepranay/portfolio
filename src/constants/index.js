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

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

// const about = {
//   overview: `Passionate full-stack developer with three years of
// professional experience in developing and managing
// applications, web apps, and much more. Well-versed in
// a range of programming languages, frameworks, and
// database technologies and able to rapidly learn new
// technologies. Great at problem-solving and analytical
// thinking.`
// };
const about = {
  overview1: `I am a dedicated and versatile full-stack developer with over three years of experience in designing and developing web applications, hybrid mobile apps, and other cutting-edge technologies. I have a strong background in various programming languages, frameworks, and emerging technologies, allowing me to create robust and scalable solutions across different platforms.`,
  overview2: `  I graduated with a B.Tech in Computer Science from the Government College of Engineering, Amravati, in 2021. My passion is centered on distributed systems, system design, and full-stack development. I enjoy pushing the limits of technology, constantly learning new tools and techniques to stay ahead in the field.  `,
  overview3: `  Driven by a commitment to excellence and a keen attention to detail, I aim to create impactful solutions that exceed expectations. I’m always eager to explore the latest advancements in technology, continuously growing my skills to deliver outstanding results in every project.`,
};

const projects = [
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
    jobTitle: "Software Engineer : Full Stack Developer",
    companyName: "Azuga Telematics, Bangalore",
    date: `Nov 24 to Present`,
    details: [
      "Working as a Full Stack Developer, actively contributing to the development and enhancement of the company owned web application.",
      "Developing end to end data flow and ingestion through different telematics provider leveraging Azure Lambdas and State Machines."
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

const lastUpdated = "21 Sept 2024";
export { workExp, about, projects, works, lastUpdated };
