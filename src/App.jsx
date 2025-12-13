import React, { lazy, Suspense } from "react"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Services = lazy(() => import("./pages/Services"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogPage = lazy(() => import('./components/BlogPage.jsx'));
const Resources = lazy(() => import("./pages/Resources.jsx"));
const Certificates = lazy(() => import('./pages/Certificates.jsx'));
const PracticeQue = lazy(() => import('./pages/PracticeQue.jsx'));
const IndividualQue = lazy(() => import('./components/IndividualQue.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Jobs = lazy(() => import('./pages/Jobs.jsx'));
const Internships = lazy(() => import('./pages/Internships.jsx'));
const CourseDetails = lazy(() => import("./pages/CourseDetails.jsx"));
const Enrollment = lazy(() => import("./pages/Enrollment"));
const ConfirmedEnroll = lazy(() => import('./pages/ConfirmedEnroll'));
const PaymentFail = lazy(() => import("./components/PaymentFail.jsx"));
const Courses = lazy(() => import("./pages/Courses.jsx"));

const ChangePassword = lazy(() => import('./components/admin/ChangePassword.jsx'));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminCoupon = lazy(() => import("./pages/AdminCoupon"));
const AdminBlog = lazy(() => import("./pages/AdminBlog"));
const AdminCampaign = lazy(() => import("./pages/AdminCampaign"));
const AdminCourse = lazy(() => import('./pages/AdminCourse'));
const AdminPayment = lazy(() => import("./pages/AdminPayment"));
const AdminResource = lazy(() => import('./pages/AdminResource.jsx'));
const AdminPracticeQue = lazy(() => import('./pages/AdminPracticeQue.jsx'));
const AdminJobs = lazy(() => import('./pages/AdminJobs.jsx'));

import ChatbotWidget from "./components/ChatbotWidget"; 


export default function App() {
  const { user, loading } = useAuth();

  const LoadingFallback = () => <div style={{ 
      textAlign: 'center', 
      padding: '50px', 
      fontSize: '20px' 
    }}>Loading Page...</div>;

  return (
    <Router>
      <div className="App"
      style={{ 
        overflowX: 'hidden', 
        maxWidth: '100%', 
        boxSizing: 'border-box' 
      }}>
        
        {/* WRAP ALL ROUTES IN SUSPENSE */}
        <Suspense fallback={<LoadingFallback />}>
          <Routes>

            {/* Admin Routes */}
            {user?.role === "admin" ? (
              <>
                <Route path="/admin/change-password" element={<ChangePassword />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/coupon-management" element={<AdminCoupon />} />
                <Route path="/admin/blog-management" element={<AdminBlog />} />
                <Route path="/admin/campaigns" element={<AdminCampaign />} />
                <Route path="/admin/course-management" element={<AdminCourse />} />
                <Route path="/admin/payment-verification" element={<AdminPayment />} />
                <Route path="/admin/resource-management" element={<AdminResource />} />
                <Route path="/admin/practice-questions" element={<AdminPracticeQue />} />
                <Route path="/admin/job-management" element={<AdminJobs />} />

                <Route path="*" element={<Navigate to="/admin/dashboard" />} />
              </>
            ) : (
              <>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/our-services" element={<Services />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:slug/:id" element={<BlogPage />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/practice-questions" element={<PracticeQue />} />
                <Route path="/practice-questions/:courseSlug/:courseId" element={<IndividualQue />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/internships" element={<Internships />} />
                <Route path="/courses-all" element={<Courses />} />
                <Route path="/courses/:slug/:id" element={<CourseDetails />} />
                <Route path="/courses/enrollment" element={<Enrollment />} />
                <Route path="/courses/enrollment-successful" element={<ConfirmedEnroll />} />
                <Route path="/courses/payment-failed" element={<PaymentFail />} />

                <Route path="/admin/*" element={<Navigate to="/" />} />
              </>
            )}

          </Routes>
        </Suspense> 
        <ChatbotWidget />
      </div>
    </Router>
  );
}