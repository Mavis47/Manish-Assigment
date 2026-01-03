# 🧩 Dynamic Form Builder

A **dynamic form builder application** built using **React, TypeScript, TailwindCSS**, and **localStorage**.
Users can create custom forms, preview them, submit responses, and view submitted values — all without a backend.

---

## 🚀 Live Features

* Create dynamic forms with configurable fields
* Preview forms with real-time validation
* Submit form responses
* View submitted values on a separate page
* Persist forms using `localStorage`
* Clean, responsive, professional UI

---

## 🛠️ Tech Stack

* **Frontend:** React + TypeScript
* **Styling:** TailwindCSS
* **Routing:** React Router DOM
* **State Management:** React Hooks
* **Storage:** localStorage & sessionStorage
* **Build Tool:** Vite

---

## 📁 Project Structure

```
src/
│── components/
│   ├── FieldEditor.tsx
│   ├── FieldPreview.tsx
│
│── pages/
│   ├── CreateForm.tsx
│   ├── MyForms.tsx
│   ├── PreviewForm.tsx
│   ├── ResultForm.tsx
│
│── types/
│   └── types.ts
│
│── utils/
│   └── localstorage.ts
│
│── App.tsx
│── main.tsx
```

---

## 🔀 Application Routes

| Route          | Description                |
| -------------- | -------------------------- |
| `/create`      | Create a new dynamic form  |
| `/myforms`     | View all saved forms       |
| `/preview/:id` | Preview & submit a form    |
| `/result/:id`  | View submitted form values |

---

## 🧱 Supported Field Types

* Text
* Number
* Textarea
* Select (Dropdown)

### Field Configuration Options

* Label
* Placeholder
* Required flag
* Default value
* Select options (for dropdowns)

---

## 💾 Data Persistence Strategy

### Forms

* Stored in **localStorage**
* Key: `forms`
* Structure:

```ts
{
  id: string;
  name: string;
  fields: Field[];
}
```

### Submitted Values

* Stored in **sessionStorage**
* Key format:

  ```
  form_values_<formId>
  ```

---

## ✅ Form Validation

* Required fields are validated on submit
* Inline error messages displayed
* Submission allowed only if all validations pass

---

## 🎨 UI & UX Highlights

* Responsive design (mobile & desktop)
* Card-based layouts
* Consistent design system
* Empty states for better UX
* Professional dashboard-style UI

---

## 🧪 How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mavis47/Manish-Assigment.git
cd Section 3 (frontend System Design)
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

App will run at:

```
http://localhost:5173
```

---


## 🔮 Future Improvements

* Edit existing forms
* Drag-and-drop field reordering
* Submission history
* Dark mode
* Backend integration (Node / Django / Firebase)

---

## 🧑‍💻 Author

**Manish Vishwakarma**
Frontend Developer | React | TypeScript

---

