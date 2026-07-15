import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'


const ViewMenuitems = () => {

    const [data, changeData] = useState([])

    const fetchData = () => {

        axios.post("http://localhost:3000/menu-view")
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

            <NavigationBar />

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
                                    src={value.itemImageUrl}
                                    className="card-img-top"
                                    alt={value.itemName}
                                    style={{
                                        height: "220px",
                                        objectFit: "cover"
                                    }}
                                />

                                <div className="card-body">

                                    <h5 className="card-title">
                                        {value.itemName}
                                    </h5>

                                    <p className="card-text">
                                        <strong>Item ID:</strong> {value.itemId}
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
                                        <strong>Stock:</strong> {value.quantityAvailable}
                                    </p>

                                    <p className="card-text">
                                        <strong>Preparation Time:</strong> {value.preparationTime} mins
                                    </p>

                                    <p className="card-text">
                                        <strong>Status:</strong> {value.availabilityStatus}
                                    </p>

                                    <p className="card-text">
                                        <strong>Added Date:</strong> {value.addedDate}
                                    </p>

                                    <p className="card-text">
                                        <strong>Popularity:</strong> {value.popularityTag}
                                    </p>

                                    <a
                                        href={value.itemImageUrl}
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