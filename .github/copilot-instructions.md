# Tech Stack

## Overview
Modern, full-featured portfolio website built with React, featuring 3D graphics, smooth animations, and a responsive design system.

---

## Core Technologies

### Runtime & Framework
- **Node.js** - JavaScript runtime environment
- **React** (v18.2.0) - UI library for building interactive components
- **React DOM** (v18.2.0) - React rendering for the browser

### Build Tools & Bundling
- **Vite** (v5.1.3) - Next-generation frontend build tool with fast HMR
- **@vitejs/plugin-react** (v4.2.1) - Vite plugin for React with Fast Refresh support

### Styling
- **Tailwind CSS** (v3.4.1) - Utility-first CSS framework
- **PostCSS** (v8.4.35) - CSS transformation tool
- **Autoprefixer** (v10.4.17) - Automatically adds vendor prefixes to CSS
- **tailwind-merge** (v2.2.1) - Utility function to merge Tailwind CSS classes
- **tailwindcss-animate** (v1.0.7) - Animation utilities for Tailwind CSS
- **clsx** (v2.1.0) - Utility for constructing className strings

### Component Libraries & UI
- **Radix UI** - Headless component library
  - @radix-ui/react-label (v2.0.2)
  - @radix-ui/react-popover (v1.0.7)
  - @radix-ui/react-separator (v1.0.3)
  - @radix-ui/react-slot (v1.0.2)
  - @radix-ui/react-toast (v1.1.5)
- **class-variance-authority** (v0.7.0) - Type-safe component variant management
- **lucide-react** (v0.331.0) - Icon library with React components

### 3D Graphics & Visualization
- **Three.js** (v0.161.0) - 3D JavaScript library
- **@react-three/fiber** (v8.15.16) - React renderer for Three.js
- **@react-three/drei** (v9.97.6) - Useful helpers for react-three-fiber
- **maath** (v0.10.7) - Math utilities for 3D graphics
- **@tsparticles/engine** (v3.3.0) - Particle animation engine
- **@tsparticles/react** (v3.0.0) - React wrapper for tsparticles
- **@tsparticles/slim** (v3.3.0) - Slim version of tsparticles

### Animation & Motion
- **Framer Motion** (v11.0.8) - React animation library with simple API
- **react-tilt** (v1.0.2) - Parallax tilt effect component

### Routing
- **react-router-dom** (v6.22.1) - Client-side routing library
- **react-router-hash-link** (v2.4.3) - Hash link support for React Router

### UI Components
- **react-clock** (v5.1.0) - Customizable clock component
- **react-vertical-timeline-component** (v3.6.0) - Timeline component for displaying chronological data
- **react-resizable-panels** (v2.0.9) - Resizable panel layout components

### Communication & Forms
- **@emailjs/browser** (v4.1.0) - EmailJS SDK for browser-based email sending

### Analytics
- **@vercel/analytics** (v1.2.1) - Analytics integration for Vercel deployments

---

## Development Tools

### Type Checking
- **@types/react** (v18.2.56) - TypeScript definitions for React
- **@types/react-dom** (v18.2.19) - TypeScript definitions for React DOM

### Code Quality & Linting
- **ESLint** (v8.57.0) - JavaScript linter
- **eslint-plugin-react** (v7.33.2) - ESLint plugin for React

### Project Configuration
- **jsconfig.json** - JavaScript configuration with path aliases (@/ for src/)
- **postcss.config.cjs** - PostCSS configuration
- **vite.config.js** - Vite build configuration
- **components.json** - Component configuration (likely for Radix UI setup)
- **vercel.json** - Vercel deployment configuration

---

## Architecture & Features

### Component Structure
```
src/
├── components/          # React components
│   ├── canvas/         # 3D canvas components
│   └── ui/             # Reusable UI components
├── hoc/                # Higher-order components
├── constants/          # Application constants
├── assets/             # Static assets
├── styles.js           # Global styles
└── main.jsx            # Application entry point
```

### Key Capabilities
✨ **3D Graphics** - Interactive 3D scenes using Three.js and react-three-fiber  
🎨 **Animations** - Smooth animations with Framer Motion and Tailwind animations  
📱 **Responsive Design** - Mobile-first design with Tailwind CSS  
🎯 **Component-Driven** - Radix UI headless components with CVA variants  
🔗 **Client-Side Routing** - Hash-based navigation with React Router  
✉️ **Email Integration** - Contact form with EmailJS  
📊 **Analytics** - Vercel Analytics integration  
🎭 **Particle Effects** - Interactive particle animations with tsparticles  

---

## Development Scripts

```bash
npm run dev      # Start development server with Vite (--host for network access)
npm run build    # Build for production
npm run preview  # Preview production build locally
```

---

## Browser Support

- Modern browsers with ES2015+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- Requires JavaScript enabled
- 3D graphics require WebGL support

---

## Performance Optimizations

- **Vite** - Fast HMR and optimized builds
- **Tailwind CSS** - Minimal CSS output with PurgeCSS
- **Code Splitting** - Automatic chunking by Vite
- **Vercel Analytics** - Real user monitoring
- **Lazy Loading** - Component and route-based code splitting potential

---

## Deployment

- **Vercel** - Primary deployment platform (verified by vercel.json)
- **Environment** - Node.js with module-based setup
