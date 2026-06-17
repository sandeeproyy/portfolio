export type ProjectMetric = { label: string; value: string; hearts?: number };
export type ProjectSection = { heading: string; body: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  tier: "diamond" | "gold" | "iron";
  icon: "drone" | "arm" | "ipmc" | "solar" | "locked";
  stack: { name: string; level: "I" | "II" | "III" | "IV" | "V" }[];
  metrics: ProjectMetric[];
  sections: ProjectSection[];
  demo?: "arm-ik" | "ipmc-ml" | null;
  repo?: string;
  image: string; // URL or placeholder path
  github: string; // GitHub repository URL
};

export const projects: Project[] = [
  {
    slug: "autonomous-drone",
    title: "GPS-Denied Autonomous Drone",
    tagline: "IRoC-U 2026 — VIO + SLAM on Jetson",
    year: "2023 – Present",
    tier: "diamond",
    icon: "drone",
    stack: [
      { name: "ROS 2", level: "V" },
      { name: "ORB-SLAM3", level: "IV" },
      { name: "EKF", level: "IV" },
      { name: "PX4", level: "III" },
      { name: "Jetson", level: "III" },
      { name: "A*/RRT*", level: "III" },
    ],
    metrics: [
      { label: "Pose rate", value: "30 Hz", hearts: 9 },
      { label: "DOF estimated", value: "6", hearts: 8 },
      { label: "Environment", value: "GPS-denied", hearts: 10 },
    ],
    sections: [
      {
        heading: "Problem",
        body: "Operate a fully autonomous UAV in indoor and semi-outdoor environments where GPS is unavailable, while still doing real-time obstacle avoidance and target tracking for the IRoC-U 2026 challenge.",
      },
      {
        heading: "Approach",
        body: "Fuse LiDAR point clouds, stereo-camera depth maps, and IMU through an Extended Kalman Filter for state estimation. A Visual-Inertial Odometry pipeline built on ORB-SLAM3 runs on an onboard NVIDIA Jetson, giving 6-DOF pose at 30 Hz. ROS 2 middleware handles modular IPC between perception, planning (A* / RRT*), and control nodes; PX4 firmware sits on the flight controller for low-level stabilization.",
      },
      {
        heading: "Results",
        body: "Closed-loop SLAM with autonomous obstacle detection, avoidance, and target tracking in GPS-denied test environments. The architecture cleanly separates perception from planning, so swapping planners or adding new sensors is a one-node change.",
      },
    ],
    demo: null,
    image: "/placeholder-drone.jpg",
    github: "https://github.com/sandeeproyy/drone-project-placeholder",
  },
  {
    slug: "robotic-arm",
    title: "6-DOF 3D-Printed Robotic Arm",
    tagline: "DH kinematics, FEA-verified, ROS action server",
    year: "2024 – Present",
    tier: "diamond",
    icon: "arm",
    stack: [
      { name: "SolidWorks", level: "V" },
      { name: "ANSYS", level: "III" },
      { name: "DH Params", level: "IV" },
      { name: "PID", level: "IV" },
      { name: "Arduino", level: "IV" },
      { name: "ROS", level: "III" },
    ],
    metrics: [
      { label: "Degrees of freedom", value: "6", hearts: 10 },
      { label: "FDM material", value: "PETG", hearts: 8 },
      { label: "Control loop", value: "PID + ROS action", hearts: 9 },
    ],
    sections: [
      {
        heading: "Problem",
        body: "Build a low-cost, fully self-designed 6-DOF manipulator that can be 3D-printed at home but still take real loads and accept high-level task commands.",
      },
      {
        heading: "Approach",
        body: "Performed forward and inverse kinematics via Denavit-Hartenberg parameterisation and dynamic modelling with a Newton-Euler recursive formulation to size servomotors and structural members. All linkages, joints, and mounting brackets were modelled in SolidWorks with DFM constraints for FDM printing in PETG. ANSYS Static Structural verified safety factors under rated load. Joint-space trajectory planning + PID servo control runs on an Arduino Mega; the arm exposes a ROS action-server interface for high-level task commanding.",
      },
      {
        heading: "Results",
        body: "A functioning, instrumented manipulator with a clean software interface. Try the live 2-link IK demo below to see how end-effector targets resolve into joint angles.",
      },
    ],
    demo: "arm-ik",
    image: "/placeholder-arm.jpg",
    github: "https://github.com/sandeeproyy/robotic-arm-placeholder",
  },
  {
    slug: "ipmc-ml",
    title: "IPMC Deformation Predictor",
    tagline: "Deep regression on 840 actuator observations, R² = 0.959",
    year: "Jan – May 2026",
    tier: "diamond",
    icon: "ipmc",
    stack: [
      { name: "TensorFlow", level: "IV" },
      { name: "OpenCV", level: "IV" },
      { name: "ESP32-CAM", level: "III" },
      { name: "NumPy/Pandas", level: "V" },
      { name: "Phase Analysis", level: "III" },
    ],
    metrics: [
      { label: "R² (test)", value: "0.959", hearts: 10 },
      { label: "Observations", value: "840", hearts: 9 },
      { label: "Experimental runs", value: "42", hearts: 8 },
    ],
    sections: [
      {
        heading: "Problem",
        body: "Ionic Polymer-Metal Composite (IPMC) actuators are nonlinear and environment-sensitive. We needed a data-driven model of bending angle as a function of excitation voltage, environment, and time — accurate enough to be useful for control.",
      },
      {
        heading: "Approach",
        body: "Characterised IPMC actuators experimentally under AC excitation (2.1 V – 4.9 V) in WATER, AIR, and 1% ACETONE environments; acquired 840 deformation observations across 42 experimental runs using an ESP32-CAM image acquisition rig. A Python + OpenCV pipeline extracted bending angles automatically via contour detection and affine-transform fitting. Phase-space, stimulus/relaxation/back-relaxation, and voltage-dependent actuation profiling were done in NumPy / Pandas / Matplotlib on Colab.",
      },
      {
        heading: "Results",
        body: "A TensorFlow/Keras deep regressor on the structured dataset reached R² = 0.959 between measured and predicted deformation, validated with k-fold cross-validation and residual analysis. Try the inference widget below — it runs a calibrated surrogate of the trained model live in your browser.",
      },
    ],
    demo: "ipmc-ml",
    image: "/placeholder-ipmc.jpg",
    github: "https://github.com/sandeeproyy/ipmc-ml-placeholder",
  },
  {
    slug: "solar-attendance",
    title: "Solar Attendance & Worker Tracker",
    tagline: "Off-grid edge device, BLE wearables, on-device ML",
    year: "2024",
    tier: "gold",
    icon: "solar",
    stack: [
      { name: "Embedded ML", level: "III" },
      { name: "RFID / NFC", level: "IV" },
      { name: "BLE", level: "III" },
      { name: "MQTT", level: "III" },
      { name: "Solar Harvest", level: "II" },
    ],
    metrics: [
      { label: "Power source", value: "Solar", hearts: 8 },
      { label: "Connectivity", value: "MQTT / 4G", hearts: 7 },
      { label: "On-device ML", value: "Anomaly det.", hearts: 7 },
    ],
    sections: [
      {
        heading: "Problem",
        body: "Track attendance and worker location on factory / field sites without depending on grid power or stable Wi-Fi.",
      },
      {
        heading: "Approach",
        body: "Designed a solar-harvested off-grid edge device integrating RFID/NFC-based attendance logging with a BLE wearable for real-time worker location. A lightweight ML classifier on the embedded microcontroller flags anomalies in worker movement patterns; the device syncs to a cloud dashboard via MQTT, with 4G/LTE as a fallback channel.",
      },
      {
        heading: "Results",
        body: "End-to-end pipeline from sensor to dashboard, surviving on harvested solar power.",
      },
    ],
    demo: null,
    repo: "https://github.com/sandeeproyy",
    image: "/placeholder-solar.jpg",
    github: "https://github.com/sandeeproyy/solar-tracker-placeholder",
  },
];

export const lockedSlots = [
  { slot: 5, hint: "Unlock after IRoC-U 2026" },
  { slot: 6, hint: "More builds coming…" },
];