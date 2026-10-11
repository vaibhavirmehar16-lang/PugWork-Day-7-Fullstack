export default function Loading() {
  return (
    <div className="state-card" aria-live="polite">
      <div className="eyebrow">PugWork workspace</div>
      <h2>Preparing your workspace</h2>
      <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
        <div className="loading-line" />
        <div className="loading-line" style={{ width: "80%" }} />
        <div className="loading-line" style={{ width: "65%" }} />
      </div>
    </div>
  );
}
