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
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [hoveredDash, setHoveredDash] = useState(false);

  // Live Metrics Aggregation State
  const [metrics, setMetrics] = useState({
    registeredStudents: 0,
    menuProducts: 0,
    activeOffers: 0
  });

  // Pull operational stats to display on cards automatically
  useEffect(() => {
    axios.post("http://localhost:3000/dashboard")
      .then((res) => {
        if (res.data) setMetrics(res.data);
      })
      .catch((err) => console.error("Metrics sync failure:", err));
  }, []);

  const styles = {
    layout: {
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      color: "#0f172a",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: "relative",
      overflow: "hidden"
    },
    ambientGlow: {
      position: "absolute",
      top: "-10%",
      left: "20%",
      width: "600px",
      height: "400px",
      background: "radial-gradient(circle, rgba(2,132,199,0.03) 0%, rgba(255,255,255,0) 70%)",
      pointerEvents: "none",
      zIndex: 0
    },
    topBarDecoration: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "linear-gradient(90deg, #0284c7 0%, #0f172a 100%)",
      zIndex: 10
    },
    wrapper: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "6rem 2rem 4rem 2rem",
      boxSizing: "border-box",
      position: "relative",
      zIndex: 1
    },
    headerSec: {
      textAlign: "center",
      marginBottom: "4.5rem"
    },
    systemBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.35rem 0.75rem",
      borderRadius: "6px",
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      color: "#64748b",
      fontSize: "0.75rem",
      fontWeight: "600",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      marginBottom: "1rem",
      boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
    },
    badgePulse: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      backgroundColor: "#10b981"
    },
    mainTitle: {
      fontSize: "2.75rem",
      fontWeight: "800",
      letterSpacing: "-0.03em",
      color: "#0f172a",
      margin: 0,
      background: "linear-gradient(180deg, #0f172a 0%, #334155 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "2rem",
      marginBottom: "4.5rem"
    },
    getCardLayout: (id) => ({
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      border: `1px solid ${hoveredCard === id ? "#cbd5e1" : "#e2e8f0"}`,
      padding: "2.5rem 2.25rem",
      boxSizing: "border-box",
      transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      boxShadow: hoveredCard === id 
        ? "0 30px 40px -15px rgba(15, 23, 42, 0.06)" 
        : "0 1px 3px rgba(15, 23, 42, 0.01)",
      transform: hoveredCard === id ? "translateY(-4px)" : "translateY(0)"
    }),
    cardMeta: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1.75rem"
    },
    iconFrame: {
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      backgroundColor: "#f1f5f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#334155"
    },
    liveCounter: {
      fontSize: "0.75rem",
      fontWeight: "700",
      color: "#475569",
      backgroundColor: "#f8fafc",
      padding: "0.25rem 0.6rem",
      borderRadius: "6px",
      border: "1px solid #e2e8f0"
    },
    cardHeading: {
      fontSize: "1.35rem",
      fontWeight: "700",
      color: "#0f172a",
      margin: "0 0 2rem 0",
      letterSpacing: "-0.01em"
    },
    actionContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "0.65rem"
    },
    getPrimaryAction: (btnKey) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      width: "100%",
      boxSizing: "border-box",
      padding: "0.8rem 1.25rem",
      borderRadius: "8px",
      backgroundColor: hoveredBtn === btnKey ? "#1e293b" : "#0f172a",
      color: "#ffffff",
      fontWeight: "600",
      fontSize: "0.875rem",
      textDecoration: "none",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.15s ease"
    }),
    getSecondaryAction: (btnKey) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      boxSizing: "border-box",
      padding: "0.8rem 1.25rem",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      backgroundColor: hoveredBtn === btnKey ? "#f8fafc" : "#ffffff",
      color: "#475569",
      fontWeight: "500",
      fontSize: "0.875rem",
      textDecoration: "none",
      cursor: "pointer",
      transition: "all 0.15s ease"
    }),
    footerNavSection: {
      display: "flex",
      justifyContent: "center"
    },
    masterConsoleBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.6rem",
      padding: "0.95rem 2.25rem",
      borderRadius: "12px",
      backgroundColor: "#ffffff",
      border: `1px solid ${hoveredDash ? "#0f172a" : "#cbd5e1"}`,
      color: "#0f172a",
      fontWeight: "600",
      fontSize: "0.9rem",
      textDecoration: "none",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
      transition: "all 0.2s ease",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.layout}>
      <div style={styles.topBarDecoration} />
      <div style={styles.ambientGlow} />
      
      <NavigationBar />

      <div style={styles.wrapper}>
        
       
        {/* Dynamic Presentation Module Grid */}
        <div style={styles.grid}>
          
          {/* Module: Student Base */}
          <div 
            style={styles.getCardLayout("students")}
            onMouseEnter={() => setHoveredCard("students")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.cardMeta}>
              <div style={styles.iconFrame}>
                <Users size={22} strokeWidth={2} />
              </div>
              <div style={styles.liveCounter}>
                {metrics.registeredStudents} Active
              </div>
            </div>
            <h3 style={styles.cardHeading}>Student Directory</h3>
            <div style={styles.actionContainer}>
              <Link 
                to="/students-add" 
                style={styles.getPrimaryAction("std-add")}
                onMouseEnter={() => setHoveredBtn("std-add")}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                <Plus size={16} strokeWidth={2.5} /> Add Data
              </Link>
              <Link 
                to="/students-view" 
                style={styles.getSecondaryAction("std-view")}
                onMouseEnter={() => setHoveredBtn("std-view")}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                View Data
              </Link>
            </div>
          </div>

          {/* Module: Menu Registry */}
          <div 
            style={styles.getCardLayout("menu")}
            onMouseEnter={() => setHoveredCard("menu")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.cardMeta}>
              <div style={styles.iconFrame}>
                <Utensils size={22} strokeWidth={2} />
              </div>
              <div style={styles.liveCounter}>
                {metrics.menuProducts} Items
              </div>
            </div>
            <h3 style={styles.cardHeading}>Menu Inventory</h3>
            <div style={styles.actionContainer}>
              <Link 
                to="/menu-add" 
                style={styles.getPrimaryAction("mn-add")}
                onMouseEnter={() => setHoveredBtn("mn-add")}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                <Plus size={16} strokeWidth={2.5} /> Add Item
              </Link>
              <Link 
                to="/menu-view" 
                style={styles.getSecondaryAction("mn-view")}
                onMouseEnter={() => setHoveredBtn("mn-view")}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                View Items
              </Link>
            </div>
          </div>

          {/* Module: Marketing Expansion */}
          <div 
            style={styles.getCardLayout("offers")}
            onMouseEnter={() => setHoveredCard("offers")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.cardMeta}>
              <div style={styles.iconFrame}>
                <BadgePercent size={22} strokeWidth={2} />
              </div>
              <div style={styles.liveCounter}>
                {metrics.activeOffers} Live
              </div>
            </div>
            <h3 style={styles.cardHeading}>Active Offers</h3>
            <div style={styles.actionContainer}>
              <Link 
                to="/offers-add" 
                style={styles.getPrimaryAction("of-add")}
                onMouseEnter={() => setHoveredBtn("of-add")}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                <Plus size={16} strokeWidth={2.5} /> Create Offer
              </Link>
              <Link 
                to="/offers-view" 
                style={styles.getSecondaryAction("of-view")}
                onMouseEnter={() => setHoveredBtn("of-view")}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                View Offers
              </Link>
            </div>
          </div>

        </div>

        {/* Master Analytics Redirection Console */}
        <div style={styles.footerNavSection}>
          <Link 
            to="/dashboard" 
            style={styles.masterConsoleBtn}
            onMouseEnter={() => setHoveredDash(true)}
            onMouseLeave={() => setHoveredDash(false)}
          >
            <LayoutDashboard size={16} style={{ color: "#334155" }} />
            Open Analytics Dashboard
            <ChevronRight size={16} style={{ transition: "transform 0.15s", transform: hoveredDash ? "translateX(4px)" : "none" }} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;