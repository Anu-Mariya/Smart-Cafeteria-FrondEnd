import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import NavigationBar from './NavigationBar'

const AddMenuitem = () => {
    const navigate = useNavigate()

    const [input, changeInput] = useState({
        itemId: "",
        itemName: "",
        category: "",
        description: "",
        price: "",
        quantityAvailable: "",
        preparationTime: "",
        availabilityStatus: "",
        itemImageUrl: "",
        addedDate: "",
        popularityTag: ""
    })

    const [message, setMessage] = useState("")
    const [messageColor, setMessageColor] = useState("green")

    const inputHandler = (event) => {
        changeInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const readValue = () => {

        axios.post("http://localhost:3000/menu-add", input)
            .then((response) => {

                setMessage(response.data.status)
                setMessageColor("green")
                navigate("/menu-view")

                changeInput({
                    itemId: "",
                    itemName: "",
                    category: "",
                    description: "",
                    price: "",
                    quantityAvailable: "",
                    preparationTime: "",
                    availabilityStatus: "",
                    itemImageUrl: "",
                    addedDate: "",
                    popularityTag: ""
                })

            })
            .catch((error) => {

                if (error.response) {
                    setMessage(error.response.data.message)
                } else {
                    setMessage("Something went wrong")
                }

                setMessageColor("red")

            })

    }

    return (
        <div>

            <NavigationBar />

            <div className="container mt-4">

                <h2 className="text-center mb-4">
                    Add Menu Item
                </h2>

                <div className="row">

                    <div className="col-12">

                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label">Item ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="itemId"
                                    value={input.itemId}
                                    onChange={inputHandler}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Item Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="itemName"
                                    value={input.itemName}
                                    onChange={inputHandler}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Category</label>

                                <select
                                    className="form-select"
                                    name="category"
                                    value={input.category}
                                    onChange={inputHandler}
                                >
                                    <option value="">Select Category</option>
                                    <option>Meals</option>
                                    <option>Snacks</option>
                                    <option>Beverages</option>
                                    <option>Desserts</option>
                                </select>

                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Price (₹)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    value={input.price}
                                    onChange={inputHandler}
                                />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="description"
                                    value={input.description}
                                    onChange={inputHandler}
                                ></textarea>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Stock Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                        name="quantityAvailable"
                                        value={input.quantityAvailable}
                                    onChange={inputHandler}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Preparation Time (mins)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                        name="preparationTime"
                                        value={input.preparationTime}
                                    onChange={inputHandler}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Availability Status</label>

                                <select
                                    className="form-select"
                                    name="availabilityStatus"
                                    value={input.availabilityStatus}
                                    onChange={inputHandler}
                                >
                                    <option value="">Select Status</option>
                                    <option>Available</option>
                                    <option>Out of Stock</option>
                                </select>

                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Popularity Tag</label>

                                <select
                                    className="form-select"
                                    name="popularityTag"
                                    value={input.popularityTag}
                                    onChange={inputHandler}
                                >
                                    <option value="">Select Tag</option>
                                    <option>Bestseller</option>
                                    <option>Chef's Special</option>
                                    <option>New Arrival</option>
                                    <option>Regular</option>
                                </select>

                            </div>

                            <div className="col-md-12">
                                <label className="form-label">Image URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="itemImageUrl"
                                    value={input.itemImageUrl}
                                    onChange={inputHandler}
                                />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label">Added Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="addedDate"
                                    value={input.addedDate}
                                    onChange={inputHandler}
                                />
                            </div>

                            {/* Centered Submit Button Container Row */}
                            <div className="col-md-12 d-flex justify-content-center mt-4">
                                <button
                                    className="btn btn-success px-5"
                                    onClick={readValue}
                                >
                                    Add Menu Item
                                </button>
                            </div>

                            <div className="col-md-12 text-center">
                                <h5 style={{ color: messageColor }}>
                                    {message}
                                </h5>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AddMenuitem;