"use client";

export function CollapsibleSection({ title, content, isOpen, toggleSection }) {
  return (
    <div className="CollapsibleSection">
      <div className="SectionHeader" onClick={toggleSection}>
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className="SectionContent">{content}</div>}
    </div>
  );
}
