import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App