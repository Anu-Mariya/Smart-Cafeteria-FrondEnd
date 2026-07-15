import axios from "axios";
import React, { useEffect, useState } from "react";
// import NavBar from "./NavBar";

const ViewOffer = () => {
  const [offers, setOffers] = useState([]);

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

  return (
    <div>
      {/* <NavBar /> */}

      <div className="container mt-4">
        <h2 className="text-center mb-4">View Offers</h2>

        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
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
              </tr>
            </thead>

            <tbody>
              {offers.map((value, index) => (
                <tr key={value._id}>
                  <td>{index + 1}</td>
                  <td>{value.offerId}</td>
                  <td>{value.offerName}</td>
                  <td>{value.applicableItem}</td>
                  <td>{value.discountPercentage}%</td>
                  <td>{value.offerDescription}</td>
                  <td>{value.validFrom}</td>
                  <td>{value.validUntil}</td>
                  <td>{value.couponCode}</td>
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
                </tr>
              ))}
            </tbody>
          </table>

          {offers.length === 0 && (
            <h5 className="text-center mt-3">No Offers Found</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOffer;
