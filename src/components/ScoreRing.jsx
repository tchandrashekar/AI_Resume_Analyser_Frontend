function ScoreRing({ score, label, color = "#2563eb", size = 96 }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s >= 70) return color;
    if (s >= 50) return "#d97706";
    return "#dc2626";
  };

  const ringColor = getColor(score);

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#f0ede8"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="score-ring-label">
        <span className="score-number" style={{ color: ringColor }}>
          {score}
        </span>
        <span className="score-sub-label">{label}</span>
      </div>
    </div>
  );
}

export default ScoreRing;
