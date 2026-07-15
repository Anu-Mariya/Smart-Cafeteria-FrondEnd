import axios from "axios";
import React, { useEffect, useState } from "react";
import { Search, Edit3, Trash2, X, Save } from "lucide-react";
import NavigationBar from "./NavigationBar";

const ViewOffer = () => {
  const [offers, setOffers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingOffer, setEditingOffer] = useState(null);
  const [editForm, setEditForm] = useState({
    offerName: "",
    applicableItem: "",
    discountPercentage: "",
    offerDescription: "",
    validFrom: "",
    validUntil: "",
    couponCode: "",
    minimumOrderAmount: "",
    status: ""
  });

  const fetchData = () => {
    axios
      .post("http://localhost:3000/offers-view")
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to fetch offers");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    axios.post("http://localhost:3000/offers-search", { query })
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.error("Search failure:", error);
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete offer "${name}"?`)) {
      axios.post("http://localhost:3000/offers-delete", { _id: id })
        .then(() => {
          if (searchQuery) {
            handleSearch(searchQuery);
          } else {
            fetchData();
          }
        })
        .catch((error) => {
          console.error("Delete failure:", error);
          alert("Failed to delete offer.");
        });
    }
  };

  const handleEditClick = (offer) => {
    setEditingOffer(offer);
    setEditForm({
      offerName: offer.offerName || "",
      applicableItem: offer.applicableItem || "",
      discountPercentage: offer.discountPercentage || "",
      offerDescription: offer.offerDescription || "",
      validFrom: offer.validFrom || "",
      validUntil: offer.validUntil || "",
      couponCode: offer.couponCode || "",
      minimumOrderAmount: offer.minimumOrderAmount || "",
      status: offer.status || ""
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
    axios.post("http://localhost:3000/offers-update", {
      _id: editingOffer._id,
      offerId: editingOffer.offerId,
      ...editForm,
      discountPercentage: Number(editForm.discountPercentage),
      minimumOrderAmount: Number(editForm.minimumOrderAmount)
    })
      .then(() => {
        setEditingOffer(null);
        if (searchQuery) {
          handleSearch(searchQuery);
        } else {
          fetchData();
        }
      })
      .catch((error) => {
        console.error("Update failure:", error);
        alert("Failed to update offer.");
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
        <h2 className="text-center mb-4 fw-bold">Active Offers</h2>

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
                placeholder="Search by name, item, coupon code..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="table-responsive shadow-sm rounded border">
          <table className="table table-bordered table-striped table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Offer ID</th>
                <th>Offer Name</th>
                <th>Applicable Item</th>
                <th>Discount (%)</th>
                <th>Description</th>
                <th>Valid From</th>
                <th>Valid Until</th>
                <th>Coupon Code</th>
                <th>Minimum Order</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {offers.map((value, index) => (
                <tr key={value._id}>
                  <td>{index + 1}</td>
                  <td className="fw-semibold text-secondary">{value.offerId}</td>
                  <td className="fw-semibold">{value.offerName}</td>
                  <td>{value.applicableItem}</td>
                  <td className="text-success fw-bold">{value.discountPercentage}%</td>
                  <td className="text-muted small" style={{ maxWidth: "200px" }}>{value.offerDescription}</td>
                  <td>{value.validFrom}</td>
                  <td>{value.validUntil}</td>
                  <td><code className="text-primary fw-bold">{value.couponCode}</code></td>
                  <td>₹{value.minimumOrderAmount}</td>
                  <td>
                    <span
                      className={
                        value.status === "Active"
                          ? "badge bg-success"
                          : "badge bg-danger"
                      }
                    >
                      {value.status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1"
                        onClick={() => handleEditClick(value)}
                      >
                        <Edit3 size={12} /> Edit
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                        onClick={() => handleDelete(value._id, value.offerName)}
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {offers.length === 0 && (
            <div className="p-5 text-center bg-white">
              <h5 className="text-muted m-0">No Offers Found</h5>
              <p className="text-secondary small mt-1 mb-0">Try registering a new offer or refining your search parameters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Offer Modal */}
      {editingOffer && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <div className="modal-header bg-light px-4 py-3 d-flex justify-content-between align-items-center border-bottom">
              <h5 className="modal-title fw-bold m-0">Edit Offer Details</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setEditingOffer(null)}
                style={{ background: "none", border: "none" }}
              >
                <X size={20} className="text-secondary" />
              </button>
            </div>
            <form onSubmit={handleUpdateSubmit} className="d-flex flex-column overflow-hidden">
              <div className="modal-body px-4 py-3 overflow-auto" style={{ maxHeight: "65vh" }}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Offer Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="offerName"
                      value={editForm.offerName}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Applicable Item</label>
                    <input
                      type="text"
                      className="form-control"
                      name="applicableItem"
                      value={editForm.applicableItem}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Discount Percentage (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="discountPercentage"
                      value={editForm.discountPercentage}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Minimum Order Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="minimumOrderAmount"
                      value={editForm.minimumOrderAmount}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Valid From</label>
                    <input
                      type="date"
                      className="form-control"
                      name="validFrom"
                      value={editForm.validFrom}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Valid Until</label>
                    <input
                      type="date"
                      className="form-control"
                      name="validUntil"
                      value={editForm.validUntil}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Coupon Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="couponCode"
                      value={editForm.couponCode}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-secondary">Offer Description</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      name="offerDescription"
                      value={editForm.offerDescription}
                      onChange={handleEditChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer px-4 py-3 bg-light border-top d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary px-3"
                  onClick={() => setEditingOffer(null)}
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

export default ViewOffer;
