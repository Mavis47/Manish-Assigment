// src/utils/localStorage.ts
import { type FormSchema } from "../types/types";

const FORM_KEY = "forms";

export const saveForm = (form: FormSchema) => {
  const forms: FormSchema[] = JSON.parse(localStorage.getItem(FORM_KEY) || "[]");
  const index = forms.findIndex(f => f.id === form.id);
  if (index >= 0) forms[index] = form;
  else forms.push(form);
  localStorage.setItem(FORM_KEY, JSON.stringify(forms));
};

export const loadForms = (): FormSchema[] => {
  return JSON.parse(localStorage.getItem(FORM_KEY) || "[]");
};

export const loadFormById = (id: string): FormSchema | undefined => {
  return loadForms().find(f => f.id === id);
};

export const deleteForm = (id: string) => {
  const forms = loadForms().filter(f => f.id !== id);
  localStorage.setItem(FORM_KEY, JSON.stringify(forms));
};
