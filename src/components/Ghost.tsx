type GhostProps = {
  color: string;
  size?: number;
  scared?: boolean;
  eaten?: boolean;
};

export default function Ghost({
  color,
  size = 48,
  scared = false,
  eaten = false,
}: GhostProps) {
  const bodyColor = scared ? "#0000cc" : color;
  const pupilColor = scared ? "#ff0000" : "#1919c1";

  if (eaten) {
    // Just eyes remain when eaten
    return (
      <svg
        viewBox="0 0 28 20"
        width={size}
        height={Math.round((size * 20) / 28)}
      >
        <ellipse cx="9" cy="10" rx="4.5" ry="5" fill="white" />
        <ellipse cx="10" cy="11" rx="2" ry="2.5" fill={pupilColor} />
        <ellipse cx="19" cy="10" rx="4.5" ry="5" fill="white" />
        <ellipse cx="20" cy="11" rx="2" ry="2.5" fill={pupilColor} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 28 32"
      width={size}
      height={Math.round((size * 32) / 28)}
      className="block [image-rendering:pixelated]"
    >
      {/* Ghost body — rounded top, wavy bottom */}
      <path
        d={`
          M14,2
          A12,12 0 0 1 26,14
          L26,30
          Q23.5,27 21,30
          Q18.5,27 16,30
          Q13.5,27 11,30
          Q8.5,27  6,30
          Q3.5,27  2,30
          L2,14
          A12,12 0 0 1 14,2 Z
        `}
        fill={bodyColor}
        style={scared ? { stroke: "#4444ff", strokeWidth: 0.5 } : undefined}
      />
      {/* Left eye white */}
      <ellipse cx="10" cy="13" rx="4" ry="4.5" fill="white" />
      {/* Left pupil */}
      <ellipse cx="11" cy="14" rx="2" ry="2.5" fill={pupilColor} />
      {/* Right eye white */}
      <ellipse cx="18" cy="13" rx="4" ry="4.5" fill="white" />
      {/* Right pupil */}
      <ellipse cx="19" cy="14" rx="2" ry="2.5" fill={pupilColor} />
      {/* Scared wavy mouth */}
      {scared && (
        <path
          d="M8,22 Q10,19.5 12,22 Q14,19.5 16,22 Q18,19.5 20,22"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
