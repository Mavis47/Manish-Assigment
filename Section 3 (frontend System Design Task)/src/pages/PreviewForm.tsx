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
    // Save submitted values temporarily
    sessionStorage.setItem(`form_values_${form.id}`, JSON.stringify(values));
    // Navigate to result page
    navigate(`/result/${form.id}`);
  }
};
  if (!form) return <p className="p-4">Form not found!</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{form.name}</h1>

      <form onSubmit={handleSubmit}>
        {form.fields.map(field => (
          <FieldPreview
            key={field.id}
            field={field}
            value={values[field.id]}
            onChange={val => handleChange(field.id, val)}
            error={errors[field.id]}
          />
        ))}

        <button
          type="submit"
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PreviewForm;
