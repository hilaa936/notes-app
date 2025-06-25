import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) navigate("/notes");
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Notes App</h1>
      <div style={styles.tabs}>
        <button
          style={activeTab === "login" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          style={activeTab === "register" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>
      <div style={styles.panel}>
        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

const styles: Record<string, any> = {
  container: {
    maxWidth: "500px",
    margin: "100px auto",
    fontFamily: "sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    marginBottom: "24px",
    color: "#1f2937",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    marginBottom: "16px",
  },
  tab: {
    padding: "10px 20px",
    background: "#e5e7eb",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  activeTab: {
    padding: "10px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  panel: {
    textAlign: "left",
  },
};
