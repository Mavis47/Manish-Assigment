## API Documentation

This project provides REST APIs built using Django Rest Framework.

### Base URL
http://127.0.0.1:8000/api


---

### API Testing using Insomnia or Postman

An Insomnia collection is provided in YAML format.

#### How to import:
1. Open Insomnia or Postman
2. Click **Application → Import**
3. Select `insomnia-api.yaml`
4. All API requests will be available for testing

---ish@fedora:~/Downloads/Assigment$ git add .
manish@fedora:~/Downloads/Assigment$ git commit -m "Enhanced section 3 ui"
[main 5c19efc] Enhanced section 3 ui
 4 files changed, 246 insertions(+), 134 deletions(-)
manish@fedora:~/Downloads/Assigment$ git push origin main
Enumerating objects: 17, done.
Counting objects: 100% (17/17), done.
Delta compression using up to 8 threads
Compressing objects: 100% (9/9), done.
Writing objects: 100% (9/9), 4.07 KiB | 4.07 MiB/s, done.
Total 9 (delta 5), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (5/5), completed with 4 local objects.
To https://github.com/Mavis47/Manish-Assigment.git
   c6bf982..5c19efc  main -> main
manish@fedora:~/Downloads/Assigment$ cd ./Section\ 3\ \(frontend\ System\ Design\ Task\)/
manish@fedora:~/Downloads/Assigment/Section 3 (frontend System Design Task)$ npm run dev

> section-3--frontend-system-design-task-@0.0.0 dev
> vite


  VITE v7.3.0  ready in 632 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
^C
manish@fedora:~/Downloads/Assigment/Section 3 (frontend System Design Task)$ cd ../
manish@fedora:~/Downloads/Assigment$ git add .
manish@fedora:~/Downloads/Assigment$ git commit -m "added missing labels"
[main 322cd70] added missing labels
 3 files changed, 243 insertions(+), 32 deletions(-)
 create mode 100644 Section 3 (frontend System Design Task)/readme.md
 delete mode 100644 Section 3 (frontend System Design Task)/src/components/FormListItems.tsx
manish@fedora:~/Downloads/Assigment$ git push origin main
To https://github.com/Mavis47/Manish-Assigment.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/Mavis47/Manish-Assigment.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
manish@fedora:~/Downloads/Assigment$ git pull
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 1), reused 1 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (3/3), 1.37 KiB | 1.37 MiB/s, done.
From https://github.com/Mavis47/Manish-Assigment
   5c19efc..a1a9bf5  main       -> origin/main
hint: You have divergent branches and need to specify how to reconcile them.
hint: You can do so by running one of the following commands sometime before
hint: your next pull:
hint:
hint:   git config pull.rebase false  # merge
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint:
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
fatal: Need to specify how to reconcile divergent branches.
manish@fedora:~/Downloads/Assigment$ git push origin main
To https://github.com/Mavis47/Manish-Assigment.git
 ! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'https://github.com/Mavis47/Manish-Assigment.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. If you want to integrate the remote changes,
hint: use 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
manish@fedora:~/Downloads/Assigment$ ^C

### Available APIs

#### Users
- `GET /users/`
- `POST /users/`
- `PUT /users/{id}/`
- `DELETE /users/{id}/`

#### Products
- `GET /products/`
- `GET /products/{id}`
- `POST /products/`
- `PATCH /products/{id}/`
- `DELETE /products/{id}/`

#### Orders
- `GET /orders/?status=PAID&page=1&limit=10`
- `GET /orders/status=PAID`
- `GET /orders`
- `POST /orders/`
- `PATCH /orders/{id}/`
- `PUT /orders/{id}/`
- `DELETE /orders/{id}/`

#### Order Items
- `GET /order-items/`
- `GET /order-items/{id}/`
- `POST /order-items/`
- `PATCH /order-items/{id}/`
- `PUT /order-items/{id}/`
- `DELETE /order-items/{id}/`

#### Reports
- `GET /users/top_spenders/`
- `GET /products/out-of-stock/`
- `GET /orders/summary/`
---

## SECTION 3

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


