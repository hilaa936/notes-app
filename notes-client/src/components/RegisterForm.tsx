import React from "react";

export default function RegisterForm() {
  return (
    <div style={styles.container}>
      <p style={styles.note}>Registration is disabled in this demo. Use:</p>
      <p>
        <strong>Email:</strong> test@example.com
      </p>
      <p>
        <strong>Password:</strong> 1234
      </p>
    </div>
  );
}

const styles = {
  container: {
    fontSize: "16px",
    color: "#4b5563",
    lineHeight: "1.6",
    background: "#f9fafb",
    padding: "16px",
    borderRadius: "8px",
  },
  note: {
    marginBottom: "12px",
  },
};
