import React from "react";
import GenericContainer from "../utility/GenericContainer";

const TaskManager = () => {
  return (
    <GenericContainer version="v3">
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="large-text text-dark font-600">Task Manager</h1>
          <p className="small-text text-gray mt-4">Assign, track, and monitor operational dashboard tasks.</p>
        </div>
      </div>
      
      <div className="grid-cols-3 gap-12 mb-16">
        <div className="bg-white p-15 rounded-5 shadow-sm">
          <p className="text-gray small-text font-500">Open Tasks</p>
          <h2 className="title-text text-dark font-600 mt-5">8</h2>
          <span className="text-warning mini-text font-500 mt-8 block">3 high priority</span>
        </div>
        <div className="bg-white p-15 rounded-5 shadow-sm">
          <p className="text-gray small-text font-500">Completed (This Week)</p>
          <h2 className="title-text text-dark font-600 mt-5">24</h2>
          <span className="text-success mini-text font-500 mt-8 block">+15% over last week</span>
        </div>
        <div className="bg-white p-15 rounded-5 shadow-sm">
          <p className="text-gray small-text font-500">Avg Resolution Time</p>
          <h2 className="title-text text-dark font-600 mt-5">1.5 Days</h2>
          <span className="text-primary mini-text font-500 mt-8 block">Within SLA goals</span>
        </div>
      </div>

      <div className="bg-white p-24 rounded-5 shadow-sm text-center py-40">
        <div className="icon flex items-center justify-center bg-forth rounded-full w-max mx-auto p-16 mb-16">
          <span className="flex text-primary">📋</span>
        </div>
        <h3 className="title-text text-dark font-600">Task Board Under Development</h3>
        <p className="small-text text-gray mt-5 max-w-sm mx-auto">
          The Kanban board and task assignment tools are being integrated.
        </p>
      </div>
    </GenericContainer>
  );
};

export default TaskManager;
