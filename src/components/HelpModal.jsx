import { useEffect, useState } from "react";
import { HELP_TABS } from "../content/helpContent";
import "../styles/Help.css";

function HelpContent({ title, showIntro, onClose }) {
  const [activeTab, setActiveTab] = useState(HELP_TABS[0].id);
  const tab = HELP_TABS.find((item) => item.id === activeTab) ?? HELP_TABS[0];

  return (
    <>
      <header className="helpPanelHeader">
        <h2 id="help-title">{title}</h2>
        <button
          type="button"
          className="helpPanelClose"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
      </header>

      {showIntro && (
        <p className="helpPanelIntro">
          Краткий обзор правил и управления. Полную справку можно открыть
          кнопкой «?» справа от поля.
        </p>
      )}

      <nav className="helpTabs">
        {HELP_TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`helpTabsBtn${
              activeTab === id ? " helpTabsBtnActive" : ""
            }`}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="helpPanelBody">
        {tab.sections.map(({ title: sectionTitle, body }) => (
          <section key={sectionTitle} className="helpSection">
            <h3>{sectionTitle}</h3>
            <p>{body}</p>
          </section>
        ))}
      </div>

      <footer className="helpPanelFooter">
        <button type="button" className="lifeBtn lifeBtnPrimary" onClick={onClose}>
          Понятно
        </button>
      </footer>
    </>
  );
}

export function HelpDrawer({ onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="helpPanelInner"
      role="dialog"
      aria-modal="false"
      aria-labelledby="help-title"
    >
      <HelpContent title="Справка" onClose={onClose} />
    </div>
  );
}

export function HelpWelcomeModal({ onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="helpOverlay" onClick={onClose} role="presentation">
      <div
        className="helpWelcome"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
      >
        <HelpContent title="Добро пожаловать" showIntro onClose={onClose} />
      </div>
    </div>
  );
}

export default function HelpModal({ isOpen, placement, onClose }) {
  if (!isOpen || placement !== "center") {
    return null;
  }

  return <HelpWelcomeModal onClose={onClose} />;
}
