import React, { useState, useEffect } from "react";
import type { FormSchema } from "../types/types";
import { loadForms, deleteForm } from "../utils/localstorage";
import { useNavigate } from "react-router-dom";

const MyForms: React.FC = () => {
  const [forms, setForms] = useState<FormSchema[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setForms(loadForms());
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      deleteForm(id);
      setForms(loadForms());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            My Forms
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and preview all your created forms
          </p>
        </div>

        {/* Empty State */}
        {forms.length === 0 && (
          <div className="text-center text-gray-400 py-12 border-2 border-dashed rounded-lg">
            <p className="text-lg font-medium">No forms created yet</p>
            <p className="text-sm mt-1">
              Create a form to see it listed here
            </p>
          </div>
        )}

        {/* Forms List */}
        <div className="space-y-4">
          {forms.map((form) => (
            <div
              key={form.id}
              className="group p-4 border rounded-lg bg-gray-50 hover:bg-white hover:shadow transition flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-gray-800 text-lg">
                  {form.name}
                </p>
                <p className="text-sm text-gray-500">
                  {form.fields.length} fields
                </p>
              </div>

              <div className="flex gap-2 mt-3 sm:mt-0">
                <button
                  onClick={() => navigate(`/preview/${form.id}`)}
                  className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                  Preview
                </button>

                <button
                  onClick={() => handleDelete(form.id)}
                  className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyForms;
