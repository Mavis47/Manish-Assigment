import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateForm from "./pages/CreateForm";
import PreviewForm from "./pages/PreviewForm.tsx";
import MyForms from "./pages/MyForms";
import ResultForm from "./pages/ResultForm.tsx";
import Home from "./pages/Home.tsx";

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4 flex gap-4">
          <Link to="/create" className="text-blue-500 hover:underline">
            Create Form
          </Link>
          <Link to="/myforms" className="text-blue-500 hover:underline">
            My Forms
          </Link>
        </nav>

        <Routes>
          <Route path="/create" element={<CreateForm />} />
          <Route path="/preview/:id" element={<PreviewForm />} />
          <Route path="/myforms" element={<MyForms />} />
          <Route path="/result/:id" element={<ResultForm />} />
          <Route path="*" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
