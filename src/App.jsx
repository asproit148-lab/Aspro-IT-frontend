import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import BlogPage from './components/BlogPage.jsx';
import Resources from "./pages/Resources.jsx";
import Certificates from './pages/Certificates.jsx';
import Contact from './pages/Contact.jsx';
import Jobs from './pages/Jobs.jsx';
import Internships from './pages/Internships.jsx';

import PythonBlog from "./pages/PythonBlog";
import GenAIBlog from "./pages/GenAIBlog";

import CourseDetails from "./pages/CourseDetails.jsx";
import Enrollment from "./pages/Enrollment";
import ConfirmedEnroll from './pages/ConfirmedEnroll'
import PaymentFail from "./components/PaymentFail.jsx";

import AdminDashboard from "./pages/AdminDashboard";
import AdminCoupon from "./pages/AdminCoupon";
import AdminBlog from "./pages/AdminBlog";
import AdminCampaign from "./pages/AdminCampaign";
import AdminCourse from './pages/AdminCourse'
import AdminPayment from "./pages/AdminPayment";
import AdminResource from './pages/AdminResource.jsx'
import AdminJobs from './pages/AdminJobs.jsx';

import ChatbotWidget from "./components/ChatbotWidget"

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/our-services" element={<Services />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/internships" element={<Internships />} />

          <Route path="/blogs/python" element={<PythonBlog />} />
          <Route path="/blogs/gen-ai" element={<GenAIBlog />} />

          <Route path="/courses/:courseSlug" element={<CourseDetails />} />
          <Route path="/courses/enrollment" element={<Enrollment />} />
          <Route path="/courses/enrollment-successful" element={<ConfirmedEnroll />} />
          <Route path="/courses/payment-failed" element={<PaymentFail />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/coupon-management" element={<AdminCoupon />} />
          <Route path="/admin/blog-management" element={<AdminBlog />} />
          <Route path="/admin/campaigns" element={<AdminCampaign />} />
          <Route path="/admin/course-management" element={<AdminCourse />} />
          <Route path="/admin/payment-verification" element={<AdminPayment />} />
          <Route path="/admin/resource-management" element={<AdminResource />} />
          <Route path="/admin/job-management" element={<AdminJobs />} />
        </Routes>

        <ChatbotWidget />
      </div>
    </Router>
  );
}
