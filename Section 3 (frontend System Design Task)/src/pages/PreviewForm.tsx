import React, { useState, useEffect } from "react";
import type { FormSchema } from "../types/types";
import { loadFormById } from "../utils/localstorage";
import FieldPreview from "../components/FieldPreview";
import { useParams, useNavigate } from "react-router-dom";

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

const PreviewForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<FormSchema | null>(null);
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const loaded = loadFormById(id);
      if (loaded) {
        setForm(loaded);

        const initialValues: FormValues = {};
        loaded.fields.forEach(f => {
          initialValues[f.id] = f.defaultValue || "";
        });
        setValues(initialValues);
      }
    }
  }, [id]);

  const handleChange = (fieldId: string, value: string) => {
    setValues(prev => ({ ...prev, [fieldId]: value }));
    setErrors(prev => ({ ...prev, [fieldId]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    const newErrors: FormErrors = {};
    form.fields.forEach(f => {
      if (f.required && !values[f.id]?.trim()) {
        newErrors[f.id] = `${f.label} is required`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      sessionStorage.setItem(
        `form_values_${form.id}`,
        JSON.stringify(values)
      );
      navigate(`/result/${form.id}`);
    }
  };

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
            {form.name}
          </h1>
          <p className="text-gray-500 mt-1">
            Please fill out the form below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {form.fields.map(field => (
            <FieldPreview
              key={field.id}
              field={field}
              value={values[field.id]}
              onChange={val => handleChange(field.id, val)}
              error={errors[field.id]}
            />
          ))}

          {/* Submit Section */}
          <div className="pt-6 border-t flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreviewForm;
