import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  Users, 
  Utensils, 
  BadgePercent, 
  LayoutDashboard, 
  ChevronRight, 
  Plus 
} from "lucide-react";
import NavigationBar from "./NavigationBar";

const Home = () => {
  const [metrics, setMetrics] = useState({
    registeredStudents: 0,
    menuProducts: 0,
    activeOffers: 0
  });

  useEffect(() => {
    axios.post("http://localhost:3000/dashboard")
      .then((res) => {
        if (res.data) setMetrics(res.data);
      })
      .catch((err) => console.error("Metrics sync failure:", err));
  }, []);

  const modules = [
    {
      id: "students",
      title: "Student Directory",
      count: metrics.registeredStudents,
      unit: "Active",
      icon: <Users size={20} style={{ color: "#475569" }} />,
      addPath: "/students-add",
      viewPath: "/students-view",
      addText: "Add Student",
      viewText: "View Directory"
    },
    {
      id: "menu",
      title: "Menu Inventory",
      count: metrics.menuProducts,
      unit: "Items",
      icon: <Utensils size={20} style={{ color: "#475569" }} />,
      addPath: "/menu-add",
      viewPath: "/menu-view",
      addText: "Add Item",
      viewText: "View Inventory"
    },
    {
      id: "offers",
      title: "Active Offers",
      count: metrics.activeOffers,
      unit: "Live",
      icon: <BadgePercent size={20} style={{ color: "#475569" }} />,
      addPath: "/offers-add",
      viewPath: "/offers-view",
      addText: "Create Offer",
      viewText: "View Offers"
    }
  ];

  return (
    <div style={styles.layout}>
      <NavigationBar />

      <main style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>Administrative Console</h1>
          <p style={styles.subtitle}>
            Monitor infrastructure metrics and manage campus directory registries.
          </p>
        </header>

        {/* Grid System */}
        <section style={styles.grid}>
          {modules.map((mod) => (
            <div key={mod.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.iconWrapper}>{mod.icon}</div>
                <span style={styles.badge}>
                  {mod.count} {mod.unit}
                </span>
              </div>

              <h2 style={styles.cardTitle}>{mod.title}</h2>

              <div style={styles.actionContainer}>
                <Link to={mod.addPath} style={styles.primaryBtn}>
                  <Plus size={16} /> {mod.addText}
                </Link>
                <Link to={mod.viewPath} style={styles.secondaryBtn}>
                  {mod.viewText}
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Footer Link */}
        <footer style={styles.footer}>
          <Link to="/dashboard" style={styles.consoleBtn}>
            <LayoutDashboard size={16} style={{ color: "#64748b" }} />
            Launch Master Analytics Dashboard
            <ChevronRight size={16} style={{ color: "#94a3b8" }} />
          </Link>
        </footer>
      </main>
    </div>
  );
};

// Clean, predictable dashboard design tokens
const styles = {
  layout: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: "#0f172a",
    WebkitFontSmoothing: "antialiased"
  },
  container: {
    maxWidth: "1140px",
    margin: "0 auto",
    padding: "4rem 1.5rem",
    boxSizing: "border-box"
  },
  header: {
    marginBottom: "3rem"
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    margin: "0 0 0.5rem 0",
    color: "#0f172a"
  },
  subtitle: {
    fontSize: "0.875rem",
    color: "#64748b",
    margin: 0
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginBottom: "3rem"
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "1.5rem",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.25rem"
  },
  iconWrapper: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    backgroundColor: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  badge: {
    fontSize: "0.75rem",
    fontWeight: "600",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    color: "#475569",
    padding: "0.25rem 0.625rem",
    borderRadius: "6px"
  },
  cardTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 2rem 0"
  },
  actionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginTop: "auto"
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.375rem",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    fontSize: "0.875rem",
    fontWeight: "500",
    textDecoration: "none",
    padding: "0.625rem 1rem",
    borderRadius: "8px",
    boxSizing: "border-box",
    textAlign: "center"
  },
  secondaryBtn: {
    display: "block",
    backgroundColor: "#ffffff",
    color: "#334155",
    border: "1px solid #e2e8f0",
    fontSize: "0.875rem",
    fontWeight: "500",
    textDecoration: "none",
    padding: "0.625rem 1rem",
    borderRadius: "8px",
    boxSizing: "border-box",
    textAlign: "center"
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    borderTop: "1px solid #e2e8f0",
    paddingTop: "2rem"
  },
  consoleBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#1e293b",
    fontSize: "0.875rem",
    fontWeight: "600",
    textDecoration: "none",
    padding: "0.75rem 1.25rem",
    borderRadius: "10px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
  }
};

export default Home;