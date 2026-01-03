import React, { useState } from "react";
import type { Field, FormSchema, FieldType } from "../types/types";
import FieldEditor from "../components/FieldEditor";
import { saveForm } from "../utils/localstorage";
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
    if (!formName.trim()) {
      alert("Please enter a form name!");
      return;
    }

    const form: FormSchema = {
      id: uuidv4(),
      name: formName,
      fields,
    };

    saveForm(form);
    alert("Form saved successfully!");
    setFormName("");
    setFields([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Create New Form
          </h1>
          <p className="text-gray-500 mt-1">
            Build your custom form by adding and configuring fields
          </p>
        </div>

        {/* Form Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Form Name
          </label>
          <input
            type="text"
            value={formName}
            onChange={e => setFormName(e.target.value)}
            placeholder="e.g. Contact Us Form"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/*Field Section */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Add Fields
          </p>
          <div className="flex flex-wrap gap-2">
            {FIELD_TYPES.map(type => (
              <button
                key={type}
                onClick={() => addField(type)}
                className="px-4 py-2 text-sm rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition"
              >
                + {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Fields Editor */}
        <div className="space-y-4">
          {fields.length === 0 && (
            <div className="text-center text-gray-400 py-10 border-2 border-dashed rounded-lg">
              No fields added yet. Click above to add fields.
            </div>
          )}

          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700">
                  Field {index + 1} — {field.type}
                </h3>
              </div>

              <FieldEditor
                field={field}
                onChange={updateField}
                onRemove={removeField}
              />
            </div>
          ))}
        </div>

        {/* Save Button */}
        {fields.length > 0 && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Save Form
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateForm;
