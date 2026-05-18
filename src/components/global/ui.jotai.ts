import { atom } from "jotai";

export type SectionKey = "about" | "services" | "works" | "contact" | null;

export const CONTENT = {
  about: {
    label: "About Us",
    tagline: "We build the web's most immersive experiences.",
    body: [
      "Visualab is a creative web studio focused on building immersive digital experiences for modern brands. We combine strategy, design, and technology to create websites that feel interactive, cinematic, and memorable.",
      "Our work sits at the intersection of design and development, with a strong focus on WebGL, Three.js, motion design, and high-performance front-end engineering.",
      "We work with startups, agencies, and established companies that want more than a standard website.",
    ],
    list: [
      "Creative Website Design",
      "3D Web Experiences",
      "Interactive Product Configurators",
      "Motion Design & Animation",
      "Front-End Development",
      "UX/UI Design",
      "WebXR, AR & VR Experiences",
    ],
  },
  services: {
    label: "Services",
    tagline: "From pixels to polygons — everything in between.",
    items: [
      {
        title: "3D Website Development",
        desc: "Immersive websites powered by Three.js and WebGL, featuring interactive scenes, custom shaders, and smooth animations.",
        icon: "⬡",
      },
      {
        title: "Creative Web Design",
        desc: "Modern UI/UX design tailored to your brand, focused on storytelling, performance, and user engagement.",
        icon: "◈",
      },
      {
        title: "Product Configurators",
        desc: "Interactive tools that allow users to customize products in real time, ideal for furniture, windows, doors, and e-commerce.",
        icon: "◎",
      },
      {
        title: "Motion Design",
        desc: "GSAP-based animations, scroll-triggered effects, and transitions that bring interfaces to life.",
        icon: "◬",
      },
      {
        title: "WebXR, AR & VR",
        desc: "Extended reality experiences that let users explore products and environments directly in the browser.",
        icon: "◉",
      },
      {
        title: "Front-End Development",
        desc: "Clean, scalable interfaces built with React, Next.js, and modern web technologies.",
        icon: "⬢",
      },
      {
        title: "Brand Experiences",
        desc: "Campaign microsites, product launches, and digital activations designed to leave a strong impression.",
        icon: "◆",
      },
    ],
  },
  works: {
    label: "Selected Works",
    tagline: "A curated collection of digital craft.",
    items: [
      {
        title: "AeroVanta",
        desc: "A futuristic drone showcase website featuring cinematic scroll animations and real-time 3D product exploration.",
        tag: "WebGL · GSAP",
      },
      {
        title: "Lazyflix",
        desc: "A Netflix-inspired platform with animated transitions, dynamic content, and a custom admin dashboard.",
        tag: "React · Motion",
      },
      {
        title: "Gentlerain",
        desc: "A luxury registration experience with smooth motion design and premium visual storytelling.",
        tag: "Three.js · GSAP",
      },
      {
        title: "CIITM College Platform",
        desc: "A complete educational website with a modern interface and scalable architecture.",
        tag: "Next.js · CMS",
      },
      {
        title: "Product Configurator",
        desc: "A real-time 3D customization tool for windows, doors, and architectural products.",
        tag: "WebGL · R3F",
      },
      {
        title: "Recokus Clone",
        desc: "An Awwwards-inspired creative website built with React, GSAP, and advanced motion interactions.",
        tag: "React · GSAP",
      },
    ],
  },
  contact: {
    label: "Contact",
    tagline: "Let's build something extraordinary.",
    details: [
      {
        label: "Email",
        value: "hello@visualab.studio",
        href: "mailto:hello@visualab.studio",
      },
      { label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
      { label: "Location", value: "Delhi, India", href: null },
      {
        label: "Website",
        value: "visualab.studio",
        href: "https://visualab.studio",
      },
    ],
  },
};

export const UIAtom = atom<{
  current: SectionKey;
  contents: typeof CONTENT;
}>({
  current: null,
  contents: CONTENT,
});
