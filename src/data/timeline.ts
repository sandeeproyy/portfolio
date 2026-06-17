export type AdvancementNode = {
  id: string;
  branch: "foundations" | "mechanical" | "robotics" | "ai";
  title: string;
  date: string;
  description: string;
  kind: "task" | "goal" | "challenge";
  // grid position
  col: number;
  row: number;
  parents?: string[];
};

export const advancements: AdvancementNode[] = [
  { id: "school", branch: "foundations", title: "Higher Secondary — PCM", date: "2021 – 2023", description: "Physics, Chemistry, Maths foundation. First robotics tinkering with Arduino.", kind: "task", col: 0, row: 1 },
  { id: "undergrad", branch: "foundations", title: "Undergrad — Mechanical Engineering", date: "2023 – 2027", description: "Core: mechanics of materials, thermodynamics, control systems, manufacturing.", kind: "goal", col: 1, row: 1, parents: ["school"] },

  { id: "cad", branch: "mechanical", title: "SolidWorks + DFM", date: "2023", description: "Full-assembly CAD with manufacturing constraints for FDM printing.", kind: "task", col: 2, row: 0, parents: ["undergrad"] },
  { id: "fea", branch: "mechanical", title: "ANSYS Static Structural", date: "2024", description: "FEA verification of arm linkages under rated load.", kind: "task", col: 3, row: 0, parents: ["cad"] },
  { id: "arm", branch: "mechanical", title: "6-DOF Robotic Arm", date: "2024 – Present", description: "Self-designed, 3D-printed, kinematically modelled, PID-controlled arm.", kind: "challenge", col: 4, row: 0, parents: ["fea"] },

  { id: "ros", branch: "robotics", title: "ROS 2 + PX4", date: "2023", description: "Middleware fluency: nodes, topics, actions; flight stack integration.", kind: "task", col: 2, row: 2, parents: ["undergrad"] },
  { id: "slam", branch: "robotics", title: "ORB-SLAM3 + EKF", date: "2024", description: "Visual-Inertial Odometry pipeline running on Jetson at 30 Hz.", kind: "goal", col: 3, row: 2, parents: ["ros"] },
  { id: "drone", branch: "robotics", title: "GPS-Denied Drone (IRoC-U)", date: "2023 – Present", description: "Autonomous SLAM-based navigation in GPS-denied environments.", kind: "challenge", col: 4, row: 2, parents: ["slam"] },

  { id: "py", branch: "ai", title: "Python / NumPy / Pandas", date: "2023", description: "Workhorse data stack for experiments and visualisation.", kind: "task", col: 2, row: 3, parents: ["undergrad"] },
  { id: "cv", branch: "ai", title: "Computer Vision — OpenCV", date: "2024", description: "Contour detection, affine fitting, automated measurement pipelines.", kind: "task", col: 3, row: 3, parents: ["py"] },
  { id: "ipmc", branch: "ai", title: "IPMC Deep Regressor", date: "2026", description: "TensorFlow regressor on 840 IPMC observations — R² = 0.959.", kind: "challenge", col: 4, row: 3, parents: ["cv"] },
  { id: "solar", branch: "ai", title: "Embedded ML — Solar Tracker", date: "2024", description: "On-device anomaly detection over BLE/RFID streams.", kind: "goal", col: 4, row: 4, parents: ["py"] },
];