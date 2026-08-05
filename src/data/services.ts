export interface Service {
  eyebrow: string;
  icon: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    eyebrow: "01",
    icon: "📋",
    title: "Project Management",
    description:
      "We define product goals, prioritize features, and guide projects from concept to launch.",
  },
  {
    eyebrow: "02",
    icon: "💻",
    title: "Development",
    description:
      "We build scalable and reliable web applications using modern technologies and best practices.",
  },
  {
    eyebrow: "03",
    icon: "🎨",
    title: "Design Collaboration",
    description:
      "We collaborate with designers to create intuitive, accessible, and visually engaging user experiences.",
  },
  {
    eyebrow: "04",
    icon: "🛠️",
    title: "Internal AD Support",
    description:
      "We support internal teams by providing tools, systems, and technical guidance to improve workflows.",
  },
];
