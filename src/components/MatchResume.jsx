

import { useState, useRef } from "react";
import { matchResume } from "../services/api";
import ScoreRing from "./ScoreRing";

const TABS = [
  { key: "matched", label: "Matched Skills" },
  { key: "missing", label: "Gap Analysis" },
  { key: "suggestions", label: "Suggestions" },
];

function MatchResume() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState("matched");
  const fileInputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setResult(null);
    setError(null);
  };

  const clearFile = () => {
    setFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const isReady = file && jobDescription.trim().length > 10;

  const handleMatch = async () => {
    if (!isReady) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await matchResume(file, jobDescription);
      setResult(response.data);
      setActiveTab("matched");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Make sure the Spring Boot server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const getScoreVariant = (score) => {
    if (score >= 75) return { badgeClass: "badge-green", label: "Strong Fit" };
    if (score >= 50) return { badgeClass: "badge-amber", label: "Moderate Fit" };
    return { badgeClass: "badge-red", label: "Weak Fit" };
  };

  const getScoreDesc = (score) => {
    if (score >= 75) return "Strong candidate — you match most key requirements.";
    if (score >= 50) return "Moderate fit — address a few skill gaps to improve.";
    return "Low fit — significant gaps exist for this role.";
  };

  const fileExt = file ? file.name.split(".").pop().toUpperCase() : "PDF";

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Job Match Analysis</div>
        <div className="page-subtitle">
          Compare your resume against a job description to see how well you
          qualify and where to improve.
        </div>
      </div>

      <div className="two-col-grid">
        {/* LEFT: Input Panel */}
        <div>
          <div className="card">
            <div className="card-label">Resume File</div>

            {!file ? (
              <div
                className={`upload-zone${dragOver ? " drag-over" : ""}`}
                style={{ padding: "28px 20px" }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                <div
                  className="upload-icon"
                  style={{ width: 36, height: 36, borderRadius: 9, marginBottom: 10 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    style={{ width: 16, height: 16, stroke: "var(--c-accent)", fill: "none", strokeWidth: 2, strokeLinecap: "round" }}
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>
                  Click or drag to upload resume
                </div>
                <div className="upload-hint">PDF, DOC, DOCX</div>
              </div>
            ) : (
              <div className="file-selected-row">
                <div className="file-ext-badge">{fileExt}</div>
                <div className="file-name-text">{file.name}</div>
                <button className="file-clear-btn" onClick={clearFile}>
                  ×
                </button>
              </div>
            )}

            <div style={{ marginTop: "18px" }}>
              <div className="card-label">Job Description</div>
              <textarea
                className="jd-textarea"
                rows={9}
                placeholder={
                  "Paste the full job description here...\n\nInclude required skills, qualifications, and responsibilities for the best match analysis."
                }
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: "14px" }}
              onClick={handleMatch}
              disabled={!isReady || loading}
            >
              {loading ? (
                <>
                  <div
                    className="spinner"
                    style={{ borderTopColor: "#fff", borderColor: "rgba(255,255,255,0.3)" }}
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Match Resume
                </>
              )}
            </button>
          </div>

          {loading && (
            <div className="loading-banner">
              <div className="spinner" />
              <div>
                <div className="loading-label">Comparing with AI...</div>
                <div className="loading-sub">
                  Analyzing skill overlap &amp; fit
                </div>
              </div>
            </div>
          )}

          {error && (
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
        </div>

        {/* RIGHT: Result or Placeholder */}
        {result ? (
          <div className="card">
            {/* Score Ring */}
            <div className="score-ring-wrap">
              <ScoreRing
                score={result.matchScore}
                label="Match"
                color="#166534"
              />
              <div>
                <div className="score-info-title">Match Score</div>
                <div className="score-info-desc">
                  {getScoreDesc(result.matchScore)}
                </div>
                <span
                  className={`badge ${getScoreVariant(result.matchScore).badgeClass}`}
                >
                  {getScoreVariant(result.matchScore).label}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="inline-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  className={`itab${activeTab === tab.key ? " active" : ""}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Matched Skills */}
            {activeTab === "matched" && (
              <div>
                <div className="card-label">
                  Skills from your resume that match the job
                </div>
                <div className="chip-wrap" style={{ marginTop: 10 }}>
                  {Array.isArray(result.matchedskills) &&
                  result.matchedskills.length > 0 ? (
                    result.matchedskills.map((s, i) => (
                      <span key={i} className="chip chip-match">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: 13, color: "var(--c-muted)" }}>
                      No matched skills detected
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Gap Analysis */}
            {activeTab === "missing" && (
              <div>
                <div className="card-label">
                  Skills in the JD not found in your resume
                </div>
                <div className="chip-wrap" style={{ marginTop: 10 }}>
                  {Array.isArray(result.missingSkills) &&
                  result.missingSkills.length > 0 ? (
                    result.missingSkills.map((s, i) => (
                      <span key={i} className="chip chip-neutral">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span
                      className="badge badge-green"
                      style={{ fontSize: 12 }}
                    >
                      No major gaps detected!
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Suggestions */}
            {activeTab === "suggestions" && (
              <div>
                {result.suggestions ? (
                  typeof result.suggestions === "string" ? (
                    result.suggestions
                      .split(/\n|\.(?=\s)/)
                      .filter((s) => s.trim().length > 10)
                      .map((s, i) => (
                        <div key={i} className="suggestion-item">
                          <div
                            className="sug-dot"
                            style={{ background: "var(--c-green)" }}
                          />
                          <div className="sug-text">{s.trim()}</div>
                        </div>
                      ))
                  ) : Array.isArray(result.suggestions) ? (
                    result.suggestions.map((s, i) => (
                      <div key={i} className="suggestion-item">
                        <div
                          className="sug-dot"
                          style={{ background: "var(--c-green)" }}
                        />
                        <div className="sug-text">{s}</div>
                      </div>
                    ))
                  ) : null
                ) : (
                  <span style={{ fontSize: 13, color: "var(--c-muted)" }}>
                    No suggestions available
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="card card-dashed placeholder-panel">
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div className="empty-title">No match results yet</div>
              <div className="empty-sub">
                Upload a resume and paste a job description to see your match
                score
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchResume;
