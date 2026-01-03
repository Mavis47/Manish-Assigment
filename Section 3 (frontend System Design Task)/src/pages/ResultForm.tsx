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

    // Load form schema
    const loadedForm = loadFormById(id);
    setForm(loadedForm || null);

    // Load submitted values from sessionStorage
    const savedValues = sessionStorage.getItem(`form_values_${id}`);
    if (savedValues) {
      setValues(JSON.parse(savedValues));
    }
  }, [id]);

  if (!form) return <p className="p-4">Form not found!</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submitted Values: {form.name}</h1>
      <div className="space-y-2">
        {form.fields.map((field) => (
          <div key={field.id} className="p-2 border rounded">
            <p className="font-semibold">{field.label}:</p>
            <p className="text-gray-700">{values[field.id] || "-"}</p>
          </div>
        ))}
      </div>

      <Link
        to="/myforms"
        className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Back to My Forms
      </Link>
    </div>
  );
};

export default ResultForm;
