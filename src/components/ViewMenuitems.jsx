import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Search, Edit3, Trash2, X, Save, Eye } from 'lucide-react';
import NavigationBar from './NavigationBar';

const ViewMenuitems = () => {
    const [data, changeData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingItem, setEditingItem] = useState(null);
    const [editForm, setEditForm] = useState({
        itemName: "",
        category: "",
        description: "",
        price: "",
        quantityAvailable: "",
        preparationTime: "",
        availabilityStatus: "",
        itemImageUrl: "",
        popularityTag: ""
    });

    const fetchData = () => {
        axios.post("http://localhost:3000/menu-view")
            .then((response) => {
                changeData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        axios.post("http://localhost:3000/menu-search", { query })
            .then((response) => {
                changeData(response.data);
            })
            .catch((error) => {
                console.error("Search failure:", error);
            });
    };

    const handleDelete = (id, itemName) => {
        if (window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
            axios.post("http://localhost:3000/menu-delete", { _id: id })
                .then(() => {
                    if (searchQuery) {
                        handleSearch(searchQuery);
                    } else {
                        fetchData();
                    }
                })
                .catch((error) => {
                    console.error("Delete failure:", error);
                    alert("Failed to delete menu item.");
                });
        }
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        setEditForm({
            itemName: item.itemName || "",
            category: item.category || "",
            description: item.description || "",
            price: item.price || "",
            quantityAvailable: item.quantityAvailable || "",
            preparationTime: item.preparationTime || "",
            availabilityStatus: item.availabilityStatus || "",
            itemImageUrl: item.itemImageUrl || "",
            popularityTag: item.popularityTag || ""
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
        axios.post("http://localhost:3000/menu-update", {
            _id: editingItem._id,
            itemId: editingItem.itemId,
            ...editForm,
            price: Number(editForm.price),
            quantityAvailable: Number(editForm.quantityAvailable)
        })
            .then(() => {
                setEditingItem(null);
                if (searchQuery) {
                    handleSearch(searchQuery);
                } else {
                    fetchData();
                }
            })
            .catch((error) => {
                console.error("Update failure:", error);
                alert("Failed to update menu item.");
            });
    };

    const modalOverlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(33, 37, 41, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
        backdropFilter: "blur(3px)"
    };

    const modalContentStyle = {
        backgroundColor: "#fff",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "600px",
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        overflow: "hidden"
    };

    return (
        <div>
            <NavigationBar />

            <div className="container mt-4 pb-5">
                <h2 className="text-center mb-4 fw-bold">Menu Catalog</h2>

                {/* Search Bar */}
                <div className="row mb-4 justify-content-center">
                    <div className="col-12 col-md-6 col-lg-5">
                        <div className="input-group shadow-sm">
                            <span className="input-group-text bg-white border-end-0">
                                <Search size={18} className="text-secondary" />
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0 ps-0"
                                placeholder="Search by name, description, category..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {data.length === 0 ? (
                    <div className="text-center py-5">
                        <h4 className="text-secondary">No Menu Items Found</h4>
                        <p className="text-muted">Try refining your search query or add new menu items.</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {data.map((value, index) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                                <div className="card h-100 shadow-sm border-0 position-relative" style={{ transition: "transform 0.2s" }}>
                                    {value.popularityTag && (
                                        <span className="badge bg-danger position-absolute top-0 start-0 m-3 z-1 shadow-sm">
                                            {value.popularityTag}
                                        </span>
                                    )}
                                    <img
                                        src={value.itemImageUrl}
                                        className="card-img-top"
                                        alt={value.itemName}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h5 className="card-title fw-bold mb-0 text-truncate" style={{ maxWidth: "70%" }}>
                                                {value.itemName}
                                            </h5>
                                            <span className="fs-5 fw-bold text-success">
                                                ₹{value.price}
                                            </span>
                                        </div>

                                        <p className="card-text text-muted mb-2 small text-truncate-2" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "38px" }}>
                                            {value.description}
                                        </p>

                                        <div className="mb-3 small">
                                            <div className="d-flex justify-content-between mb-1">
                                                <span className="text-muted">Category:</span>
                                                <span className="fw-semibold">{value.category}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-1">
                                                <span className="text-muted">Prep Time:</span>
                                                <span className="fw-semibold">{value.preparationTime} mins</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-1">
                                                <span className="text-muted">Stock:</span>
                                                <span className="fw-semibold">{value.quantityAvailable} units</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-1">
                                                <span className="text-muted">Status:</span>
                                                <span className={`badge ${value.availabilityStatus === "Available" ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}>
                                                    {value.availabilityStatus}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-auto d-flex flex-column gap-2">
                                            <div className="d-flex gap-2">
                                                <button 
                                                    className="btn btn-outline-secondary btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
                                                    onClick={() => handleEditClick(value)}
                                                >
                                                    <Edit3 size={13} /> Edit
                                                </button>
                                                <button 
                                                    className="btn btn-outline-danger btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
                                                    onClick={() => handleDelete(value._id, value.itemName)}
                                                >
                                                    <Trash2 size={13} /> Delete
                                                </button>
                                            </div>
                                            <a
                                                href={value.itemImageUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-light btn-sm text-secondary d-flex align-items-center justify-content-center gap-1 border"
                                            >
                                                <Eye size={13} /> View Image
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Menu Item Modal */}
            {editingItem && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <div className="modal-header bg-light px-4 py-3 d-flex justify-content-between align-items-center border-bottom">
                            <h5 className="modal-title fw-bold m-0">Edit Menu Item</h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                onClick={() => setEditingItem(null)}
                                style={{ background: "none", border: "none" }}
                            >
                                <X size={20} className="text-secondary" />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateSubmit} className="d-flex flex-column overflow-hidden">
                            <div className="modal-body px-4 py-3 overflow-auto" style={{ maxHeight: "65vh" }}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold text-secondary">Item Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="itemName"
                                            value={editForm.itemName}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold text-secondary">Category</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="category"
                                            value={editForm.category}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold text-secondary">Price (₹)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={editForm.price}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold text-secondary">Stock Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="quantityAvailable"
                                            value={editForm.quantityAvailable}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold text-secondary">Prep Time (mins)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="preparationTime"
                                            value={editForm.preparationTime}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold text-secondary">Availability Status</label>
                                        <select
                                            className="form-select"
                                            name="availabilityStatus"
                                            value={editForm.availabilityStatus}
                                            onChange={handleEditChange}
                                            required
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Available">Available</option>
                                            <option value="Unavailable">Unavailable</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small fw-semibold text-secondary">Description</label>
                                        <textarea
                                            className="form-control"
                                            rows="2"
                                            name="description"
                                            value={editForm.description}
                                            onChange={handleEditChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="col-md-8">
                                        <label className="form-label small fw-semibold text-secondary">Image URL</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            name="itemImageUrl"
                                            value={editForm.itemImageUrl}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-semibold text-secondary">Popularity Tag</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="popularityTag"
                                            value={editForm.popularityTag}
                                            onChange={handleEditChange}
                                            placeholder="e.g. Hot, Best Seller"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer px-4 py-3 bg-light border-top d-flex justify-content-end gap-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary px-3"
                                    onClick={() => setEditingItem(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-dark px-3 d-flex align-items-center gap-1"
                                >
                                    <Save size={16} /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewMenuitems;