import { NavLink } from "react-router-dom";

const HomeIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UploadIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon">
            <FileIcon />
          </div>
          <div>
            <div className="logo-text">ResumeAI</div>
            <div className="logo-sub">Powered by Ollama</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">Main</div>

        <NavLink
          to="/"
          end
          className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
        >
          <HomeIcon />
          Home
        </NavLink>

        <NavLink
          to="/upload"
          className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
        >
          <UploadIcon />
          Upload &amp; Analyze
        </NavLink>

        <NavLink
          to="/match"
          className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
        >
          <SearchIcon />
          Job Match
        </NavLink>

        <div className="nav-section" style={{ marginTop: "8px" }}>Reports</div>

        <NavLink
          to="/history"
          className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
        >
          <HistoryIcon />
          History
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="avatar-row">
          <div className="avatar">U</div>
          <div>
            <div className="avatar-name">User Account</div>
            <div className="avatar-plan">Free Plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
