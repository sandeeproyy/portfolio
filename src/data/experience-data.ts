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
    role: "Research And Development Intern",
    company: "AgroNexa Solutions",
    type: "Remote",
    date: "December 2023 – Present",
    details: [
      "Collaborated with the CTO to architect and prototype a Smart IoT Device for Precision Farming and Irrigation, integrating sensor fusion (soil-moisture, temperature, humidity) with actuator control over MQTT.",
      "Conducted feasibility and system-architecture research for an Autonomous Agricultural Drone capable of variable-rate spraying, crop-health imaging (NDVI), and GPS-guided waypoint navigation.",
      "Secured top-10 ranking at Assam Startup Cohort 6.0 Idea Pitching competition with an AgriTech pitch covering market analysis, MVP design, and go-to-market strategy.",
      "Performed domain research identifying systemic inefficiencies in the Indian Tea Industry, mapping pain-points to potential IoT and ML-driven solutions.",
    ],
  },
  {
    id: "iitg",
    role: "Project Intern",
    company: "Technology Innovation Hub, IIT Guwahati",
    type: "Hybrid",
    date: "January 2026 – May 2026",
    details: [
      "Conducted experimental investigation of Ionic Polymer-Metal Composite (IPMC) actuator dynamics under varying voltage amplitudes and environmental conditions at Technology Innovation Hub, IIT Guwahati.",
      "Developed an ESP32-CAM-based real-time image acquisition system for deformation monitoring of cantilever-configured IPMC actuators.",
      "Performed experiments under WATER, AIR, and ACETONE (1%) environments using AC excitation voltages ranging from 2.1 V to 4.9 V.",
      "Implemented a computer vision-based image processing pipeline using Python and OpenCV for automated bending-angle extraction from sequential image frames.",
      "Generated and structured an experimental dataset containing 840 deformation observations across 42 experimental runs.",
      "Carried out deformation analysis including stimulus response, relaxation response, back-relaxation behavior, phase-space analysis, and voltage-dependent actuation characterization.",
      "Developed a deep neural network regression model using TensorFlow and Scikit-learn for prediction of nonlinear IPMC deformation behavior.",
      "Achieved strong predictive performance with an R² score of 0.959 between experimentally measured and model-predicted deformation responses.",
      "Utilized Python, TensorFlow, OpenCV, NumPy, Pandas, Matplotlib, and Google Colab for data processing, visualization, and machine learning-based predictive modeling.",
      "Worked on interdisciplinary applications involving soft robotics, electroactive polymers, smart materials, embedded systems, and AI-driven actuation analysis.",
    ],
  },
  {
    id: "ml-intern",
    role: "Machine Learning Intern",
    company: "Technology Innovation Hub, IIT Guwahati",
    type: "Remote",
    date: "August 2025 – December 2025",
    details: [
      "Developed and integrated machine learning algorithms and pipelines for predictive analysis.",
      "Preprocessed complex datasets, conducted model evaluation, and compiled comprehensive performance analysis reports.",
      "Collaborated on software integration steps for ML-driven autonomous operations.",
    ],
  },
  {
    id: "freelance-robotics",
    role: "Freelance Robotics Developer",
    company: "Mechatron Robotics",
    type: "Part-time",
    date: "May 2025 – December 2025",
    details: [
      "Built an object-detection robot with an integrated automated vacuum cleaner subsystem.",
      "Taught students robotics fundamentals, IoT basics, and micro-controller programming.",
    ],
  },
  {
    id: "iiest",
    role: "Research Intern",
    company: "Indian Institute of Engineering Science and Technology (IIEST), Shibpur",
    type: "Remote",
    date: "July 2025",
    details: [
      "Designed a middle ear prosthesis (Total Ossicular Replacement Prosthesis - TORP) for middle-ear reconstruction to replace tiny bones aiding in hearing under the guidance of Dr. Apurba Das.",
      "Performed structural FEA simulations (von Mises stress, modal analysis) in Autodesk Fusion 360 to evaluate sound transfer efficiency, mechanical integrity, and material biocompatibility.",
      "Gained hands-on experience in CAD, anatomy, and physics, enhancing interest in biomedical technology.",
    ],
  },
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
    year: "2027",
  },
  {
    degree: "AHSEC (Higher Secondary)",
    institute: "Lokanayak Omeo Kumar Das College",
    score: "80.80%",
    year: "2023",
  },
  {
    degree: "SEBA (HSLC)",
    institute: "Missa Model High School",
    score: "87.16%",
    year: "2021",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  level: string; // for the enchantment representation
  url?: string;
  credentialId?: string;
};

