import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const AddOffer = () => {
  const navigate = useNavigate();
  const [input, changeInput] = useState({
    offerId: "",
    offerName: "",
    applicableItem: "",
    discountPercentage: "",
    offerDescription: "",
    validFrom: "",
    validUntil: "",
    couponCode: "",
    minimumOrderAmount: "",
    status: "",
  });

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green");

  const inputHandler = (event) => {
    changeInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const readValue = () => {
    axios
      .post("http://localhost:3000/offers-add", input)
      .then((response) => {
        setMessage(response.data.status);
        setMessageColor("green");
        navigate("/offers-view");

        changeInput({
          offerId: "",
          offerName: "",
          applicableItem: "",
          discountPercentage: "",
          offerDescription: "",
          validFrom: "",
          validUntil: "",
          couponCode: "",
          minimumOrderAmount: "",
          status: "",
        });
      })
      .catch(() => {
        setMessage("Something went wrong");
        setMessageColor("red");
      });
  };

  return (
    <div>
      {/* <NavBar /> */}

      <NavigationBar />

      <div className="container mt-4">
        <h2 className="text-center mb-4">Add Offer</h2>

        <div className="row">
          <div className="col-12">
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Offer ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="offerId"
                  value={input.offerId}
                  onChange={inputHandler}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Offer Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="offerName"
                  value={input.offerName}
                  onChange={inputHandler}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Applicable Item</label>
                <input
                  type="text"
                  className="form-control"
                  name="applicableItem"
                  value={input.applicableItem}
                  onChange={inputHandler}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Discount Percentage (%)</label>
                <input
                  type="number"
                  className="form-control"
                  name="discountPercentage"
                  value={input.discountPercentage}
                  onChange={inputHandler}
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Offer Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="offerDescription"
                  value={input.offerDescription}
                  onChange={inputHandler}
                ></textarea>
              </div>

              <div className="col-md-6">
                <label className="form-label">Valid From</label>
                <input
                  type="date"
                  className="form-control"
                  name="validFrom"
                  value={input.validFrom}
                  onChange={inputHandler}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Valid Until</label>
                <input
                  type="date"
                  className="form-control"
                  name="validUntil"
                  value={input.validUntil}
                  onChange={inputHandler}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Coupon Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="couponCode"
                  value={input.couponCode}
                  onChange={inputHandler}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Minimum Order Amount (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  name="minimumOrderAmount"
                  value={input.minimumOrderAmount}
                  onChange={inputHandler}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={input.status}
                  onChange={inputHandler}
                >
                  <option value="">Select Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="col-md-12">
                <button
                  className="btn btn-success"
                  onClick={readValue}
                >
                  Add Offer
                </button>
              </div>

              <div className="col-md-12">
                <h5 style={{ color: messageColor }}>
                  {message}
                </h5>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOffer;