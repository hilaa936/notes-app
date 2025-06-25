import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Register</h1>
      <p style={styles.note}>
        Registration is disabled for this demo. Please login with test
        credentials.
      </p>
      <button style={styles.button} onClick={() => navigate("/login")}>
        Go to Login
      </button>
    </div>
  );
}

const styles: Record<string, any> = {
  container: {
    maxWidth: "500px",
    margin: "120px auto",
    textAlign: "center" as const,
    fontFamily: "sans-serif",
  },
  header: {
    fontSize: "32px",
    marginBottom: "16px",
  },
  note: {
    color: "#6b7280",
    marginBottom: "24px",
  },
  button: {
    background: "#2563eb",
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
