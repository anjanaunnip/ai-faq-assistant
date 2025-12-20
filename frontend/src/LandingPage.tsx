import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.glowTop} />
      <div style={styles.glowBottom} />

      <div style={styles.card}>
        <span style={styles.badge}>✨ AI Powered</span>

        <h1 style={styles.title}>
          AI-Powered{" "}
          <span style={styles.gradientText}>Support Knowledge Base</span>
        </h1>

        <p style={styles.subtitle}>
          Create, manage, and intelligently enhance FAQs with AI-driven rewriting
          for faster and smarter customer support.
        </p>

        <div style={styles.features}>
          <div>⚡ Lightning-fast FAQ Management</div>
          <div>🤖 Smart AI Answer Enhancement</div>
          <div>🔍 Effortless Search & Edit</div>
        </div>

        <button
          style={styles.primaryButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
            e.currentTarget.style.boxShadow =
              "0 25px 50px rgba(79,70,229,0.55)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow =
              "0 14px 28px rgba(79,70,229,0.45)";
          }}
          onClick={() => navigate("/dashboard")}
        >
          Go to FAQ Dashboard →
        </button>
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, #a5b4fc, transparent 45%), radial-gradient(circle at bottom right, #c084fc, transparent 45%), linear-gradient(135deg, #312e81, #4f46e5, #7c3aed)",
    backgroundSize: "200% 200%",
    animation: "gradientShift 14s ease infinite",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  glowTop: {
    position: "absolute",
    width: "520px",
    height: "520px",
    background: "#818cf8",
    filter: "blur(160px)",
    top: "-180px",
    left: "-180px",
    opacity: 0.6,
  },

  glowBottom: {
    position: "absolute",
    width: "520px",
    height: "520px",
    background: "#d8b4fe",
    filter: "blur(160px)",
    bottom: "-180px",
    right: "-180px",
    opacity: 0.6,
  },

  card: {
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(18px)",
    borderRadius: "22px",
    padding: "56px 52px",
    maxWidth: "620px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 50px 100px rgba(0,0,0,0.35)",
    animation: "fadeUp 0.8s ease",
    zIndex: 1,
  },

  badge: {
    display: "inline-block",
    background: "linear-gradient(135deg,#eef2ff,#e0e7ff)",
    color: "#4338ca",
    padding: "6px 18px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.6px",
    marginBottom: "20px",
  },

  title: {
    fontSize: "36px",
    fontWeight: "900",
    marginBottom: "18px",
    color: "#111827",
    lineHeight: 1.25,
  },

  gradientText: {
    background: "linear-gradient(135deg,#4f46e5,#9333ea)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    fontSize: "16.5px",
    color: "#6b7280",
    marginBottom: "34px",
    lineHeight: 1.75,
  },

  features: {
    display: "grid",
    gap: "12px",
    fontSize: "15px",
    color: "#374151",
    marginBottom: "40px",
  },

  primaryButton: {
    padding: "16px 38px",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 14px 28px rgba(79,70,229,0.45)",
    transition: "all 0.3s ease",
  },
};
