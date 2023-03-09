import React, { useState } from "react";
import axios from "axios";
import { response } from "express";

function InventoryForm() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("quantity", quantity);
    formData.append("image", image);
    axios.post("/api/inventory", formData).then((response) => {
      console.log(response.data);
    });

  fetch('api/inventory')
  .then(response => response.text)
  .then(data => {
    console.log(data);
  });
  };



  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />
      <input
        type="file"
        onChange={(event) => setImage(event.target.files[0])}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default InventoryForm;
