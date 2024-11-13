import React, { useState } from "react";

function PlantCard({ plant }) {
  // State to manage the soldOut status
  const [soldOut, setSoldOut] = useState(plant.soldOut || false);

  // Toggle the soldOut state and update the backend via a PATCH request
  const toggleSoldOut = () => {
    setSoldOut(!soldOut);
    // Send the updated soldOut status to the backend
    fetch(`http://localhost:5000/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        soldOut: !soldOut,
      }),
    });
  };

  return (
    <li className="card" data-testid="plant-item">
      {/* Image and name */}
      <img src={plant.image || "https://via.placeholder.com/400"} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>

      {/* In stock / Out of stock button */}
      <button
        className={soldOut ? "sold-out" : "in-stock"}
        onClick={toggleSoldOut}
      >
        {soldOut ? "Sold Out" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;

