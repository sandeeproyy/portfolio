import React from "react";

type Props = {
  name: string;
  size?: number;
  className?: string;
};

export function TechIcon({ name, size = 16, className = "" }: Props) {
  const normName = name.toLowerCase().trim();

  // Python Logo (interlocking blue and yellow snakes)
  if (normName === "python") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.933 2C8.22 2 8.5 3.61 8.5 3.61l.012 1.66h6.877c.433 0 .783.35.783.784v2.35h3.136s1.614-.28 1.614 3.43c0 3.714-1.398 3.59-1.398 3.59h-.94v-1.325c0-.867-.702-1.57-1.57-1.57H10.28a1.57 1.57 0 01-1.57-1.57V7.854c0-.868.703-1.57 1.57-1.57h6.878V4.623s.385-2.623-5.225-2.623z"
          fill="#3776AB"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.067 22c3.713 0 3.433-1.61 3.433-1.61l-.012-1.66H8.611a.784.784 0 01-.783-.784v-2.35H4.692s-1.614.28-1.614-3.43c0-3.714 1.398-3.59 1.398-3.59h.94v1.325c0 .867.702 1.57 1.57 1.57h6.917c.868 0 1.57.703 1.57 1.57v2.723c0 .868-.702 1.57-1.57 1.57H6.985v1.662s-.385 2.623 5.082 2.623z"
          fill="#FFE052"
        />
        <circle cx="10" cy="4.5" r="0.75" fill="#fff" />
        <circle cx="14" cy="19.5" r="0.75" fill="#fff" />
      </svg>
    );
  }

  // C/C++ Logo (classic blue shield with C++ outline)
  if (normName === "c/c++" || normName === "c++" || normName === "cpp") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" fill="#00599C" />
        <path d="M11.5 8H8a3.5 3.5 0 000 7h3.5v-1.5H8a2 2 0 110-4h3.5V8z" fill="#fff" />
        <path
          d="M13.5 11.5h1.5V10h1v1.5H17.5v1h-1.5V14h-1v-1.5h-1.5v-1zm4.5 0h1.5V10h1v1.5H22v1h-1.5V14h-1v-1.5H18v-1z"
          fill="#fff"
        />
      </svg>
    );
  }

  // Docker Logo (blue whale with cargo boxes)
  if (normName === "docker") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <path
          d="M13.962 11.758c0-.395-.316-.712-.705-.712h-1.921c-.39 0-.705.317-.705.712v1.9c0 .394.316.711.705.711h1.921c.39 0 .705-.317.705-.711v-1.9zm3.033 0c0-.395-.317-.712-.706-.712H14.37c-.39 0-.705.317-.705.712v1.9c0 .394.316.711.705.711h1.92c.389 0 .706-.317.706-.711v-1.9zm-6.066-3.04c0-.395-.316-.711-.705-.711H8.303c-.39 0-.705.316-.705.711v1.901c0 .395.316.712.705.712h1.921c.39 0 .705-.317.705-.712V8.718zm3.033 0c0-.395-.317-.711-.705-.711h-1.921c-.39 0-.705.316-.705.711v1.901c0 .395.316.712.705.712h1.921c.39 0 .705-.317.705-.712V8.718zm3.033 0c0-.395-.316-.711-.705-.711h-1.92c-.39 0-.706.316-.706.711v1.901c0 .395.317.712.706.712h1.92c.39 0 .705-.317.705-.712V8.718zm-6.066-3.04c0-.394-.316-.711-.705-.711H8.303c-.39 0-.705.317-.705.711v1.9c0 .395.316.712.705.712h1.921c.39 0 .705-.317.705-.712v-1.9zm3.033 0c0-.394-.317-.711-.705-.711h-1.921c-.39 0-.705.317-.705.711v1.9c0 .395.316.712.705.712h1.921c.39 0 .705-.317.705-.712v-1.9zm-6.066 6.08c0-.394-.316-.711-.705-.711H5.27c-.39 0-.705.317-.705.711v1.9c0 .395.316.712.705.712H6.98c.39 0 .705-.317.705-.712v-1.9z"
          fill="#2496ED"
        />
        <path
          d="M23.754 13.064c-.318-.847-1.161-1.378-1.906-1.745-.694-.343-1.464-.473-2.228-.473-1.637 0-3.13.784-4.043 1.956-.37-.09-.762-.132-1.15-.125-.333.006-.66.043-.98.113V15.7h10.428s.867-.323 1.155-1.424c.08-.306.113-.615.11-.926a2.033 2.033 0 00-.386-1.286z"
          fill="#2496ED"
        />
        <path d="M1 15.7h22v1H1v-1z" fill="#2496ED" />
      </svg>
    );
  }

  // Git / GitHub Logo
  if (normName === "git" || normName === "git / github" || normName === "github") {
    if (normName === "github") {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
          />
        </svg>
      );
    }
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <path
          d="M22.05 11.3l-9.35-9.35a1.05 1.05 0 00-1.48 0L9.4 3.78l3.14 3.14a2.24 2.24 0 012.2 2.2 2.25 2.25 0 01-2.2 2.26 2.25 2.25 0 01-2.25-2.2c0-.52.17-1 .47-1.4L7.62 4.63 1.95 10.3a1.05 1.05 0 000 1.48l9.35 9.35c.4.4 1.08.4 1.48 0l9.27-9.35a1.05 1.05 0 000-1.48z"
          fill="#F05032"
        />
        <circle cx="12" cy="9" r="1.5" fill="#fff" />
        <circle cx="12" cy="15" r="1.5" fill="#fff" />
        <circle cx="6.5" cy="12" r="1.5" fill="#fff" />
      </svg>
    );
  }

  // ROS / ROS 2 Logo (connected circle nodes)
  if (normName === "ros" || normName === "ros / ros 2" || normName === "ros 2") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" stroke="#22316C" strokeWidth="2" />
        <circle cx="12" cy="6" r="2" fill="#0A7BBB" />
        <circle cx="18" cy="12" r="2" fill="#0A7BBB" />
        <circle cx="12" cy="18" r="2" fill="#0A7BBB" />
        <circle cx="6" cy="12" r="2" fill="#0A7BBB" />
        <circle cx="16.24" cy="7.76" r="2" fill="#0A7BBB" />
        <circle cx="16.24" cy="16.24" r="2" fill="#0A7BBB" />
        <circle cx="7.76" cy="16.24" r="2" fill="#0A7BBB" />
        <circle cx="7.76" cy="7.76" r="2" fill="#0A7BBB" />
        <circle cx="12" cy="12" r="2.5" fill="#E23028" />
        <path d="M12 8v8M8 12h8" stroke="#0A7BBB" strokeWidth="0.75" />
      </svg>
    );
  }

  // PyTorch Logo (orange flame/shard shape)
  if (normName === "pytorch") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <path
          d="M12 2C8.62 2.37 5.76 4.67 4.54 7.84a10.635 10.635 0 00.32 8.35 10.778 10.778 0 006.18 5.48c.31.11.64.13.96.13a4.773 4.773 0 01-3.23-2.18 5.727 5.727 0 01-.65-4.46c.39-1.9 1.63-3.56 3.32-4.48l.56-.3V8.7l-.54.26a4.265 4.265 0 00-2.45 3.86 4.3 4.3 0 001.07 2.87 3.4 3.4 0 011.66-2.58l.58-.33V3.6l-.58.33a5.532 5.532 0 00-2.3 2.1c-.24.38-.4.81-.46 1.25V5.5A7.545 7.545 0 0112 2z"
          fill="#EE4C2C"
        />
        <path
          d="M12.04 8.78l-.54.3a4.256 4.256 0 00-2.46 3.85 4.3 4.3 0 001.07 2.88c.84-.71 1.93-1.07 3.01-1.02.43.02.85.1 1.25.23a3.398 3.398 0 001.66-2.58l.58-.33v-1.63c-.1.08-.2.15-.3.23a5.776 5.776 0 01-4.27 1.23c.31-.96.9-1.8 1.68-2.42l.32-.24v-1.62l-.32.22a5.518 5.518 0 00-1.68 2.4c.09-.9.4-1.76.91-2.5l.3-.43V4.99a7.518 7.518 0 00-1.52 3.79z"
          fill="#EE4C2C"
        />
      </svg>
    );
  }

  // TensorFlow Logo (orange/yellow cube T)
  if (normName === "tensorflow") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#FF9F00" opacity="0.15" />
        <path d="M12 2L3 7v10l9 5V12h9V7l-9-5z" fill="#FF6F00" />
        <path d="M12 6.5l-6 3.3v4.4h3V12h3V6.5z" fill="#FFE082" />
        <path d="M12 6.5V12h6V9.8l-6-3.3z" fill="#FFA000" />
      </svg>
    );
  }

  // SolidWorks Logo (red cube structure)
  if (normName === "solidworks") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#E21B23" />
        <path
          d="M8 8.5C8 7.67 8.67 7 9.5 7H15V8.5H9.5a.5.5 0 00-.5.5v2c0 .28.22.5.5.5h4c.83 0 1.5.67 1.5 1.5v2c0 .83-.67 1.5-1.5 1.5H9.5A2.5 2.5 0 017 14.5v-1h1.5v1c0 .55.45 1 1 1H14c.28 0 .5-.22.5-.5v-2a.5.5 0 00-.5-.5h-4A2.5 2.5 0 017 9.5v-1z"
          fill="#fff"
        />
        <path d="M17 7v10h-1.5V9l-1.5 1.5-1-1 3.5-3.5H17z" fill="#fff" opacity="0.8" />
      </svg>
    );
  }

  // Autodesk Fusion 360 Logo (orange abstract F)
  if (normName === "autodesk fusion 360" || normName === "fusion 360" || normName === "fusion") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <circle cx="12" cy="12" r="11" fill="#F05123" />
        <path
          d="M8 7h7.5a.5.5 0 01.5.5v1.5a.5.5 0 01-.5.5H10v2h4.5a.5.5 0 01.5.5v1.5a.5.5 0 01-.5.5H10v4H8V7z"
          fill="#fff"
        />
        <path d="M11.5 10.5h2v1.5h-2z" fill="#fff" opacity="0.6" />
      </svg>
    );
  }

  // ANSYS Workbench Logo (yellow curves)
  if (
    normName === "ansys" ||
    normName === "ansys workbench" ||
    normName === "ansys workbench (static, modal, cfd)"
  ) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <rect width="24" height="24" rx="4" fill="#000" />
        <path d="M5 19V5h4.5l5 9.5V5H19v14h-4.5l-5-9.5V19H5z" fill="#FFC72C" />
      </svg>
    );
  }

  // MATLAB Logo (classic 3D L-membrane shape)
  if (normName === "matlab") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <path
          d="M3 18s2.5-3 5-3 4.5 4 7 4 6-5 6-5V5s-3.5 5-6 5-4.5-4-7-4-5 3-5 3v14z"
          fill="#D22A2D"
        />
        <path
          d="M3 18s2.5-3 5-3 4.5 4 7 4 6-5 6-5"
          stroke="#E66567"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M8 15V4m7 15V10" stroke="#FF9D9F" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    );
  }

  // Linux Logo (Tux penguin mascot shape)
  if (normName === "linux") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <path
          d="M12 2C8 2 6.5 4.5 6.5 7c0 .82.26 1.84.67 2.62C6.46 10.43 6 11.59 6 12.87c0 3.32 2.68 6.01 6 6.01s6-2.69 6-6.01c0-1.28-.46-2.44-1.17-3.25.41-.78.67-1.8.67-2.62C17.5 4.5 16 2 12 2z"
          fill="#333"
        />
        <circle cx="9.5" cy="8.5" r="1.5" fill="#fff" />
        <circle cx="9.5" cy="8.5" r="0.75" fill="#000" />
        <circle cx="14.5" cy="8.5" r="1.5" fill="#fff" />
        <circle cx="14.5" cy="8.5" r="0.75" fill="#000" />
        <path
          d="M9 11.5s1.5 2 3 2 3-2 3-2"
          stroke="#FFD13B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path d="M5 19.5c0-1.38 1.5-2.5 5-2.5h4c3.5 0 5 1.12 5 2.5v1.5H5v-1.5z" fill="#FFA726" />
      </svg>
    );
  }

  // Arduino Logo (Teal infinity loop with plus and minus)
  if (normName === "arduino") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.714 6.857C4.808 6.857 2.43 9.123 2.43 12c0 2.877 2.378 5.143 5.284 5.143 2.062 0 3.844-1.144 4.702-2.825a5.409 5.409 0 01.768-.901c.285.344.621.65.986.907.857 1.68 2.64 2.819 4.701 2.819 2.906 0 5.284-2.266 5.284-5.143 0-2.877-2.378-5.143-5.284-5.143-2.062 0-3.844 1.144-4.701 2.825a5.4 5.4 0 01-.782.915 5.378 5.378 0 01-.986-.921C11.558 8.001 9.776 6.857 7.714 6.857zm.006 8.571a3.434 3.434 0 01-3.428-3.428 3.434 3.434 0 013.428-3.429A3.434 3.434 0 0111.14 12a3.434 3.434 0 01-3.42 3.428zm8.566-6.857c-1.895 0-3.428 1.533-3.428 3.429a3.434 3.434 0 003.428 3.428A3.434 3.434 0 0019.714 12a3.434 3.434 0 00-3.428-3.429z"
          fill="#00979D"
        />
        <path
          d="M5.571 12h4.286M14.143 12h4.285M16.286 9.857v4.286"
          stroke="#00979D"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // OpenCV Logo (RGB interlocking rings)
  if (normName === "opencv") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <circle cx="12" cy="7.5" r="4.5" stroke="#E23028" strokeWidth="2.5" />
        <circle cx="7.5" cy="15.5" r="4.5" stroke="#3ed47a" strokeWidth="2.5" />
        <circle cx="16.5" cy="15.5" r="4.5" stroke="#3c6bd6" strokeWidth="2.5" />
        <circle cx="12" cy="7.5" r="4.5" stroke="#fff" strokeWidth="0.75" />
        <circle cx="7.5" cy="15.5" r="4.5" stroke="#fff" strokeWidth="0.75" />
        <circle cx="16.5" cy="15.5" r="4.5" stroke="#fff" strokeWidth="0.75" />
      </svg>
    );
  }

  // NumPy Logo (isometric blue lattice grid)
  if (normName === "numpy") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <rect width="24" height="24" rx="4" fill="#013243" />
        <path
          d="M6 10l6-3 6 3-6 3-6-3zm0 4l6-3 6 3-6 3-6-3zm6-7v8m-6-1v4l6 3m6-7v4l-6 3"
          stroke="#4DABF7"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  // Pandas (two-toned grid bars)
  if (normName === "pandas" || normName === "numpy / pandas") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <rect width="24" height="24" rx="4" fill="#150458" />
        <path d="M5 6h5v12H5V6zm9 0h5v12h-5V6zm-4 4h4v8h-4v-8z" fill="#FFCA28" />
        <path d="M10 6h4v4h-4V6z" fill="#E65100" />
      </svg>
    );
  }

  // Scikit-learn Logo (triple mesh structure)
  if (normName === "scikit-learn") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <rect width="24" height="24" rx="4" fill="#F89938" />
        <path
          d="M6 8a4 4 0 018 0c0 2.2-1.8 4-4 4a4 4 0 01-4-4zm8 8a4 4 0 018 0c0 2.2-1.8 4-4 4a4 4 0 01-4-4z"
          fill="#3499CD"
        />
        <circle cx="10" cy="8" r="1.5" fill="#fff" />
        <circle cx="18" cy="16" r="1.5" fill="#fff" />
        <path d="M10 8l8 8" stroke="#fff" strokeWidth="1.5" />
      </svg>
    );
  }

  // NVIDIA / NVIDIA Jetson Logo (green shield)
  if (normName === "nvidia" || normName === "nvidia jetson" || normName === "nvidia logo") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <path d="M12 2L3 5v7c0 5 3.5 9 9 10 5.5-1 9-5 9-10V5l-9-3z" fill="#76B900" />
        <path
          d="M12 5.5A6.5 6.5 0 005.5 12h2a4.5 4.5 0 018.66-1.5H18.3A6.5 6.5 0 0012 5.5zm0 3A3.5 3.5 0 008.5 12h2a1.5 1.5 0 011.5-1.5h.5a1.5 1.5 0 011.5 1.5h2a3.5 3.5 0 00-4-3.5z"
          fill="#fff"
        />
      </svg>
    );
  }

  // Keras (capital K letter block)
  if (normName === "keras") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <rect width="24" height="24" rx="4" fill="#D00000" />
        <path d="M7 6h2.5v4.5L13.5 6h3l-4.5 5 5 7h-3L10 12.5V18H7V6z" fill="#fff" />
      </svg>
    );
  }

  // Bash (command line terminal symbol)
  if (normName === "bash" || normName === "shell" || normName === "command line") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden
      >
        <rect width="24" height="24" rx="4" fill="#2E3440" />
        <path
          d="M6 7l5 5-5 5M12 16h6"
          stroke="#4C566A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 7l5 5-5 5M12 16h6"
          stroke="#88C0D0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Default Terminal / Code Bracket fallback
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
