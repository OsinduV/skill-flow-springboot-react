import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import HeaderDef from "./components/HeaderDef";
import PrivateRoute from "./components/PrivateRoute";
import ViewLearningPlan from "./components/ViewLearningPlan.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />

        <Route element={<PrivateRoute />}>
          {/* private routes */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}
