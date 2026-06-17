export type Experience = {
  id: string;
  role: string;
  company: string;
  type: string;
  date: string;
  details: string[];
};

export const experiences: Experience[] = [
  {
    id: "agronexa",
    role: "Research & Development Intern",
    company: "Agronexa Solutions",
    type: "On-Site",
    date: "March 2024 – Present",
    details: [
      "Collaborated with the CTO to architect and prototype a Smart IoT Device for Precision Farming and Irrigation, integrating sensor fusion (soil-moisture, temperature, humidity) with actuator control over MQTT.",
      "Conducted feasibility and system-architecture research for an Autonomous Agricultural Drone capable of variable-rate spraying, crop-health imaging (NDVI), and GPS-guided waypoint navigation.",
      "Secured top-10 ranking at Assam Startup Cohort 6.0 Idea Pitching competition with an AgriTech pitch covering market analysis, MVP design, and go-to-market strategy.",
      "Performed domain research identifying systemic inefficiencies in the Indian Tea Industry, mapping pain-points to potential IoT and ML-driven solutions."
    ]
  },
  {
    id: "iiest",
    role: "Research & Development Intern",
    company: "IIEST Shibpur",
    type: "Online",
    date: "June – July 2025",
    details: [
      "Designed a Total Ossicular Replacement Prosthesis (TORP) for middle-ear reconstruction, selecting biocompatible materials (titanium alloy) based on biocompatibility, acoustic impedance, and fatigue-life constraints.",
      "Performed structural FEA (von Mises stress, modal analysis) in Autodesk Fusion 360 to validate mechanical integrity under physiological loading conditions."
    ]
  },
  {
    id: "iitg",
    role: "Winter Research Intern",
    company: "Technology Innovation Hub, IIT Guwahati",
    type: "On-Site",
    date: "December 2024 – January 2025",
    details: [
      "Conducted experimental characterization of Ionic Polymer-Metal Composite (IPMC) actuators under low-voltage AC excitation across WATER, AIR, and 1% ACETONE environments.",
      "Developed an ESP32-CAM-based image-acquisition setup for real-time deformation monitoring of cantilever-configured IPMC actuators at 200 ms frame intervals.",
      "Implemented a computer-vision pipeline using contour analysis, skeletonization, tip tracking, and vector-angle estimation to extract bending deformation from image sequences.",
      "Generated a structured dataset of 840 observations across 42 experimental runs and trained a TensorFlow regression model achieving R² = 0.959 for deformation prediction."
    ]
  }
];

export type Education = {
  degree: string;
  institute: string;
  score: string;
  year: string;
};

export const education: Education[] = [
  {
    degree: "B.Tech in Mechanical Engineering",
    institute: "Jorhat Engineering College, Assam",
    score: "CGPA 7.21 / 10",
    year: "2027"
  },
  {
    degree: "AHSEC (Higher Secondary)",
    institute: "Lokanayak Omeo Kumar Das College",
    score: "80.80%",
    year: "2023"
  },
  {
    degree: "SEBA (HSLC)",
    institute: "Missa Model High School",
    score: "87.16%",
    year: "2021"
  }
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  level: string; // for the enchantment representation
  url?: string;
};

export const certifications: Certification[] = [
  { name: "National Embetronix Challenge — 1st Position", issuer: "Kshitij, IIT Kharagpur", year: "2024", level: "V", url: "#" },
  { name: "Col. Guru Prasad Das Hackathon — Winner", issuer: "Jorhat Engineering College", year: "2025", level: "V", url: "#" },
  { name: "National Amphibian Bot Challenge — Winner", issuer: "IIT Kharagpur", year: "2024", level: "V", url: "#" },
  { name: "National Line Follower Bot Challenge — Winner", issuer: "IIT Kharagpur", year: "2024", level: "IV", url: "#" },
  { name: "Specialization: Aerial Robotics", issuer: "University of Pennsylvania (Coursera)", year: "2025", level: "IV", url: "#" },
  { name: "Supervised Machine Learning", issuer: "Stanford Online (Coursera)", year: "2025", level: "IV", url: "#" },
  { name: "AI with Jetson NANO", issuer: "NVIDIA Deep Learning Institute", year: "2024", level: "III", url: "#" },
  { name: "Generative AI and LLMs on Google Cloud", issuer: "Google Cloud Skills Boost", year: "2023", level: "III", url: "#" },
  { name: "Python for Data Science, AI and Development", issuer: "IBM (Coursera)", year: "2024", level: "III", url: "#" },
  { name: "Certificate of Completion — Winter Internship", issuer: "IIT Guwahati Technology Innovation Hub", year: "2024", level: "IV", url: "#" },
  { name: "Certificate of Completion — Summer Internship", issuer: "IIEST Shibpur", year: "2025", level: "IV", url: "#" },
  { name: "AI/ML and Robotics Workshop", issuer: "IIT Guwahati", year: "2024", level: "III", url: "#" },
  { name: "3-Day Aeromodelling Workshop", issuer: "Jorhat Engineering College", year: "2024", level: "II", url: "#" }
];

export type Position = {
  title: string;
  organization: string;
  year: string;
};

export const positions: Position[] = [
  { title: "Training and Placement Coordinator", organization: "Jorhat Engineering College", year: "2026 – 2027" },
  { title: "Club Head", organization: "Astronomy Society, Jorhat Engineering College", year: "2025 – 2026" },
  { title: "Research & Development Head", organization: "Robotics Society, Jorhat Engineering College", year: "2025 – present" },
  { title: "Research & Development Head", organization: "Electronics Society, Jorhat Engineering College", year: "2025 – present" },
  { title: "Executive Member", organization: "Team Arcelor (Robotics Team), Jorhat Engineering College", year: "2023 – present" },
  { title: "Student Member", organization: "Bureau of Indian Standards (BIS)", year: "2025 – present" }
];
