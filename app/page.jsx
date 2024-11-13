"use client";

import React, { useState, useEffect } from "react";
import InputForm from "./form";
import Image from "next/image";
import Modal from "./Modal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  // List of pregnancy-related diabetes facts
  const facts = [
    `Gestational diabetes affects 2-10% of pregnancies each year. Monitoring blood sugar during pregnancy is vital for the health of both mother and baby.`,
    `High blood sugar levels during pregnancy can increase the risk of complications for both the mother and the baby, including the risk of developing Type 2 diabetes later.`,
    `Women who develop gestational diabetes are at higher risk of high blood pressure during pregnancy. Proper monitoring and lifestyle changes can help manage the risk.`,
    `Babies born to mothers with untreated gestational diabetes may have a higher birth weight, which can lead to complications during delivery.`,
    `Gestational diabetes usually develops during the second half of pregnancy. Early detection through regular check-ups can help manage the condition effectively.`,
    `After pregnancy, gestational diabetes usually goes away, but women who had it are at higher risk of developing Type 2 diabetes later in life. Maintaining a healthy lifestyle can reduce this risk.`,
  ];

  useEffect(() => {
    // Show the modal when the page loads and pick a random fact
    setShowModal(true);
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    setInfoMessage(randomFact);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Background Image */}
      <div className="relative">
        <Image src="/bg.jpg" alt="bg" fill style={{ objectFit: "contain" }} />
      </div>

      {/* Form Section */}
      <div className="p-7 flex items-center justify-center">
        <InputForm />
      </div>

      {/* Initial Load Modal */}
      <Modal
        title="Did You Know?"
        showModal={showModal}
        onClose={closeModal}
        message={infoMessage}
      />
    </div>
  );
}
