import "../assets/ExplainCss/explain.css";

export default function ExplainBank({ features }) {
  return (
    <section className="features">
      {features.map((f, index) => (
        <div className="feature-item" key={index}>
          <img src={f.icon} alt={`${f.title} Icon`} className="feature-icon" />
          <h3 className="feature-item-title">{f.title}</h3>
          <p>{f.text}</p>
        </div>
      ))}
    </section>
  );
}