export const certifications: Certification[] = [
  {
    name: "National Embetronix Challenge — 1st Position",
    issuer: "Kshitij, IIT Kharagpur",
    year: "2024",
    level: "V",
    url: "#",
  },
  {
    name: "Col. Guru Prasad Das Hackathon — Winner",
    issuer: "Jorhat Engineering College",
    year: "2025",
    level: "V",
    url: "#",
  },
  {
    name: "National Amphibian Bot Challenge — Winner",
    issuer: "IIT Kharagpur",
    year: "2024",
    level: "V",
    url: "#",
  },
  {
    name: "National Line Follower Bot Challenge — Winner",
    issuer: "IIT Kharagpur",
    year: "2024",
    level: "IV",
    url: "#",
  },
  {
    name: "Specialization: Aerial Robotics",
    issuer: "University of Pennsylvania (Coursera)",
    year: "2025",
    level: "IV",
    url: "#",
  },
  {
    name: "Supervised Machine Learning",
    issuer: "Stanford Online (Coursera)",
    year: "2025",
    level: "IV",
    url: "#",
  },
  {
    name: "Getting Started with AI on Jetson Nano",
    issuer: "NVIDIA",
    year: "2025",
    level: "III",
    url: "#",
    credentialId: "_SMMCkJuTvGTGRZ4HPswog",
  },
  {
    name: "Generative AI and LLMs on Google Cloud",
    issuer: "Google Cloud Skills Boost",
    year: "2023",
    level: "III",
    url: "#",
  },
  {
    name: "Python for Data Science, AI & Development",
    issuer: "IBM (Coursera)",
    year: "2025",
    level: "III",
    url: "#",
    credentialId: "006JYHFBL41W",
  },
  {
    name: "Certificate of Completion — Winter Internship",
    issuer: "IIT Guwahati Technology Innovation Hub",
    year: "2024",
    level: "IV",
    url: "#",
  },
  {
    name: "Certificate of Completion — Summer Internship",
    issuer: "IIEST Shibpur",
    year: "2025",
    level: "IV",
    url: "#",
  },
  {
    name: "AI/ML and Robotics Workshop",
    issuer: "IIT Guwahati",
    year: "2024",
    level: "III",
    url: "#",
  },
  {
    name: "3-Day Aeromodelling Workshop",
    issuer: "Jorhat Engineering College",
    year: "2024",
    level: "II",
    url: "#",
  },
];

export type Position = {
  title: string;
  organization: string;
  year: string;
};

export const positions: Position[] = [
  {
    title: "Training and Placement Coordinator",
    organization: "Jorhat Engineering College",
    year: "2026 – 2027",
  },
  {
    title: "Club Head",
    organization: "Astronomy Society, Jorhat Engineering College",
    year: "2025 – 2026",
  },
  {
    title: "Research & Development Head",
    organization: "Robotics Society, Jorhat Engineering College",
    year: "2025 – present",
  },
  {
    title: "Research & Development Head",
    organization: "Electronics Society, Jorhat Engineering College",
    year: "2025 – present",
  },
  {
    title: "Executive Member",
    organization: "Team Arcelor (Robotics Team), Jorhat Engineering College",
    year: "2023 – present",
  },
  {
    title: "Student Member",
    organization: "Bureau of Indian Standards (BIS)",
    year: "2025 – present",
  },
];
