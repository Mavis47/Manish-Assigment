import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Dynamic Form Builder
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-6">
          Create, preview, and manage dynamic forms with ease.
        </p>

        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-lg bg-blue-50">
            <p className="text-lg font-semibold text-blue-700">Create</p>
            <p className="text-sm text-gray-600">
              Build forms dynamically with multiple field types.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-green-50">
            <p className="text-lg font-semibold text-green-700">Preview</p>
            <p className="text-sm text-gray-600">
              Validate inputs and test forms instantly.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-purple-50">
            <p className="text-lg font-semibold text-purple-700">Manage</p>
            <p className="text-sm text-gray-600">
              Save forms locally and view submissions.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/create"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Create Form
          </Link>

          <Link
            to="/myforms"
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            View My Forms
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;
