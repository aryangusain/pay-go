import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./userSlice";
import { jwtDecode } from "jwt-decode";
import RequireAuth from "./components/RequireAuth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      try {
        const decodedUserInfo = jwtDecode(jwtToken);
        dispatch(setUser(decodedUserInfo));
      } catch (error) {
        console.error("Error decoding JWT:", error);
        localStorage.removeItem("token");
      }
    }
  }, [dispatch]);

  return (
    <div className="h-full ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transfer" element={<Transfer />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
