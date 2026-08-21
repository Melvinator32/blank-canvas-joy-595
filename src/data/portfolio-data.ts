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
  Interest,
} from "@/types/portfolio";

import headshot from "@/assets/headshot.png.asset.json";
import weirwoodThumb from "@/assets/weirwood.jpg.asset.json";
import rewardsThumb from "@/assets/rewards-ledger.jpg.asset.json";
import blackjackThumb from "@/assets/blackjack-trainer.jpg.asset.json";
import zenThumb from "@/assets/zen-garden.jpg.asset.json";
import radioThumb from "@/assets/radio-station.jpg.asset.json";

// ===== Portfolio Data =====

export const personalInfo: PersonalInfo = {
  name: "James McKnight",
  title: "Corporate Development Analyst",
  location: { city: "New Orleans, LA", country: "USA" },
  website: "www.linkedin.com/in/james-r-mcknight",
  email: "jrmcknight08@gmail.com",
  avatar: headshot.url,
  bio: "I'm a corporate development analyst focused on turning complex commercial and financial questions into clear investment decisions. I own the DCF and corporate development models used to evaluate opportunities across IMTT's terminal network — from $50K facility upgrades to $150MM strategic initiatives — work that has supported 25+ deal closures and $500MM+ of capital deployment.\n\nBefore IMTT, I built project finance models for decarbonization projects representing $8B+ of combined capex at Fidelis New Energy, and led a $9MM grant application for CO2 transportation and storage that saved the company $400K+ in consulting fees.\n\nI like the parts of finance that touch operations: pricing strategy grounded in real market analysis, underwriting assumptions that hold up, and the tooling that makes a team faster — including the CRM platform I selected, implemented, and administer for 20 daily users. Outside of work you'll find me traveling, golfing, backpacking, fly fishing, or at a live show.",
  skills: "Financial Modeling, DCF Valuation, Project Finance, Business Development, Market Research & Intelligence, Investment Analysis, Executive Presentations, Process Improvement, Excel, Macabacus, Capital IQ, Bloomberg, Vortexa, Tableau, Python, PowerPoint, Microsoft Project",
};

export const experience: Experience[] = [
  {
    id: "exp-1",
    company: "International Matex Tank Terminals (IMTT)",
    role: "Corporate Development Analyst",
    location: "New Orleans, LA",
    startDate: "2024-04",
    endDate: null,
    description:
      "Own and build 100% of commercial DCF models and ~50% of corporate development models used to evaluate investment and commercial decisions — 40+ models spanning $50K facility upgrades to $150MM strategic initiatives, supporting 25+ deal closures and $500MM+ of capital deployment. Own a complex dock utilization model used in quarterly executive updates to guide project development and site capacity decisions. Identified a prospective customer's limited alternatives through commercial and market analysis, driving a pricing recommendation 75% above the original proposal that generated ~$12MM of incremental EBITDA. Led CRM platform selection, implementation, workflow design, automation buildout, and training, and serve as lead administrator for 20 daily users.",
    current: true,
  },
  {
    id: "exp-2",
    company: "Etsy / Print-on-Demand E-commerce Business",
    role: "Founder",
    location: "New Orleans, LA",
    startDate: "2025-06",
    endDate: null,
    description:
      "Generate $500+ in monthly revenue across ~50 sales per month while limiting upkeep to roughly 2 hours per month through automation and streamlined operations. Manage a catalog of 50+ products across design, pricing, listings, and fulfillment workflows. Increased conversion by 150% through pricing, product description, and keyword strategy improvements.",
    current: true,
  },
  {
    id: "exp-3",
    company: "Fidelis New Energy, LLC",
    role: "Senior Analyst, Analyst, Summer Intern",
    location: "Houston, TX",
    startDate: "2022-08",
    endDate: "2024-04",
    description:
      "Developed project finance models for decarbonization opportunities supporting development decisions across projects representing $8B+ of combined capex. Led coordination of a $9MM grant application for CO2 transportation and storage, saving $400K+ in external consulting fees while managing procurement of 30+ documents totaling 120+ pages. Evaluated hundreds of grant opportunities across clean hydrogen/ammonia, CCS, SAF, and renewable diesel, supporting applications for over $125MM in federal grant awards. Helped develop the proprietary community benefits program used across Fidelis' projects and regularly drafted letters of support and intent for legislators, partners, and stakeholders.",
    current: false,
  },
  {
    id: "exp-4",
    company: "Darwin Fenner Fund",
    role: "Investment Analyst",
    location: "New Orleans, LA",
    startDate: "2022-01",
    endDate: "2022-05",
    description:
      "Selected for the Large Cap Student Managed Fund ($1.5M AUM). Conducted extensive research into the Consumer Discretionary sector and built a comprehensive model using fundamental screens and relative valuations that culminated in buy and sell recommendations for the portfolio.",
    current: false,
  },
  {
    id: "exp-5",
    company: "Burkenroad Reports",
    role: "Equity Research Analyst",
    location: "New Orleans, LA",
    startDate: "2021-01",
    endDate: "2021-05",
    description:
      "Conducted C-suite interviews, built cash flow and earnings projection models, and developed a comparable valuation methodology for Investar Bank to produce a 40-page sell-side investment report distributed to ~20,000 institutional and retail investors.",
    current: false,
  },
  {
    id: "exp-6",
    company: "Moondance Adventures",
    role: "Trip Leader",
    location: "Slovenia & Croatia",
    startDate: "2022-06",
    endDate: "2022-08",
    description:
      "Led 39 students on backpacking trips through Slovenia and Croatia, responsible for logistics, safety, and group leadership in the field.",
    current: false,
  },
];

