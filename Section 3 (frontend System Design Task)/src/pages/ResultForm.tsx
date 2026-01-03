import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { FormSchema } from "../types/types";
import { loadFormById } from "../utils/localstorage";

interface FormValues {
  [key: string]: string;
}

const ResultForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<FormSchema | null>(null);
  const [values, setValues] = useState<FormValues>({});

  useEffect(() => {
    if (!id) return;

    const loadedForm = loadFormById(id);
    setForm(loadedForm || null);

    const savedValues = sessionStorage.getItem(`form_values_${id}`);
    if (savedValues) {
      setValues(JSON.parse(savedValues));
    }
  }, [id]);

  if (!form)
    return (
      <p className="p-6 text-center text-gray-500">
        Form not found
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Submitted Values
          </h1>
          <p className="text-gray-500 mt-1">
            {form.name}
          </p>
        </div>

        {/* Values */}
        <div className="space-y-4">
          {form.fields.map((field) => (
            <div
              key={field.id}
              className="border rounded-lg p-4 bg-gray-50"
            >
              <p className="text-sm text-gray-500 mb-1">
                {field.label}
              </p>
              <p className="text-gray-800 font-medium">
                {values[field.id] || "—"}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end">
          <Link
            to="/myforms"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            Back to My Forms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultForm;
