/**
 * Portfolio Data
 * Single source of truth for all portfolio content
 */

import type {
  PersonalInfo,
  Experience,
  Writing,
  Speaking,
  Project,
  Education,
  SocialLink,
} from "@/types/portfolio";
import headshot from "@/assets/headshot.jpg.asset.json";

// ===== Portfolio Data =====

export const personalInfo: PersonalInfo = {
  name: "Sarah Martinez",
  title: "Senior Product Manager",
  location: { city: "San Francisco, CA", country: "USA" },
  website: "sarahmartinez.com",
  email: "hello@sarahmartinez.com",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&crop=faces",
  bio: "I'm a product leader with over 10 years of experience building and scaling products that solve real user problems. My approach combines strategic thinking with deep customer empathy, bridging the gap between business objectives and user needs to deliver products that drive meaningful impact.\n\nCurrently leading product at a fast-growing tech startup, I've launched products used by millions of users across web and mobile platforms. I'm passionate about product strategy, data-driven decision making, and mentoring the next generation of product managers.\n\nWhen I'm not building products, you'll find me speaking at conferences, writing about product management, or advising early-stage startups. I believe in giving back to the product community that has given me so much.",
  skills: "Product Strategy, User Research, Data Analysis, A/B Testing, Roadmap Planning, Stakeholder Management, Agile, SQL, Analytics, Customer Discovery, OKRs, Go-to-Market Strategy, Team Leadership, Cross-functional Collaboration",
};

export const experience: Experience[] = [
  {
    id: "exp-1",
    company: "Tech Innovators Inc",
    role: "Senior Product Manager",
    location: "San Francisco, CA",
    startDate: "2021-03",
    endDate: null,
    description: "Led product strategy for flagship platform serving 2M+ active users, growing revenue by 150% YoY. Launched 3 major features that increased user engagement by 40% and reduced churn by 25%. Built and managed cross-functional team of 12 engineers, designers, and analysts. Defined product roadmap and OKRs aligned with company vision.",
    current: true,
  },
  {
    id: "exp-2",
    company: "Growth Analytics Co",
    role: "Product Manager",
    location: "New York, NY",
    startDate: "2018-06",
    endDate: "2021-02",
    description: "Shipped 15+ product initiatives for B2B SaaS platform, increasing ARR by $5M. Led data-driven experimentation program running 50+ A/B tests annually. Collaborated with engineering and design to define and ship quarterly roadmap. Conducted extensive customer research informing product strategy and prioritization.",
    current: false,
  },
  {
    id: "exp-3",
    company: "StartupXYZ",
    role: "Associate Product Manager",
    location: "Austin, TX",
    startDate: "2015-01",
    endDate: "2018-05",
    description: "First product hire, defined product vision and strategy from ground up. Built mobile app that reached #1 in category on Product Hunt with 100K+ downloads. Established product development processes including sprint planning and user feedback loops. Collaborated with founders on fundraising and go-to-market strategy.",
    current: false,
  },
];

export const writing: Writing[] = [
  {
    id: "write-1",
    title: "Building Design Systems That Scale",
    publication: "Smashing Magazine",
    date: "2024-01",
    url: "https://example.com/article-1",
    featured: true,
  },
  {
    id: "write-2",
    title: "The Future of Design Tools: AI and Automation",
    publication: "UX Collective",
    date: "2023-11",
    url: "https://example.com/article-2",
    featured: false,
  },
  {
    id: "write-3",
    title: "Accessibility in Design: Beyond Compliance",
    publication: "A List Apart",
    date: "2023-08",
    url: "https://example.com/article-3",
    featured: false,
  },
  {
    id: "write-4",
    title: "Designing for Mobile: Patterns That Work",
    publication: "CSS-Tricks",
    date: "2023-05",
    url: "https://example.com/article-4",
    featured: false,
  },
  {
    id: "write-5",
    title: "From Developer to Designer: My Journey",
    publication: "Medium",
    date: "2023-02",
    url: "https://example.com/article-5",
    featured: false,
  },
];

