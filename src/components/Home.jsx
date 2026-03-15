import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-eyebrow">
          <svg viewBox="0 0 24 24">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          AI-Powered Analysis
        </div>

        <h1 className="hero-title">
          Analyze your resume<br />
          with <em>precision</em>
        </h1>

        <p className="hero-desc">
          Upload your resume and let AI evaluate your ATS score, extract key
          skills, and match you to job descriptions — all in seconds using
          Ollama running locally on your machine.
        </p>

        <div className="hero-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/upload")}
          >
            <svg viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Analyze Resume
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate("/match")}
          >
            Match to a Job →
          </button>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-wrap">
            <svg viewBox="0 0 24 24">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="feature-title">ATS Score</div>
          <div className="feature-desc">
            See how well your resume passes Applicant Tracking Systems used by
            modern recruiters and HR platforms.
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrap">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div className="feature-title">Job Matching</div>
          <div className="feature-desc">
            Paste a job description and get a detailed match score with tailored
            skill gap analysis and recommendations.
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrap">
            <svg viewBox="0 0 24 24">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div className="feature-title">AI Suggestions</div>
          <div className="feature-desc">
            Get actionable, personalized feedback on how to strengthen your
            resume for your target role and industry.
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrap">
            <svg viewBox="0 0 24 24">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="feature-title">Skill Extraction</div>
          <div className="feature-desc">
            Automatically detect technical and soft skills in your resume with
            AI-powered parsing and categorization.
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrap">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="feature-title">History Tracking</div>
          <div className="feature-desc">
            Keep a full log of every analysis you've run, with scores and
            insights saved for easy reference and comparison.
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrap">
            <svg viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <div className="feature-title">100% Local</div>
          <div className="feature-desc">
            Runs entirely on your machine via Ollama — your resume data never
            leaves your computer. Complete privacy guaranteed.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
