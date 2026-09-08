# Portfolio Website

Welcome to the repository for my portfolio website! This project showcases my skills, projects, and experiences in a visually appealing and interactive manner.

## Technologies Used
- ReactJs
- ShadCN UI
- TailwindCSS
- Framer Motion
- EmailJs

## Getting Started
To run this project locally, follow these steps:

1. **Clone the Repository:**
git clone https://github.com/patlepranay/developer_portfolio.git

2. **Navigate to the Project Directory:**
cd developer_portfolio


3. **Install Dependencies:**
npm install

4. **Set Environment Variables:**
Copy `.env.example` to `.env` and fill in your values:
cp .env.example .env
The file is git-ignored. Do not commit `.env`.

5. **Start the Development Server:**
npm run dev


5. **Open Your Browser:**
Visit [http://localhost:5173](http://localhost:5173) to view the website.

## Features
- Responsive design, ensuring optimal viewing experience across various devices.
- Minimal Design.
- Smooth navigation and transitions.
- Easy customization for personalization.
- Dedicated Contact Service.

## Security & Deploy notes

- **"Secrets" off the frontend.** The EmailJS service/template IDs and Public key
  are *client-side by design* (EmailJS serves them to the browser) — they are not
  real secrets. They live in the git-ignored `.env` and are inlined by Vite at
  build. To lock them down, set an **Allowed Origins** allow-list for your template
  in the EmailJS dashboard so only your domain can send. Google Analytics uses a
  non-secret measurement ID also held in `.env`.
- **HTTPS.** Forced automatically by the hosting platform (Vercel serves every
  deployment over TLS and redirects HTTP). Set the domain's `HTTP to HTTPS`
  redirect in Vercel project settings.
- **HSTS & security headers** are applied via `vercel.json`.
- **SEO.** Per-page titles/descriptions/OG/Twitter tags are rendered by
  `src/components/seo/Seo.jsx` and baked into static HTML at build
  (`npm run build`), which also writes `sitemap.xml`, `robots.txt` and `404.html`.
- **Contact form** validates on the client (required fields, email format) and uses
  an invisible honeypot field to silently drop bot submissions.

## Build
`npm run build` runs the client build, the SSR build, then the prerender step that
writes static HTML per route + `sitemap.xml` + `robots.txt` + `404.html`.

## Contact
If you have any questions or need further assistance, feel free to contact me at [pranayhpatle@gmail.com](mailto:pranayhpatle@gmail.com).

Thank you for visiting my portfolio repository! 🚀
