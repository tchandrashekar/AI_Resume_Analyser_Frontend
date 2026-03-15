
import { useEffect, useState } from "react";
import { getHistory } from "../services/api";

function ScorePill({ score }) {
  if (score == null) return <span style={{ color: "var(--c-hint)" }}>—</span>;
  const cls =
    score >= 70 ? "badge-green" : score >= 50 ? "badge-amber" : "badge-red";
  return (
    <span className={`score-pill ${cls}`}>{score}</span>
  );
}

function MatchPill({ score }) {
  if (score == null) return <span style={{ color: "var(--c-hint)" }}>—</span>;
  const cls =
    score >= 70 ? "badge-green" : score >= 50 ? "badge-amber" : "badge-red";
  return (
    <span className={`score-pill ${cls}`}>{score}%</span>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getHistory();
      setData([...(res.data || [])].reverse());
    } catch (err) {
      setError("Could not load history. Make sure the Spring Boot server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const atsScores = data.filter((d) => d.score != null).map((d) => d.score);
  const matchScores = data
    .filter((d) => d.matchScore != null)
    .map((d) => d.matchScore);

  const avgAts = atsScores.length
    ? Math.round(atsScores.reduce((a, b) => a + b, 0) / atsScores.length)
    : null;

  const avgMatch = matchScores.length
    ? Math.round(matchScores.reduce((a, b) => a + b, 0) / matchScores.length)
    : null;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Analysis History</div>
        <div className="page-subtitle">
          All your previous resume analyses and match results in one place.
        </div>
      </div>

      {/* Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-val">{data.length}</div>
          <div className="metric-label">Total Analyses</div>
          <span className="badge badge-blue">All time</span>
        </div>
        <div className="metric-card">
          <div className="metric-val">{avgAts ?? "—"}</div>
          <div className="metric-label">Avg ATS Score</div>
          <span className={`badge ${avgAts == null ? "badge-gray" : avgAts >= 70 ? "badge-green" : "badge-amber"}`}>
            {avgAts == null ? "No data" : "Average"}
          </span>
        </div>
        <div className="metric-card">
          <div className="metric-val">{avgMatch != null ? `${avgMatch}%` : "—"}</div>
          <div className="metric-label">Avg Match Score</div>
          <span className={`badge ${avgMatch == null ? "badge-gray" : avgMatch >= 70 ? "badge-green" : "badge-amber"}`}>
            {avgMatch == null ? "No data" : "Average"}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: "20px 24px" }}>
        <div className="table-header-row">
          <div className="card-label" style={{ margin: 0 }}>
            Recent Analyses
          </div>
          <button
            className="btn btn-outline"
            style={{ fontSize: 12, padding: "6px 14px" }}
            onClick={fetchHistory}
            disabled={loading}
          >
            <svg viewBox="0 0 24 24">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.16" />
            </svg>
            Refresh
          </button>
        </div>

        {loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "32px 0",
              color: "var(--c-muted)",
              fontSize: 13,
            }}
          >
            <div className="spinner" />
            Loading history...
          </div>
        )}

        {error && !loading && (
          <div className="error-banner">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="empty-title">No analyses yet</div>
            <div className="empty-sub">
              Upload a resume to get started
            </div>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <table className="history-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>ATS Score</th>
                <th>Match Score</th>
                <th>Skills</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="file-name-cell">{item.fileName}</div>
                  </td>
                  <td>
                    <ScorePill score={item.score} />
                  </td>
                  <td>
                    <MatchPill score={item.matchScore} />
                  </td>
                  <td>
                    <div className="skills-cell">
                      {Array.isArray(item.skills)
                        ? item.skills.join(", ")
                        : item.skills || "—"}
                    </div>
                  </td>
                  <td className="date-cell">{formatDate(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default History;
