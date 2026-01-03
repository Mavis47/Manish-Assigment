import React from "react";
import { type Field } from "../types/types";

interface Props {
  field: Field;
  onChange: (field: Field) => void;
  onRemove: (id: string) => void;
}

const FieldEditor: React.FC<Props> = ({ field, onChange, onRemove }) => {
  return (
    <div className="space-y-3">
      
      {/* Label */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Field Label
        </label>
        <input
          type="text"
          value={field.label}
          placeholder="e.g. Full Name"
          onChange={e => onChange({ ...field, label: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Placeholder */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Placeholder
        </label>
        <input
          type="text"
          value={field.placeholder || ""}
          placeholder="e.g. Enter your name"
          onChange={e => onChange({ ...field, placeholder: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Required Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={field.required}
          onChange={e => onChange({ ...field, required: e.target.checked })}
          className="accent-blue-600"
        />
        <label className="text-sm text-gray-700">
          Required field
        </label>
      </div>

      {/* Select Options */}
      {field.type === "select" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Options
          </label>
          <textarea
            value={field.options?.join("\n") || ""}
            placeholder="One option per line"
            onChange={e =>
              onChange({ ...field, options: e.target.value.split("\n") })
            }
            className="w-full border rounded-lg px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Delete */}
      <div className="pt-2">
        <button
          onClick={() => onRemove(field.id)}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Delete Field
        </button>
      </div>
    </div>
  );
};

export default FieldEditor;
