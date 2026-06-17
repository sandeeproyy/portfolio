export type Ingredient = {
  id: string;
  name: string;
  label: string;
  color: string; // tailwind class
  category: "mech" | "robotics" | "ai" | "embedded";
};

export const ingredients: Ingredient[] = [
  { id: "cad", name: "SolidWorks", label: "CAD", color: "bg-diamond", category: "mech" },
  { id: "ansys", name: "ANSYS", label: "FEA", color: "bg-redstone", category: "mech" },
  { id: "pid", name: "PID Control", label: "PID", color: "bg-gold-mc", category: "mech" },
  { id: "arduino", name: "Arduino", label: "ARD", color: "bg-grass", category: "embedded" },
  { id: "esp32", name: "ESP32", label: "ESP", color: "bg-grass-dark", category: "embedded" },
  { id: "rfid", name: "RFID/NFC", label: "RFID", color: "bg-stone", category: "embedded" },
  { id: "mqtt", name: "MQTT", label: "MQTT", color: "bg-cobble", category: "embedded" },
  { id: "solar", name: "Solar", label: "SOL", color: "bg-gold-mc", category: "embedded" },
  { id: "ros", name: "ROS 2", label: "ROS", color: "bg-redstone", category: "robotics" },
  { id: "lidar", name: "LiDAR", label: "LDR", color: "bg-diamond", category: "robotics" },
  { id: "imu", name: "IMU", label: "IMU", color: "bg-stone", category: "robotics" },
  { id: "ekf", name: "EKF / SLAM", label: "SLAM", color: "bg-diamond", category: "robotics" },
  { id: "opencv", name: "OpenCV", label: "CV", color: "bg-grass", category: "ai" },
  { id: "tf", name: "TensorFlow", label: "TF", color: "bg-gold-mc", category: "ai" },
  { id: "python", name: "Python", label: "PY", color: "bg-diamond", category: "ai" },
  { id: "sensor", name: "Sensor Data", label: "SNS", color: "bg-grass-dark", category: "ai" },
];

export type Recipe = {
  inputs: string[]; // ingredient ids — order ignored
  output: { name: string; lore: string; href?: string };
};

export const recipes: Recipe[] = [
  {
    inputs: ["cad", "arduino", "pid"],
    output: {
      name: "Robotic Arm",
      lore: "6-DOF manipulator with PID joint control",
      href: "/builds/robotic-arm",
    },
  },
  {
    inputs: ["lidar", "imu", "ekf"],
    output: {
      name: "VIO Drone",
      lore: "GPS-denied state estimation @ 30 Hz",
      href: "/builds/autonomous-drone",
    },
  },
  {
    inputs: ["opencv", "tf", "sensor"],
    output: {
      name: "IPMC Predictor",
      lore: "Deep regression, R² = 0.959",
      href: "/builds/ipmc-ml",
    },
  },
  {
    inputs: ["rfid", "solar", "mqtt"],
    output: {
      name: "Solar Tracker",
      lore: "Off-grid attendance + anomaly detection",
      href: "/builds/solar-attendance",
    },
  },
  {
    inputs: ["ros", "lidar", "opencv"],
    output: {
      name: "Perception Stack",
      lore: "Modular ROS 2 perception pipeline",
    },
  },
  {
    inputs: ["cad", "ansys"],
    output: {
      name: "FEA Loop",
      lore: "DFM → simulate → iterate",
    },
  },
];

export function matchRecipe(slots: (string | null)[]): Recipe | null {
  const filled = slots.filter(Boolean) as string[];
  if (filled.length < 2) return null;
  for (const r of recipes) {
    if (r.inputs.length !== filled.length) continue;
    const a = [...r.inputs].sort().join(",");
    const b = [...filled].sort().join(",");
    if (a === b) return r;
  }
  return null;
}