export const writing: Writing[] = [];

export const speaking: Speaking[] = [];

export const projects: Project[] = [
  {
    id: "demo-weirwood",
    name: "Weirwood — Marine Movement Intelligence",
    description:
      "An interactive vessel and cargo movement dashboard built on Vortexa data across the IMTT terminal network, with region, product, and terminal filters, pivot views, and PDF/PPT/XLS export of any view.",
    techStack: ["Data Visualization", "Market Intelligence", "Dashboards"],
    demoUrl: "/demos/weirwood.html",
    thumbnail: weirwoodThumb.url,
    status: "active",
  },
  {
    id: "demo-rewards",
    name: "Credit Card & Spend Dashboard",
    description:
      "A personal spend and rewards ledger that ingests statement exports, categorizes transactions, and tracks points earn rates and card-level value across time.",
    techStack: ["Spend Analytics", "XLSX Parsing", "Dashboards"],
    demoUrl: "/demos/rewards-ledger.html",
    thumbnail: rewardsThumb.url,
    status: "active",
  },
  {
    id: "demo-blackjack",
    name: "Blackjack Strategy Trainer",
    description:
      "A basic-strategy and counting trainer that deals real shoes, grades every decision against optimal play, and tracks accuracy over sessions.",
    techStack: ["Game Logic", "Probability", "PWA"],
    demoUrl: "/demos/blackjack-trainer.html",
    thumbnail: blackjackThumb.url,
    status: "active",
  },
  {
    id: "demo-zen",
    name: "Zen Garden",
    description:
      "A canvas-based zen garden sandbox — rake patterns into sand, place stones and plants, and pan or zoom around the composition.",
    techStack: ["Canvas", "Generative Art", "Touch UX"],
    demoUrl: "/demos/zen-garden.html",
    thumbnail: zenThumb.url,
    status: "active",
  },
  {
    id: "proj-1",
    name: "Dock Utilization & Simulation Model",
    description:
      "A dynamic, nearly fully automated dock simulation model used in quarterly executive updates to evaluate site capacity against customer volume trends, dock constraints, and contract-specific operating nuances.",
    techStack: ["Excel", "Scenario Modeling", "Capacity Analysis"],
    status: "active",
  },
  {
    id: "proj-2",
    name: "CRM Implementation & Automation Suite",
    description:
      "Led platform selection and implementation to migrate commercial and business development teams off Excel-based relationship tracking, including custom reporting logic and a proprietary activity tracker that prompts reps to re-engage customers based on relationship cadence.",
    techStack: ["CRM Administration", "Workflow Automation", "Reporting"],
    status: "active",
  },
  {
    id: "proj-3",
    name: "Standardized Underwriting Toolkit",
    description:
      "A commercial model template and buy-versus-lease capex framework adopted by operations leadership across all terminals, plus refined terminal-level tax and insurance assumptions that improved project underwriting accuracy.",
    techStack: ["DCF", "Capex Frameworks", "Process Design"],
    status: "active",
  },
  {
    id: "proj-4",
    name: "Print-on-Demand E-commerce Store",
    description:
      "A 50+ product Etsy catalog run on roughly two hours of upkeep per month through automation, with a 150% conversion lift from pricing, copy, and keyword strategy.",
    techStack: ["Etsy", "Print-on-Demand", "SEO", "Automation"],
    status: "active",
  },
];

export const interests: Interest[] = [
  {
    name: "Travel",
    description:
      "Planning trips around new places, new food, and long drives — the more unfamiliar the better.",
  },
  {
    name: "Golf",
    description: "Weekend rounds and a standing effort to fix my short game.",
  },
  {
    name: "Backpacking",
    description:
      "Multi-day trips in the mountains, a habit picked up leading student expeditions through Slovenia and Croatia.",
  },
  {
    name: "Fly Fishing",
    description: "Cold water, slow mornings, and the occasional fish.",
  },
  {
    name: "Live Music",
    description: "New Orleans makes this an easy one — shows and festivals whenever they come through.",
  },
];

export const education: Education[] = [

  {
    id: "edu-1",
    institution: "Tulane University, A. B. Freeman School of Business",
    degree: "Bachelor of Science",
    field: "Management — Double Major in Finance and Legal Studies in Business",
    startYear: "2018",
    endYear: "2022",
    location: "New Orleans, LA",
    details: "GPA: 3.7",
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "LinkedIn",
    username: "james-r-mcknight",
    url: "https://www.linkedin.com/in/james-r-mcknight",
  },
  {
    platform: "Email",
    username: "jrmcknight08@gmail.com",
    url: "mailto:jrmcknight08@gmail.com",
  },
];
