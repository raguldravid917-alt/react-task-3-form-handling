const Header = () => {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <span className="brand-logo">R</span>
          <div className="brand-text">
            <span className="brand-title">React Task 3</span>
            <span className="brand-sub">Controlled Form • Validation</span>
          </div>
        </div>

        <nav className="nav">
          <button className="nav-chip">Form</button>
          <button className="nav-chip">Preview</button>
          <button className="nav-chip">About</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
