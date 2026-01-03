import React, { useState, useEffect } from "react";
import type { FormSchema } from "../types/types";
import { loadForms, deleteForm } from "../utils/localstorage.ts";
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
      setForms(loadForms()); // reloading after deletion
    }
  };

  if (forms.length === 0)
    return <p className="p-4 text-center">No forms created yet.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Forms</h1>
      <div className="space-y-4">
        {forms.map((form) => (
          <div
            key={form.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{form.name}</p>
              <p className="text-sm text-gray-500">{form.fields.length} fields</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/preview/${form.id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Preview
              </button>
              <button
                onClick={() => handleDelete(form.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyForms;
