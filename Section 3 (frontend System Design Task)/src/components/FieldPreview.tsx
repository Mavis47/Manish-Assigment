import React from "react";
import type { Field } from "../types/types";

interface Props {
  field: Field;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const FieldPreview: React.FC<Props> = ({ field, value, onChange, error }) => {
  switch (field.type) {
    case "text":
    case "number":
      return (
        <div className="mb-3">
          <label className="block mb-1">
            {field.label} {field.required && "*"}
          </label>
          <input
            type={field.type}
            value={value}
            placeholder={field.placeholder}
            onChange={e => onChange(e.target.value)}
            className="border p-2 rounded w-full"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );

    case "textarea":
      return (
        <div className="mb-3">
          <label className="block mb-1">
            {field.label} {field.required && "*"}
          </label>
          <textarea
            value={value}
            placeholder={field.placeholder}
            onChange={e => onChange(e.target.value)}
            className="border p-2 rounded w-full"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );

    case "select":
      return (
        <div className="mb-3">
          <label className="block mb-1">
            {field.label} {field.required && "*"}
          </label>
          <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            {field.options?.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );

    default:
      return null;
  }
};

export default FieldPreview;
