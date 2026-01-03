import React from "react";
import { type Field } from "../types/types";

interface Props {
  field: Field;
  onChange: (field: Field) => void;
  onRemove: (id: string) => void;
}

const FieldEditor: React.FC<Props> = ({ field, onChange, onRemove }) => {
  return (
    <div className="p-2 border rounded mb-2">
      <input
        type="text"
        value={field.label}
        placeholder="Label"
        onChange={e => onChange({ ...field, label: e.target.value })}
        className="border p-1 rounded w-full mb-1"
      />
      <input
        type="text"
        value={field.placeholder || ""}
        placeholder="Placeholder"
        onChange={e => onChange({ ...field, placeholder: e.target.value })}
        className="border p-1 rounded w-full mb-1"
      />
      <label className="flex items-center gap-2 mb-1">
        <input
          type="checkbox"
          checked={field.required}
          onChange={e => onChange({ ...field, required: e.target.checked })}
        />
        Required
      </label>
      {field.type === "select" && (
        <textarea
          value={field.options?.join("\n") || ""}
          placeholder="Enter options, one per line"
          onChange={e =>
            onChange({ ...field, options: e.target.value.split("\n") })
          }
          className="border p-1 rounded w-full mb-1"
        />
      )}
      <button
        onClick={() => onRemove(field.id)}
        className="text-red-500 mt-1"
      >
        Delete Field
      </button>
    </div>
  );
};

export default FieldEditor;
