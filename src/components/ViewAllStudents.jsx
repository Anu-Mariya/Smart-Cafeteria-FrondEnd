import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Phone, Calendar, Hash, BookOpen, GraduationCap, AlertCircle } from "lucide-react";
import NavigationBar from "./NavigationBar";

const ViewAllStudents = () => {
  const [data, changeData] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const fetchData = () => {
    // Explicitly aligned with backend POST configurations
    axios.post("http://localhost:3000/students-view")
      .then((response) => {
        changeData(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Data ingestion error:", err);
        setError("Unable to sync database registry records.");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const styles = {
    layout: {
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      color: "#0f172a",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingBottom: "5rem"
    },
    wrapper: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "4rem 2rem 0 2rem",
      boxSizing: "border-box"
    },
    headerSec: {
      marginBottom: "3rem",
      borderBottom: "1px solid #e2e8f0",
      paddingBottom: "1.5rem"
    },
    mainTitle: {
      fontSize: "2rem",
      fontWeight: "800",
      letterSpacing: "-0.03em",
      color: "#0f172a",
      margin: 0
    },
    errorBanner: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "1rem 1.25rem",
      backgroundColor: "#fef2f2",
      border: "1px solid #fee2e2",
      borderRadius: "8px",
      color: "#991b1b",
      fontSize: "0.875rem",
      fontWeight: "500",
      marginBottom: "2rem"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "1.5rem"
    },
    getCardStyle: (id) => ({
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      border: `1px solid ${hoveredCard === id ? "#cbd5e1" : "#e2e8f0"}`,
      padding: "1.5rem",
      boxSizing: "border-box",
      transition: "all 0.2s ease",
      boxShadow: hoveredCard === id ? "0 10px 15px -3px rgba(15, 23, 42, 0.04)" : "0 1px 2px rgba(0,0,0,0.02)"
    }),
    profileHeader: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      borderBottom: "1px solid #f1f5f9",
      paddingBottom: "1rem",
      marginBottom: "1rem"
    },
    avatarPlaceholder: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      backgroundColor: "#f1f5f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#475569"
    },
    studentName: {
      fontSize: "1.05rem",
      fontWeight: "700",
      color: "#0f172a",
      margin: 0
    },
    dataRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.825rem",
      color: "#475569",
      marginBottom: "0.5rem"
    },
    label: {
      color: "#94a3b8",
      display: "inline-flex",
      alignItems: "center"
    },
    value: {
      color: "#334155",
      fontWeight: "500"
    }
  };

  return (
    <div style={styles.layout}>
      <NavigationBar />
      <div style={styles.wrapper}>
        <div style={styles.headerSec}>
          <h1 style={styles.mainTitle}>Student Directory</h1>
        </div>

        {error && (
          <div style={styles.errorBanner}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div style={styles.grid}>
          {data.map((value, index) => (
            <div 
              key={index}
              style={styles.getCardStyle(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.profileHeader}>
                <div style={styles.avatarPlaceholder}>
                  <User size={16} />
                </div>
                <h5 style={styles.studentName}>{value.studentName}</h5>
              </div>

              <div style={styles.dataRow}>
                <span style={styles.label}><Hash size={13} style={{ marginRight: 4 }} /> ID:</span>
                <span style={styles.value}>{value.studentId}</span>
              </div>

              <div style={styles.dataRow}>
                <span style={styles.label}><GraduationCap size={13} style={{ marginRight: 4 }} /> Roll:</span>
                <span style={styles.value}>{value.rollNumber}</span>
              </div>

              <div style={styles.dataRow}>
                <span style={styles.label}><BookOpen size={13} style={{ marginRight: 4 }} /> Dept:</span>
                <span style={styles.value}>{value.department} (Sem {value.semester})</span>
              </div>

              <div style={styles.dataRow}>
                <span style={styles.label}><Mail size={13} style={{ marginRight: 4 }} /> Email:</span>
                <span style={styles.value}>{value.email}</span>
              </div>

              <div style={styles.dataRow}>
                <span style={styles.label}><Phone size={13} style={{ marginRight: 4 }} /> Phone:</span>
                <span style={styles.value}>{value.phone}</span>
              </div>

              <div style={{ ...styles.dataRow, marginBottom: 0, marginTop: "1rem", paddingTop: "0.5rem", borderTop: "1px dashed #e2e8f0" }}>
                <span style={styles.label}><Calendar size={13} style={{ marginRight: 4 }} /> Registered:</span>
                <span style={{ ...styles.value, color: "#64748b", fontSize: "0.75rem" }}>{value.registrationDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAllStudents;