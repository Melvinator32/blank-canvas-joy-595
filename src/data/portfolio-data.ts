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
  Photo,
} from "@/types/portfolio";

import headshot from "@/assets/headshot.png.asset.json";
import weirwoodThumb from "@/assets/weirwood.jpg.asset.json";
import rewardsThumb from "@/assets/rewards-ledger.jpg.asset.json";
import blackjackThumb from "@/assets/blackjack-trainer.jpg.asset.json";
import zenThumb from "@/assets/zen-garden.jpg.asset.json";
import radioThumb from "@/assets/radio-station.jpg.asset.json";
import travelMountain from "@/assets/travel-mountain.jpg.asset.json";
import huntingMarsh from "@/assets/hunting-marsh.jpg.asset.json";
import lsuFootball from "@/assets/lsu-football.jpg.asset.json";
import winterBridge from "@/assets/winter-bridge.jpg.asset.json";
import jazzFest from "@/assets/jazz-fest.jpg.asset.json";
import flyFishing from "@/assets/fly-fishing.jpg.asset.json";

// ===== Portfolio Data =====

export const personalInfo: PersonalInfo = {
  name: "James McKnight",
  title: "Corporate Development Analyst at IMTT",
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
    id: "exp-3",
    company: "Fidelis New Energy, LLC (acquired by Nscale in 2026)",
    role: "Senior Analyst, Analyst, Summer Intern",
    location: "Houston, TX",
    startDate: "2022-08",
    endDate: "2024-04",
    description:
      "Developed project finance models for decarbonization opportunities supporting development decisions across projects representing $8B+ of combined capex. Led coordination of a $9MM grant application for CO2 transportation and storage, saving $400K+ in external consulting fees while managing procurement of 30+ documents totaling 120+ pages. Evaluated hundreds of grant opportunities across clean hydrogen/ammonia, CCS, SAF, and renewable diesel, supporting applications for over $125MM in federal grant awards. Helped develop the proprietary community benefits program used across Fidelis' projects and regularly drafted letters of support and intent for legislators, partners, and stakeholders.",
    current: false,
  },
  {
    id: "exp-2",
    company: "Print-on-Demand E-commerce Business",
    role: "Founder",
    location: "New Orleans, LA",
    startDate: "2025-06",
    endDate: null,
    description:
      "Generate $500+ in monthly revenue across ~50 sales per month while limiting upkeep to roughly 2 hours per month through automation and streamlined operations. Manage a catalog of 50+ products across design, pricing, listings, and fulfillment workflows. Increased conversion by 150% through pricing, product description, and keyword strategy improvements.",
    current: true,
    connector: "of",
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
    id: "demo-radio",
    icon: "Radio",
    name: "Radio Station — Productivity Workspace",
    description:
      "An all-in-one personal productivity workspace: table, kanban, matrix, and goal views over the same task set, plus focus timers, subtasks, tags, a rewards system, notebook, and export — all running entirely in the browser.",
    techStack: ["App Design", "State Management", "Productivity UX"],
    demoUrl: "/demos/radio-station.html",
    walkthroughUrl: "/demos/radio-station-walkthrough.html",
    thumbnail: radioThumb.url,
    status: "active",
  },
  {
    id: "demo-weirwood",
    icon: "Ship",
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
    icon: "CreditCard",
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
    icon: "Spade",
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
    icon: "Flower2",
    name: "Zen Garden",
    description:
      "A canvas-based zen garden sandbox — rake patterns into sand, place stones and plants, and pan or zoom around the composition.",
    techStack: ["Canvas", "Generative Art", "Touch UX"],
    demoUrl: "/demos/zen-garden.html",
    thumbnail: zenThumb.url,
    status: "active",
  },
  {
    id: "proj-2",
    icon: "Users",
    name: "CRM Implementation & Automation Suite",
    description:
      "Led platform selection and implementation to migrate commercial and business development teams off Excel-based relationship tracking, including custom reporting logic and a proprietary activity tracker that prompts reps to re-engage customers based on relationship cadence.",
    techStack: ["CRM Administration", "Workflow Automation", "Reporting"],
    status: "active",
  },
  {
    id: "proj-4",
    icon: "ShoppingBag",
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
      "I love planning trips around new places, good food, and the perfect mix of adventure and relaxation. Recent highlights include Costa Rica, Belize, and Mexico City.",
  },
  {
    name: "Golf",
    description:
      "I have played since I was 5 when my grandfather first snuck me onto the local range against the rules after getting tired of chasing my erratic shots around the yard. I eventually played for my high school team. Now I enjoy weekend rounds, post-work (and the occasional pre-work) range sessions, and a perpetual mission to get back to my high school form and break par for the first time!",
  },
  {
    name: "Backpacking",
    description:
      "Multi-day trips in the mountains are a special escape for me, a habit picked up as a student doing overnight trips in Rocky Mountain National Park in Colorado, the Wind River Range in Wyoming, and Pisgah National Forest in North Carolina in high school.\n\nIn college I had the privilege of backpacking through the French Alps around Chamonix and Zermatt. Post-grad, I led trips with Moondance backpacking through the Slovenian Alps. I have also done multiple trips in the Uintas in Utah and recently bagged my first 14'er in Colorado (Mt. Democrat). Up next on my backpacking bucket list are Alaska, Maine (Appalachian Trail), Zion/Canyonlands, Patagonia, and Glacier National Park.",
  },
  {
    name: "Sports",
    description:
      "Football teams: Tennessee Titans, New Orleans Saints, Tulane, Vanderbilt. (Don't hold it against me for having two college teams and two NFL teams. The only way the Titans and Saints become a problem is if they meet in the Super Bowl — and I think we all know the odds of that. Same goes for Tulane and Vanderbilt meeting in the CFP…)\n\nBasketball: New Orleans Pelicans, Vanderbilt, Tulane\n\nHockey: Nashville Predators\n\nI also enjoy keeping up with F1 and most PGA Tour events. One of my annual highlights is getting to go to the Zurich Classic in New Orleans and watch players play what was my “home” course for several years.",
  },
  {
    name: "Fly Fishing",
    description:
      "There is something healing about nothing but the sound of cold trickling streams early in the morning with a gentle fog slowly lifting off at the crack of dawn. I fell in love with fishing at 5 or 6 when my grandfather started taking me to a bamboo-poles-only trout farm.\n\nFast forward 5 years, my dad finally let me start messing around with his fly rod on a trip in North Carolina. I waded in the river until I was about knee deep and caught my first fish with him — a mighty 3\" rainbow trout, and I never looked back. My love of fly fishing has taken me and my dad on countless unforgettable trips and adventures. I used to tie all of my own flies in high school, and still enjoy sitting down at my work bench for a quiet evening when I return home to channel my creative side for my next adventure.",
  },
  {
    name: "Live Music",
    description:
      "I am obsessed with music, although I do not play any instruments myself. I can talk your ear off about any genre, as virtually every one has been my favorite at some point in the last 10 years. Right now, my Jazz playlists own most of my attention.\n\nNew Orleans makes this an easy one to dive into — I am at as many shows and festivals as possible whenever they come through. At any given moment, I have tickets, or at least plans, for my next 3–5 shows. My ultimate favorite band is the Grateful Dead, and it has probably been several years since I went more than a day without listening to them or learning about their famous lore. If you look closely at my vibe coding portfolio page, you will see lots of easter egg references to the Dead…",
  },
  {
    name: "My Dog: Melvin",
    description:
      "I adopted Melvin in May of 2025. He is an undisclosed Dachshund mix (I think he is 75% Dachshund, 25% Beagle). He loves long walks, being my office-chair backrest during weekend work sessions, and burrowing under the covers for naps — preferably with me or my girlfriend.",
  },
  {
    name: "My Family",
    description:
      "My parents split time between Nashville and Cashiers, North Carolina, where they bought what will ultimately be their retirement oasis. My dad works in sales for Rich's Foods, and my mom runs Sixth Street Creative, a consultancy firm for both residential and commercial art using local artists in Nashville.\n\nI have two younger sisters, Walker and Caroline. Walker is two years younger than me and currently works for ADP in New York. Caroline is two years younger than Walker and works for Naomi's Village in Austin.",
  },
];

export const photos: Photo[] = [
  {
    src: travelMountain.url,
    alt: "Two people in an alpine field with a snow-dusted pyramidal mountain peak in the background",
    caption: "Alpine travel — Matterhorn region",
  },
  {
    src: huntingMarsh.url,
    alt: "Two people in camouflage in a boat among tall reeds at sunrise",
    caption: "Duck hunting in the marsh",
  },
  {
    src: lsuFootball.url,
    alt: "Two people posing in front of a brightly lit LSU football stadium at night",
    caption: "LSU football — Saturday nights in Death Valley",
  },
  {
    src: winterBridge.url,
    alt: "A couple sitting on a bridge railing over water with snow-dusted evergreen forest behind",
    caption: "Winter outing",
  },
  {
    src: jazzFest.url,
    alt: "A couple in the crowd at the New Orleans Jazz Fest festival stage",
    caption: "Jazz Fest — New Orleans",
  },
  {
    src: flyFishing.url,
    alt: "A man holding a silver bonefish on a skiff in calm water",
    caption: "Fly fishing for bonefish — Belize",
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
