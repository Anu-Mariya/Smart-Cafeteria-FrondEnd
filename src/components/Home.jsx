import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  const styles = {
    layout: {
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      color: "#0f172a",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: "relative"
    },
    topBarDecoration: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "linear-gradient(90deg, #0284c7 0%, #0f172a 100%)"
    },
    wrapper: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "6rem 2rem 4rem 2rem",
      boxSizing: "border-box"
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
      fontSize: "2.5rem",
      fontWeight: "800",
      letterSpacing: "-0.03em",
      color: "#0f172a",
      margin: 0
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      marginBottom: "4.5rem"
    },
    getCardLayout: (id) => ({
      backgroundColor: "#ffffff",
      borderRadius: "14px",
      border: `1px solid ${hoveredCard === id ? "#cbd5e1" : "#e2e8f0"}`,
      padding: "2.25rem 2rem",
      boxSizing: "border-box",
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      boxShadow: hoveredCard === id 
        ? "0 20px 25px -5px rgba(15, 23, 42, 0.05)" 
        : "0 1px 3px rgba(15, 23, 42, 0.02)",
      transform: hoveredCard === id ? "translateY(-2px)" : "translateY(0)"
    }),
    iconFrame: {
      width: "48px",
      height: "48px",
      borderRadius: "10px",
      backgroundColor: "#f1f5f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#334155",
      marginBottom: "1.25rem"
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
      padding: "0.75rem 1.25rem",
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
      padding: "0.75rem 1.25rem",
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
      padding: "0.85rem 2rem",
      borderRadius: "10px",
      backgroundColor: "#ffffff",
      border: `1px solid ${hoveredDash ? "#0f172a" : "#cbd5e1"}`,
      color: "#0f172a",
      fontWeight: "600",
      fontSize: "0.9rem",
      textDecoration: "none",
      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      transition: "all 0.2s ease",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.layout}>
      <div style={styles.topBarDecoration} />
      <NavigationBar />

      <div style={styles.wrapper}>
        
        {/* Minimal High-End Header */}
        <div style={styles.headerSec}>
          <div style={styles.systemBadge}>
            <span style={styles.badgePulse} />
            Control Core
          </div>
          <h1 style={styles.mainTitle}>Campus Cafeteria Management</h1>
        </div>

        {/* Presentation-Focused Module Grid */}
        <div style={styles.grid}>
          
          {/* Module: Student Base */}
          <div 
            style={styles.getCardLayout("students")}
            onMouseEnter={() => setHoveredCard("students")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.iconFrame}>
              <Users size={22} strokeWidth={2} />
            </div>
            <h3 style={styles.cardHeading}>Student Directory</h3>
            <div style={styles.actionContainer}>
              <Link 
                to="/students-add" 
                style={styles.getPrimaryAction("std-add")}
                onMouseEnter={() => setHoveredBtn("std-add")}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                <Plus size={16} strokeWidth={2.5} /> Add Profile
              </Link>
              <Link 
                to="/students-view" 
                style={styles.getSecondaryAction("std-view")}
                onMouseEnter={() => setHoveredBtn("std-view")}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                View Directory
              </Link>
            </div>
          </div>

          {/* Module: Menu Registry */}
          <div 
            style={styles.getCardLayout("menu")}
            onMouseEnter={() => setHoveredCard("menu")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.iconFrame}>
              <Utensils size={22} strokeWidth={2} />
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
                View Catalog
              </Link>
            </div>
          </div>

          {/* Module: Marketing Expansion */}
          <div 
            style={styles.getCardLayout("offers")}
            onMouseEnter={() => setHoveredCard("offers")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.iconFrame}>
              <BadgePercent size={22} strokeWidth={2} />
            </div>
            <h3 style={styles.cardHeading}>Active Campaigns</h3>
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

        {/* Master Redirection Terminal */}
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