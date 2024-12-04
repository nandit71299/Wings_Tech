import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import RegisterPage from "./pages/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />

          <Route path="/register" element={<RegisterPage />} />

          {/* Private Route */}
          <Route>
            <Route
              path="/post"
              element={<PostPage isAuthenticated={isAuthenticated} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
