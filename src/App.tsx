import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
// import { Route, Routes, Navigate } from "react-router-dom";



// Pages
import HomePage from "./pages/HomePage.tsx";
import AuthorPage from "./pages/AuthorPage.tsx";



function App() {

  return (
    <>
      <BrowserRouter basename="/clientConference">
        <div className="App">
          <Routes>
            {/* <Route path="/" element={<Navigate to="/authors" replace />} /> */}
            <Route path="/authors" element={<HomePage />} />
            <Route path="/authors/:id" element={<AuthorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
