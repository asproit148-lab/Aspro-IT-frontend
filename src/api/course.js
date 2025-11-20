import axios from "axios";

const API = "http://localhost:3000/api/course";

const formConfig = {
  withCredentials: true,
  headers: { "Content-Type": "multipart/form-data" },
};

// Add Course
export const addCourse = async (data) => {
  const res = await axios.post(`${API}/add-Course`, data, formConfig);
  return res.data;
};
export const totalCourse = async () => {
  const res = await axios.get(`${API}/total-courses`, { withCredentials: true });
  return res.data;
};

// Get All Courses
export const getAllCourses = async () => {
  const res = await axios.get(`${API}/all-courses`, { withCredentials: true });
  return res.data;
};

// Get Single Course
export const getCourse = async (courseId) => {
  const res = await axios.get(`${API}/course-info/${courseId}`, {
    withCredentials: true,
  });
  return res.data;
};

// Enroll Course
export const enrollCourse = async (data) => {
  const res = await axios.post(`${API}/enroll-course`, data, {
    withCredentials: true,
  });
  return res.data;
};

// Delete Course
export const deleteCourse = async (courseId) => {
  const res = await axios.delete(`${API}/delete-course/${courseId}`, {
    withCredentials: true,
  });
  return res.data;
};
