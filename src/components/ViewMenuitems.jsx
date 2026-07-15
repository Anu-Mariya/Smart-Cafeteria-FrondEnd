import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import Navbar from './Navbar'

const ViewMenuitems = () => {

    const [data, changeData] = useState([])

    const fetchData = () => {

        axios.get("http://localhost:4000/api/view-items")
            .then((response) => {
                changeData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>

            {/* <Navbar /> */}

            <div className="container mt-4">

                <h2 className="text-center mb-4">
                    View Menu Items
                </h2>

                <div className="row g-4">

                    {data.map((value, index) => (

                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3"
                            key={index}
                        >

                            <div className="card h-100 shadow">

                                <img
                                    src={value.image_url}
                                    className="card-img-top"
                                    alt={value.item_name}
                                    style={{
                                        height: "220px",
                                        objectFit: "cover"
                                    }}
                                />

                                <div className="card-body">

                                    <h5 className="card-title">
                                        {value.item_name}
                                    </h5>

                                    <p className="card-text">
                                        <strong>Item ID:</strong> {value.item_id}
                                    </p>

                                    <p className="card-text">
                                        <strong>Category:</strong> {value.category}
                                    </p>

                                    <p className="card-text">
                                        <strong>Description:</strong> {value.description}
                                    </p>

                                    <p className="card-text">
                                        <strong>Price:</strong> ₹{value.price}
                                    </p>

                                    <p className="card-text">
                                        <strong>Stock:</strong> {value.stock_quantity}
                                    </p>

                                    <p className="card-text">
                                        <strong>Preparation Time:</strong> {value.preparation_time} mins
                                    </p>

                                    <p className="card-text">
                                        <strong>Status:</strong> {value.availability_status}
                                    </p>

                                    <p className="card-text">
                                        <strong>Added Date:</strong> {value.added_date}
                                    </p>

                                    <p className="card-text">
                                        <strong>Popularity:</strong> {value.popularity_tag}
                                    </p>

                                    <a
                                        href={value.image_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-success w-100"
                                    >
                                        View Image
                                    </a>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    )
}

export default ViewMenuitems