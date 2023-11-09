import React from "react";
import HomePage from "./Components/HomePage";
import { Route, Routes } from "react-router-dom";
import Inner from "./Inner";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inner" element={<Inner />} />
      </Routes>
    </div>
  );
}
