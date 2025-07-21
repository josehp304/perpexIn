import React from "react";

export default function AdmissionsForm() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Admissions Application Form</h1>
      <p className="text-lg text-gray-600 mb-6">Apply now to join our program!</p>
      <div className="w-full max-w-4xl h-[80vh] bg-white shadow-2xl rounded-2xl overflow-hidden">
        <iframe
          src="https://tally.so/embed/wM8kQd?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          width="100%"
          height="100%"
          title="Admissions Application Form"
          className="w-full h-full"
        ></iframe>
      </div>
    </section>
  );
} 