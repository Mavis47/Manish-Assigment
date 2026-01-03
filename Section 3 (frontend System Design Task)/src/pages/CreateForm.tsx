// src/pages/CreateForm.tsx
import React, { useState } from "react";
import type { Field, FormSchema, FieldType } from "../types/types.ts";
import FieldEditor from "../components/FieldEditor";
import { saveForm } from "../utils/localstorage.ts";
import { v4 as uuidv4 } from "uuid";

const FIELD_TYPES: FieldType[] = ["text", "number", "textarea", "select"];

const CreateForm: React.FC = () => {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);

  const addField = (type: FieldType) => {
    const newField: Field = {
      id: uuidv4(),
      type,
      label: "",
      placeholder: "",
      required: false,
      defaultValue: "",
      options: type === "select" ? [] : undefined,
    };
    setFields([...fields, newField]);
  };

  const updateField = (updated: Field) => {
    setFields(fields.map(f => (f.id === updated.id ? updated : f)));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSave = () => {
    if (!formName) {
      alert("Please enter a form name!");
      return;
    }
    const form: FormSchema = {
      id: uuidv4(),
      name: formName,
      fields,
    };
    saveForm(form);
    alert("Form saved!");
    setFormName("");
    setFields([]);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Form</h1>

      <input
        type="text"
        value={formName}
        onChange={e => setFormName(e.target.value)}
        placeholder="Form Name"
        className="border p-2 rounded w-full mb-4"
      />

      <div className="mb-4">
        <label className="font-semibold">Add Field:</label>
        <div className="flex gap-2 mt-2">
          {FIELD_TYPES.map(type => (
            <button
              key={type}
              onClick={() => addField(type)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        {fields.map(field => (
          <FieldEditor
            key={field.id}
            field={field}
            onChange={updateField}
            onRemove={removeField}
          />
        ))}
      </div>

      {fields.length > 0 && (
        <button
          onClick={handleSave}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Form
        </button>
      )}
    </div>
  );
};

export default CreateForm;
