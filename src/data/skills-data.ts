export type SkillCategory = {
  name: string;
  icon: string;
  color: string;
  skills: { name: string; level: number }[];
};

export const skillsData: SkillCategory[] = [
  {
    name: "CAD / CAE",
    icon: "Boxes",
    color: "#f6cf57", // gold-mc
    skills: [
      { name: "SolidWorks", level: 90 },
      { name: "Autodesk Fusion 360", level: 85 },
      { name: "ANSYS Workbench (Static, Modal, CFD)", level: 80 },
    ],
  },
  {
    name: "Programming",
    icon: "Terminal",
    color: "#5cd6ff", // diamond
    skills: [
      { name: "Python", level: 90 },
      { name: "C/C++", level: 85 },
      { name: "MATLAB", level: 75 },
      { name: "Bash", level: 80 },
      { name: "Git / GitHub", level: 85 },
    ],
  },
  {
    name: "Machine Learning",
    icon: "BrainCircuit",
    color: "#e84a5f", // redstone variant
    skills: [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 75 },
      { name: "Scikit-learn", level: 80 },
      { name: "Keras", level: 80 },
      { name: "NumPy / Pandas", level: 95 },
      { name: "Matplotlib / Seaborn", level: 90 },
    ],
  },
  {
    name: "Computer Vision",
    icon: "Eye",
    color: "#3ed47a", // grass variant
    skills: [
      { name: "OpenCV", level: 85 },
      { name: "MediaPipe", level: 80 },
      { name: "ORB-SLAM3", level: 75 },
      { name: "Visual-Inertial SLAM", level: 70 },
      { name: "LiDAR SLAM", level: 70 },
    ],
  },
  {
    name: "Robotics",
    icon: "Bot",
    color: "#3c6bd6", // lapis variant
    skills: [
      { name: "ROS / ROS 2", level: 80 },
      { name: "PX4 Autopilot", level: 75 },
      { name: "ArduPilot", level: 70 },
      { name: "Arduino", level: 90 },
      { name: "NVIDIA Jetson", level: 80 },
    ],
  },
  {
    name: "Manufacturing & Tools",
    icon: "Wrench",
    color: "#9aa0a6", // iron variant
    skills: [
      { name: "FDM 3D Printing (PLA, PETG, ABS)", level: 95 },
      { name: "Laser Cutting", level: 85 },
      { name: "Rapid Prototyping", level: 90 },
      { name: "Docker", level: 75 },
      { name: "Google Colab", level: 90 },
      { name: "Linux", level: 85 },
    ],
  },
];
