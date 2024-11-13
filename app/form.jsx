"use client";

import React, { useState } from "react";
import Modal from "./Modal";

export default function InputForm() {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bp: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    dpf: "",
    age: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Mock API response
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form.");
      }

      const data = await response.json();
      setResponseMessage(`Success: ${data.message}`);
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6  bg-slate-200 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Predict Diabetes
        </h2>

        {[
          { label: "Pregnancies", name: "pregnancies" },
          { label: "Glucose", name: "glucose" },
          { label: "Blood Pressure (BP)", name: "bp" },
          { label: "Skin Thickness", name: "skinThickness" },
          { label: "Insulin", name: "insulin" },
          { label: "BMI", name: "bmi" },
          { label: "Diabetes Pedigree Function (DPF)", name: "dpf" },
          { label: "Age", name: "age" },
        ].map((input) => (
          <div className="mb-4" key={input.name}>
            <label
              htmlFor={input.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {input.label}
            </label>
            <input
              type="number"
              id={input.name}
              name={input.name}
              value={formData[input.name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${input.label}`}
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      {/* Modal Component */}
      <Modal
        title={"response"}
        showModal={showModal}
        onClose={closeModal}
        message={responseMessage}
      />
    </>
  );
}
