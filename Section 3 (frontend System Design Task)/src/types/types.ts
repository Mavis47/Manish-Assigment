export type FieldType = "text" | "number" | "textarea" | "select";

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  defaultValue?: string;
  options?: string[]; 
}

export interface FormSchema {
  id: string;
  name: string;
  fields: Field[];
}
