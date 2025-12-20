import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchFAQs,
  addFAQ,
  updateFAQ,
  deleteFAQ,
  rewriteAnswer,
  FAQ,
} from "./api";

export default function Dashboard() {
  const navigate = useNavigate();
  const questionRef = useRef<HTMLInputElement>(null);

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [search, setSearch] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const loadFAQs = async () => {
    const data = await fetchFAQs();
    setFaqs(data);
  };

  useEffect(() => {
    loadFAQs();
  }, []);

  const cleanAnswer = answer.replace(/^Improved version:\s*/i, "");

  const handleSubmit = async () => {
    if (!question || !answer) return alert("Both fields required");

    if (editingId) {
      await updateFAQ(editingId, { question, answer: cleanAnswer });
      setEditingId(null);
    } else {
      await addFAQ({ question, answer: cleanAnswer });
    }

    setQuestion("");
    setAnswer("");
    loadFAQs();
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);

    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      questionRef.current?.focus();
    }, 400);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this FAQ?")) {
      await deleteFAQ(id);
      loadFAQs();
    }
  };

  const hoverIn = (e: any) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
  };

  const hoverOut = (e: any) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      e.currentTarget.dataset.shadow || "none";
  };

  return (
    <div style={styles.page}>
      {showPopup && (
        <div style={styles.popup}>
          Answer rewritten and replaced successfully
        </div>
      )}

      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate("/")}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          ← Back to Landing
        </button>

        <h1 style={styles.heading}>FAQ Dashboard</h1>
      </div>

      <input
        placeholder="Search question..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <div
        style={styles.card}
        data-shadow="0 12px 30px rgba(0,0,0,0.08)"
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        <h3 style={{ marginBottom: "16px" }}>
          {editingId ? "Edit FAQ" : "Add New FAQ"}
        </h3>

        <input
          ref={questionRef}
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={styles.textarea}
        />

        <div style={styles.buttonRow}>
          <button
            style={styles.aiButton}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            onClick={async () => {
              if (!answer) return alert("Enter answer first");
              const data = await rewriteAnswer(answer);
              setAnswer(data.rewrittenAnswer);
              setShowPopup(true);
              setTimeout(() => setShowPopup(false), 3000);
            }}
          >
            🤖 Rewrite with AI
          </button>

          <button
            style={styles.saveButton}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            onClick={handleSubmit}
          >
            {editingId ? "Update FAQ" : "Add FAQ"}
          </button>
        </div>
      </div>

      <div style={styles.list}>
        {faqs
          .filter((faq) =>
            faq.question.toLowerCase().includes(search.toLowerCase())
          )
          .map((faq) => (
            <div
              key={faq.id}
              style={styles.faqCard}
              data-shadow="0 8px 22px rgba(0,0,0,0.06)"
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>

              <div style={styles.actionRow}>
                <button
                  style={styles.editBtn}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                  onClick={() => handleEdit(faq)}
                >
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                  onClick={() => handleDelete(faq.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    padding: "24px 16px",
    maxWidth: "1100px",
    margin: "auto",
    minHeight: "100vh",
    background: "#cbe2faff",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  popup: {
    position: "fixed",
    top: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#10b981",
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    zIndex: 1000,
  },

  header: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "24px",
  },

  backButton: {
    position: "absolute",
    left: "0",
    background: "transparent",
    border: "none",
    color: "#4f46e5",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  heading: {
    fontSize: "34px",
    fontWeight: "800",
    color: "#111827",
  },

  search: {
    width: "97%",
    padding: "14px 16px",
    marginBottom: "28px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "15px",
    background: "#ffffff",
  },

  card: {
    background: "#ffffff",
    padding: "32px",
    borderRadius: "20px",
    marginBottom: "36px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
  },

  textarea: {
    width: "100%",
    padding: "14px",
    minHeight: "120px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
  },

  buttonRow: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
  },

  aiButton: {
    background: "#6366f1",
    color: "#ffffff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  saveButton: {
    background: "#10b981",
    color: "#ffffff",
    border: "none",
    padding: "12px 22px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  faqCard: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 8px 22px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
  },

  actionRow: {
    display: "flex",
    gap: "12px",
    marginTop: "12px",
  },

  editBtn: {
    background: "#f59e0b",
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};
