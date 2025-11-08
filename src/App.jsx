import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";

import PythonBlog from "./pages/PythonBlog";
import GenAIBlog from "./pages/GenAIBlog";

import CyberSecurity from "./pages/CyberSecurity";
import GenAI from "./pages/GenAI";
import DataAnalytics from "./pages/DataAnalytics";
import BlockChain from "./pages/BlockChain";
import CloudComputing from "./pages/CloudComputing";
import DevOps from "./pages/DevOps";
import FullStackDevelopment from "./pages/FullStackDevelopment";
import PythonProgramming from "./pages/PythonProgramming";
import Enrollment from "./pages/Enrollment";
import ConfirmedEnroll from './pages/ConfirmedEnroll'

import AdminDashboard from "./pages/AdminDashboard";
import AdminCoupon from "./pages/AdminCoupon";
import AdminBlog from "./pages/AdminBlog";
import AdminCampaign from "./pages/AdminCampaign";
import AdminCourse from './pages/AdminCourse'
import SignupPopup from "./components/SignupPopup";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/our-services" element={<Services />} />
          <Route path="/blogs" element={<Blogs />} />

          <Route path="/blogs/python" element={<PythonBlog />} />
          <Route path="/blogs/gen-ai" element={<GenAIBlog />} />

          <Route path="/courses/cyber-security" element={<CyberSecurity />} />
          <Route path="/courses/gen-ai" element={<GenAI />} />
          <Route path="/courses/data-analytics" element={<DataAnalytics />} />
          <Route path="/courses/blockchain" element={<BlockChain />} />
          <Route path="/courses/cloud-computing" element={<CloudComputing />} />
          <Route path="/courses/devops" element={<DevOps />} />
          <Route path="/courses/fullstack-development" element={<FullStackDevelopment />} />
          <Route path="/courses/python-programming" element={<PythonProgramming />} />
          <Route path="/courses/enrollment" element={<Enrollment />} />
          <Route path="/courses/enrollment-successful" element={<ConfirmedEnroll />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/coupon-management" element={<AdminCoupon />} />
          <Route path="/admin/blog-management" element={<AdminBlog />} />
          <Route path="/admin/campaigns" element={<AdminCampaign />} />
          <Route path="/admin/course-management" element={<AdminCourse />} />
          <Route path="/signup" element={<SignupPopup />} />

        </Routes>
      </div>
    </Router>
  );
}
