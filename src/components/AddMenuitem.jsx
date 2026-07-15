import React, { useState } from 'react'

import axios from 'axios'
import NavigationBar from './NavigationBar'

const AddMenuitem = () => {

    const [input, changeInput] = useState({
        item_id: "",
        item_name: "",
        category: "",
        description: "",
        price: "",
        stock_quantity: "",
        preparation_time: "",
        availability_status: "",
        image_url: "",
        added_date: "",
        popularity_tag: ""
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

        axios.post("http://localhost:4000/api/add-item", input)
            .then((response) => {

                setMessage(response.data.message)
                setMessageColor("green")

                changeInput({
                    item_id: "",
                    item_name: "",
                    category: "",
                    description: "",
                    price: "",
                    stock_quantity: "",
                    preparation_time: "",
                    availability_status: "",
                    image_url: "",
                    added_date: "",
                    popularity_tag: ""
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
                                    name="item_id"
                                    value={input.item_id}
                                    onChange={inputHandler}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Item Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="item_name"
                                    value={input.item_name}
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
                                    name="stock_quantity"
                                    value={input.stock_quantity}
                                    onChange={inputHandler}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Preparation Time (mins)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="preparation_time"
                                    value={input.preparation_time}
                                    onChange={inputHandler}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Availability Status</label>

                                <select
                                    className="form-select"
                                    name="availability_status"
                                    value={input.availability_status}
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
                                    name="popularity_tag"
                                    value={input.popularity_tag}
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
                                    name="image_url"
                                    value={input.image_url}
                                    onChange={inputHandler}
                                />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label">Added Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="added_date"
                                    value={input.added_date}
                                    onChange={inputHandler}
                                />
                            </div>

                            <div className="col-md-12">
                                <button
                                    className="btn btn-success"
                                    onClick={readValue}
                                >
                                    Add Menu Item
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
    )
}

export default AddMenuitem