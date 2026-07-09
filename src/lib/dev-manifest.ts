export const STACK: Array<[string, string]> = [
  ["TanStack Start", "React 19 full-stack framework, file-based routing, SSR."],
  ["TypeScript", "End-to-end type safety from server functions to JSX."],
  ["Tailwind CSS v4", "Design tokens via @theme, glass utilities, custom variants."],
  ["Framer Motion", "Layout, gesture, and AnimatePresence transitions."],
  ["Cinematic easing", "Apple-tuned curves [0.16, 1, 0.3, 1] across every motion."],
  ["React Three Fiber", "Declarative WebGL — hero torus, transmission material."],
  ["@react-three/drei", "Environment, Float, MeshTransmissionMaterial."],
  ["Lenis", "Smooth scroll with reduced-motion fallback."],
  ["i18next + react-i18next", "AR / EN, with full RTL flip."],
  ["Vercel Analytics + Speed Insights", "Privacy-first product telemetry."],
  ["Zod", "Schema validation for the contact form."],
];

export const ARCH: string[] = [
  "src/routes — file-based routing (TanStack)",
  "src/components — design-system primitives",
  "src/lib — i18n, theme, data, utils",
  "src/locales — en.json, ar.json",
  "src/assets — case-study media",
  "Deployment — Vercel (TanStack Start preset)",
];

export const ROUTES: string[] = [
  "/",
  "/about",
  "/projects",
  "/projects/$slug",
  "/contact",
  "/dev",
];
