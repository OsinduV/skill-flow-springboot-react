import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import About from "./pages/About";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup.jsx";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import HeaderDef from "./components/HeaderDef";
import PrivateRoute from "./components/PrivateRoute";
import ViewLearningPlan from "./pages/learningPlan/ViewLearningPlan.jsx";
import { Toaster } from "react-hot-toast";
import HomePost from "./pages/post/HomePost.jsx";
import LearningPlanList from "./pages/learningPlan/LearningPlan.jsx";
import CreateLearningPlan from "./pages/learningPlan/CreateLearningPlan.jsx";
import TemplateSelectionPage from "./pages/progressUpdate/TemplateSelectionPage.jsx";
import ProgressForm from "./pages/progressUpdate/ProgressForm.jsx";
import HomeLayout from "./pages/HomeLayout.jsx";
import UserProgressPosts from "./pages/progressUpdate/UserProgressPosts.jsx";
import FooterCom from "./components/Footer.jsx";
import GenerateLearningPlanForm from "./pages/learningPlan/GenerateLearningPlanForm.jsx";
import ViewGeneratedPlan from "./pages/learningPlan/ViewGeneratedPlan.jsx";
import EditGeneratedPlan from "./pages/learningPlan/EditGeneratedPlan.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomeLayout />}>
            <Route index element={<HomePost />} />
            <Route path="learning-plan" element={<LearningPlanList />} />
            <Route
              path="create-learning-plan"
              element={<CreateLearningPlan />}
            />
            <Route
              path="generate-learning-plan"
              element={<GenerateLearningPlanForm />}
            />
            <Route path="view-generated-plan" element={<ViewGeneratedPlan />} />
            <Route
              path="view-learning-plan/:planId"
              element={<ViewLearningPlan />}
            />
            <Route path="edit-generated" element={<EditGeneratedPlan />} />
            <Route
              path="progress/template-select/:planId"
              element={<TemplateSelectionPage />}
            />
            <Route path="progress/create/:planId" element={<ProgressForm />} />
            <Route
              path="progress/view-user-progress-updates"
              element={<UserProgressPosts />}
            />
          </Route>
          {/* private routes */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
      <FooterCom />
    </BrowserRouter>
  );
}
