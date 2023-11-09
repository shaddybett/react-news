import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    // Check if both email and password are filled in
    if (email && pass) {
      // Navigate to the next page
      navigate("/inner");
    } else {
      alert("Enter valid details!");
    }
  }

  function handleChange(event) {
    setEmail(event.target.value);
  }

  function handleChangeB(event) {
    setPass(event.target.value);
  }

  return (
    <div>
      <h1 style={{ color: "white", justifyContent: "center", display: "flex" }}>
        WELCOME TO MY PAGE
      </h1>
      <br />
      <h3 style={{ marginLeft: "500px" }}>sign in to get started</h3>
      <div style={{}}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={handleChange}
          required=".+gmail.com"
          style={{
            display: "flex",
            marginLeft: "550px",
            marginTop: "50px",
            borderRadius: "20px",
          }}
        />
        <br />
        <input
          type="password"
          value={pass}
          placeholder="Enter your password"
          onChange={handleChangeB}
          style={{
            display: "flex",
            marginLeft: "550px",
            marginTop: "px",
            borderRadius: "20px",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            display: "flex",
            marginLeft: "650px",
            marginTop: "20px",
            backgroundColor: "green",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
      <br />
    </div>
  );
}
