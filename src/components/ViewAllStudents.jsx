import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  User, Mail, Phone, Calendar, Hash, BookOpen, GraduationCap, AlertCircle,
  Search, Edit3, Trash2, X, Save
} from "lucide-react";
import NavigationBar from "./NavigationBar";

const ViewAllStudents = () => {
  const [data, changeData] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [editForm, setEditForm] = useState({
    studentName: "",
    rollNumber: "",
    department: "",
    semester: "",
    email: "",
    phone: ""
  });

  const fetchData = () => {
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    axios.post("http://localhost:3000/students-search", { query })
      .then((response) => {
        changeData(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setError("Failed to complete search query.");
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete student "${name}"?`)) {
      axios.post("http://localhost:3000/students-delete", { _id: id })
        .then(() => {
          if (searchQuery) {
            handleSearch(searchQuery);
          } else {
            fetchData();
          }
        })
        .catch((err) => {
          console.error("Delete error:", err);
          alert("Failed to delete student record.");
        });
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setEditForm({
      studentName: student.studentName || "",
      rollNumber: student.rollNumber || "",
      department: student.department || "",
      semester: student.semester || "",
      email: student.email || "",
      phone: student.phone || ""
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/students-update", {
      _id: editingStudent._id,
      studentId: editingStudent.studentId,
      ...editForm
    })
      .then(() => {
        setEditingStudent(null);
        if (searchQuery) {
          handleSearch(searchQuery);
        } else {
          fetchData();
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Failed to update student record.");
      });
  };

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
      marginBottom: "2rem",
      borderBottom: "1px solid #e2e8f0",
      paddingBottom: "1.5rem",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem"
    },
    mainTitle: {
      fontSize: "2rem",
      fontWeight: "800",
      letterSpacing: "-0.03em",
      color: "#0f172a",
      margin: 0
    },
    searchContainer: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "100%",
      maxWidth: "400px"
    },
    searchIcon: {
      position: "absolute",
      left: "1rem",
      color: "#94a3b8",
      pointerEvents: "none"
    },
    searchInput: {
      width: "100%",
      padding: "0.75rem 1rem 0.75rem 2.75rem",
      borderRadius: "10px",
      border: "1px solid #e2e8f0",
      backgroundColor: "#ffffff",
      fontSize: "0.875rem",
      color: "#0f172a",
      transition: "all 0.2s ease"
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
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
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
    },
    actionRow: {
      display: "flex",
      gap: "0.5rem",
      marginTop: "1.25rem",
      paddingTop: "1rem",
      borderTop: "1px dashed #e2e8f0"
    },
    editBtn: {
      flex: 1,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.375rem",
      backgroundColor: "#f1f5f9",
      color: "#334155",
      border: "none",
      fontSize: "0.75rem",
      fontWeight: "600",
      padding: "0.5rem 0.75rem",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.15s ease"
    },
    deleteBtn: {
      flex: 1,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.375rem",
      backgroundColor: "#fef2f2",
      color: "#b91c1c",
      border: "none",
      fontSize: "0.75rem",
      fontWeight: "600",
      padding: "0.5rem 0.75rem",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.15s ease"
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(15, 23, 42, 0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(4px)"
    },
    modalContent: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      width: "90%",
      maxWidth: "520px",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      position: "relative",
      boxSizing: "border-box",
      overflow: "hidden",
      border: "1px solid #e2e8f0"
    },
    modalHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1.25rem 1.5rem",
      borderBottom: "1px solid #e2e8f0",
      backgroundColor: "#f8fafc"
    },
    modalBody: {
      padding: "1.5rem",
      maxHeight: "75vh",
      overflowY: "auto"
    },
    modalFooter: {
      padding: "1rem 1.5rem",
      borderTop: "1px solid #e2e8f0",
      display: "flex",
      justifyContent: "end",
      gap: "0.75rem",
      backgroundColor: "#f8fafc"
    },
    inputGroup: {
      marginBottom: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem"
    },
    inputLabel: {
      fontSize: "0.75rem",
      fontWeight: "600",
      color: "#475569"
    },
    modalInput: {
      width: "100%",
      padding: "0.625rem 0.875rem",
      borderRadius: "8px",
      border: "1px solid #cbd5e1",
      fontSize: "0.875rem",
      color: "#0f172a",
      boxSizing: "border-box",
      transition: "all 0.15s ease"
    },
    saveBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.375rem",
      backgroundColor: "#0f172a",
      color: "#ffffff",
      border: "none",
      fontSize: "0.875rem",
      fontWeight: "600",
      padding: "0.625rem 1.25rem",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.15s ease"
    },
    cancelBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.375rem",
      backgroundColor: "#e2e8f0",
      color: "#475569",
      border: "none",
      fontSize: "0.875rem",
      fontWeight: "600",
      padding: "0.625rem 1.25rem",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.15s ease"
    }
  };

  return (
    <div style={styles.layout}>
      <NavigationBar />
      <div style={styles.wrapper}>
        <div style={styles.headerSec}>
          <h1 style={styles.mainTitle}>Student Directory</h1>
          <div style={styles.searchContainer}>
            <Search size={18} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by ID, name, email, roll..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={styles.searchInput}
              className="search-input"
            />
          </div>
        </div>

        {error && (
          <div style={styles.errorBanner}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {data.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: "#64748b" }}>
            <User size={48} style={{ margin: "0 auto 1rem auto", opacity: 0.4 }} />
            <h4>No Student Records Found</h4>
            <p style={{ fontSize: "0.875rem" }}>Try searching for a different term or register a new student.</p>
          </div>
        ) : (
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

                <div style={styles.actionRow}>
                  <button 
                    onClick={() => handleEditClick(value)}
                    style={styles.editBtn}
                    className="action-btn-edit"
                  >
                    <Edit3 size={13} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(value._id, value.studentName)}
                    style={styles.deleteBtn}
                    className="action-btn-delete"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Student Modal */}
      {editingStudent && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "700", margin: 0, color: "#0f172a" }}>Edit Student Record</h3>
              <button 
                onClick={() => setEditingStudent(null)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "inline-flex", color: "#94a3b8" }}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdateSubmit}>
              <div style={styles.modalBody}>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={editForm.studentName}
                    onChange={handleEditChange}
                    required
                    style={styles.modalInput}
                    className="modal-input"
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Roll Number</label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={editForm.rollNumber}
                      onChange={handleEditChange}
                      required
                      style={styles.modalInput}
                      className="modal-input"
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Semester</label>
                    <input
                      type="text"
                      name="semester"
                      value={editForm.semester}
                      onChange={handleEditChange}
                      required
                      style={styles.modalInput}
                      className="modal-input"
                    />
                  </div>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={editForm.department}
                    onChange={handleEditChange}
                    required
                    style={styles.modalInput}
                    className="modal-input"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    required
                    style={styles.modalInput}
                    className="modal-input"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                    required
                    style={styles.modalInput}
                    className="modal-input"
                  />
                </div>
              </div>
              <div style={styles.modalFooter}>
                <button 
                  type="button" 
                  onClick={() => setEditingStudent(null)} 
                  style={styles.cancelBtn}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={styles.saveBtn}
                  className="save-btn"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .search-input:focus {
          outline: none;
          border-color: #0f172a !important;
          box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.1);
        }
        .action-btn-edit:hover {
          background-color: #e2e8f0 !important;
          color: #0f172a !important;
        }
        .action-btn-delete:hover {
          background-color: #fee2e2 !important;
          color: #991b1b !important;
        }
        .modal-input:focus {
          outline: none;
          border-color: #0f172a !important;
          box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.1);
        }
        .save-btn:hover {
          background-color: #1e293b !important;
        }
        .cancel-btn:hover {
          background-color: #cbd5e1 !important;
        }
      `}</style>
    </div>
  );
};

export default ViewAllStudents;