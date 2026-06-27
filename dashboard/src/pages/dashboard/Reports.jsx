import React from "react";
import GenericContainer from "../utility/GenericContainer";

const Reports = () => {
  return (
    <GenericContainer version="v3">
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="large-text text-dark font-600">Reports & Export</h1>
          <p className="small-text text-gray mt-4">Generate custom sales reports, inventory audits, and customer logs.</p>
        </div>
      </div>
      
      <div className="grid-cols-3 gap-12 mb-16">
        <div className="bg-white p-15 rounded-5 shadow-sm">
          <p className="text-gray small-text font-500">Saved Templates</p>
          <h2 className="title-text text-dark font-600 mt-5">15</h2>
          <span className="text-primary mini-text font-500 mt-8 block">Reusable report presets</span>
        </div>
        <div className="bg-white p-15 rounded-5 shadow-sm">
          <p className="text-gray small-text font-500">Scheduled Reports</p>
          <h2 className="title-text text-dark font-600 mt-5">4</h2>
          <span className="text-success mini-text font-500 mt-8 block">Daily/weekly active dispatches</span>
        </div>
        <div className="bg-white p-15 rounded-5 shadow-sm">
          <p className="text-gray small-text font-500">Last Generated</p>
          <h2 className="title-text text-dark font-600 mt-5">Today, 09:30</h2>
          <span className="text-success mini-text font-500 mt-8 block">PDF & CSV generated successfully</span>
        </div>
      </div>

      <div className="bg-white p-24 rounded-5 shadow-sm text-center py-40">
        <div className="icon flex items-center justify-center bg-forth rounded-full w-max mx-auto p-16 mb-16">
          <span className="flex text-primary">📊</span>
        </div>
        <h3 className="title-text text-dark font-600">Reporting Engine Under Development</h3>
        <p className="small-text text-gray mt-5 max-w-sm mx-auto">
          The custom query builder and automated email report scheduler are being finalized.
        </p>
      </div>
    </GenericContainer>
  );
};

export default Reports;