export const speaking: Speaking[] = [
  {
    id: "speak-1",
    event: "Design Systems Summit 2024",
    date: "2024-06-15",
    location: "San Francisco, CA",
    talk: "Scaling Design Systems Across Multiple Products",
    description: "A deep dive into building and maintaining design systems that work across multiple product teams and platforms.",
    url: "https://example.com/talk-1",
    recordingUrl: "https://example.com/recording-1",
    slidesUrl: "https://example.com/slides-1",
    upcoming: true,
  },
  {
    id: "speak-2",
    event: "UX Week Conference",
    date: "2023-10-20",
    location: "New York, NY",
    talk: "Bridging Design and Development: A Practical Guide",
    description: "Practical strategies for improving collaboration between design and engineering teams.",
    url: "https://example.com/talk-2",
    recordingUrl: "https://example.com/recording-2",
    upcoming: false,
  },
  {
    id: "speak-3",
    event: "Figma Config",
    date: "2023-06-21",
    location: "Virtual",
    talk: "Building Accessible Components in Figma",
    description: "Learn how to design accessible components from the ground up using Figma.",
    url: "https://example.com/talk-3",
    recordingUrl: "https://example.com/recording-3",
    slidesUrl: "https://example.com/slides-3",
    upcoming: false,
  },
  {
    id: "speak-4",
    event: "Local Design Meetup",
    date: "2023-03-15",
    location: "Austin, TX",
    talk: "Career Growth for Designers: From IC to Leadership",
    description: "Tips and insights on transitioning from individual contributor to design leadership roles.",
    upcoming: false,
  },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "OpenDesign",
    description:
      "Open-source design system components library built with React and TypeScript. Used by 500+ projects worldwide.",
    techStack: ["React", "TypeScript", "Storybook", "CSS-in-JS"],
    liveUrl: "https://opendesign.example.com",
    githubUrl: "https://github.com/example/opendesign",
    status: "active",
  },
  {
    id: "proj-2",
    name: "DesignTools API",
    description:
      "RESTful API for integrating design tools with project management platforms. Automates design handoff workflows.",
    techStack: ["Node.js", "Express", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/example/designtools-api",
    status: "active",
  },
  {
    id: "proj-3",
    name: "ColorPalette Generator",
    description:
      "Accessible color palette generator ensuring WCAG compliance. Generates harmonious color schemes with contrast checking.",
    techStack: ["React", "WebGL", "Color Science"],
    liveUrl: "https://colorpalette.example.com",
    githubUrl: "https://github.com/example/color-palette",
    status: "active",
  },
  {
    id: "proj-4",
    name: "Portfolio Template",
    description:
      "Free portfolio template for designers and developers. Includes dark mode, responsive design, and SEO optimization.",
    techStack: ["Next.js", "Tailwind CSS", "MDX"],
    liveUrl: "https://template.example.com",
    githubUrl: "https://github.com/example/portfolio-template",
    status: "archived",
  },
];

export const education: Education[] = [
  {
    id: "edu-1",
    institution: "University of California, Berkeley",
    degree: "Bachelor of Arts",
    field: "Interactive Media Design",
    startYear: "2011",
    endYear: "2015",
    location: "Berkeley, CA",
    details: "Concentration in Human-Computer Interaction",
  },
  {
    id: "edu-2",
    institution: "General Assembly",
    degree: "Certificate",
    field: "User Experience Design",
    startYear: "2014",
    endYear: "2014",
    location: "San Francisco, CA",
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "LinkedIn",
    username: "sarahmartinez",
    url: "https://linkedin.com/in/sarahmartinez",
  },
  {
    platform: "GitHub",
    username: "sarahmartinez",
    url: "https://github.com/sarahmartinez",
  },
  {
    platform: "Twitter",
    username: "@sarahmartinez",
    url: "https://twitter.com/sarahmartinez",
  },
  {
    platform: "Medium",
    username: "sarahmartinez",
    url: "https://medium.com/@sarahmartinez",
  },
];