/*import { useState } from "react";
import { uploadResume } from "../services/api";

function UploadResume() {

  const [file,setFile] = useState(null);
  const [result,setResult] = useState(null);
  const [loading,setLoading] = useState(false);

  const handleUpload = async () => {

    if(!file){
      alert("Please select a file");
      return;
    }

    setLoading(true);

    const response = await uploadResume(file);

    setResult(response.data);
    setLoading(false);

  };

  return (

    <div>

      <h2>Upload Resume</h2>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <br/><br/>

      <button onClick={handleUpload}>
        Analyze Resume
      </button>

      {loading && <p>Analyzing Resume using AI...</p>}

      {result && (

        <div>

          <h3>ATS Score: {result.score}</h3>

          <h4>Skills</h4>

          <ul>
            {result.skills.map((skill,index)=>(
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h4>Suggestions</h4>

          <p>{result.suggestions}</p>

        </div>

      )}

    </div>

  );

}

export default UploadResume;
*/
import { useState, useRef } from "react";
import { uploadResume } from "../services/api";
import ScoreRing from "./ScoreRing";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
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

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await uploadResume(file);
      setResult(response.data);
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
    if (score >= 75) return { badgeClass: "badge-green", label: "Good Match" };
    if (score >= 50) return { badgeClass: "badge-amber", label: "Needs Work" };
    return { badgeClass: "badge-red", label: "Poor Match" };
  };

  const getScoreDesc = (score) => {
    if (score >= 75) return "Great — your resume is well-optimized for ATS systems.";
    if (score >= 50) return "Fair — a few improvements could boost your score significantly.";
    return "Needs work — consider revising your resume with ATS best practices.";
  };

  const fileExt = file
    ? file.name.split(".").pop().toUpperCase()
    : "PDF";

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Upload &amp; Analyze</div>
        <div className="page-subtitle">
          Let AI evaluate your resume for ATS compatibility, skill extraction,
          and improvement suggestions.
        </div>
      </div>

      <div className="two-col-grid">
        {/* LEFT: Upload Panel */}
        <div>
          <div className="card">
            <div className="card-label">Resume File</div>

            {!file ? (
              <div
                className={`upload-zone${dragOver ? " drag-over" : ""}`}
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
                <div className="upload-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div className="upload-title">Drop your resume here</div>
                <div className="upload-hint">
                  Supports PDF, DOC, DOCX — up to 10MB
                </div>
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

            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: "14px" }}
              onClick={handleAnalyze}
              disabled={!file || loading}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ borderTopColor: "#fff", borderColor: "rgba(255,255,255,0.3)" }} />
                  Analyzing...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Analyze Resume
                </>
              )}
            </button>
          </div>

          {loading && (
            <div className="loading-banner">
              <div className="spinner" />
              <div>
                <div className="loading-label">Analyzing with AI...</div>
                <div className="loading-sub">
                  Ollama is processing your resume
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
            {/* Score */}
            <div className="score-ring-wrap">
              <ScoreRing score={result.score} label="ATS" />
              <div>
                <div className="score-info-title">ATS Score</div>
                <div className="score-info-desc">
                  {getScoreDesc(result.score)}
                </div>
                <span
                  className={`badge ${getScoreVariant(result.score).badgeClass}`}
                >
                  {getScoreVariant(result.score).label}
                </span>
              </div>
            </div>

            {/* Skills */}
            <div className="section-divider">
              <span>Detected Skills</span>
            </div>
            <div className="chip-wrap">
              {Array.isArray(result.skills) && result.skills.length > 0 ? (
                result.skills.map((skill, i) => (
                  <span key={i} className="chip chip-accent">
                    {skill}
                  </span>
                ))
              ) : (
                <span style={{ fontSize: "13px", color: "var(--c-muted)" }}>
                  No skills detected
                </span>
              )}
            </div>

            {/* Suggestions */}
            <div className="section-divider" style={{ marginTop: "20px" }}>
              <span>AI Suggestions</span>
            </div>
            {result.suggestions ? (
              typeof result.suggestions === "string" ? (
                result.suggestions
                  .split(/\n|\.(?=\s)/)
                  .filter((s) => s.trim().length > 10)
                  .map((s, i) => (
                    <div key={i} className="suggestion-item">
                      <div className="sug-dot" />
                      <div className="sug-text">{s.trim()}</div>
                    </div>
                  ))
              ) : Array.isArray(result.suggestions) ? (
                result.suggestions.map((s, i) => (
                  <div key={i} className="suggestion-item">
                    <div className="sug-dot" />
                    <div className="sug-text">{s}</div>
                  </div>
                ))
              ) : null
            ) : (
              <div style={{ fontSize: "13px", color: "var(--c-muted)" }}>
                No suggestions available
              </div>
            )}
          </div>
        ) : (
          <div className="card card-dashed placeholder-panel">
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div className="empty-title">No analysis yet</div>
              <div className="empty-sub">
                Upload a resume and click Analyze to see results
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadResume;
