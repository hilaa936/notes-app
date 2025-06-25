import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  if (!isLoggedIn) return null;

  return (
    <div style={styles.header}>
      <button style={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

const styles: Record<string, any> = {
  header: {
    position: "fixed",
    top: 0,
    right: 0,
    padding: "16px",
    background: "transparent",
    zIndex: 100,
  },
  logoutButton: {
    background: "#e5e7eb",
    color: "#1f2937",
    padding: "10px 16px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
