import axios from "axios";

const API = "http://localhost:3000/api/blog";

const fileConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

const formConfig = {
  withCredentials: true,
};

// Add Blog
export const addBlog = async (formData) => {
  const res = await axios.post(`${API}/add-blog`, formData, fileConfig);
  return res.data;
};

// Update Blog
export const updateBlog = async (blogId, formData) => {
  const res = await axios.patch(
    `${API}/update-blog/${blogId}`,
    formData,
    fileConfig
  );
  return res.data;
};

// Delete Blog
export const deleteBlog = async (blogId) => {
  const res = await axios.delete(`${API}/delete/${blogId}`, formConfig);
  return res.data;
};

// Get Single Blog
export const getBlog = async (blogId) => {
  const res = await axios.get(`${API}/get-blog/${blogId}`);
  return res.data;
};

// Get All Blogs
export const getBlogs = async () => {
  const res = await axios.get(`${API}/get-all-blogs`);
  return res.data;
};

// Get Total Blogs Count
export const getTotalBlogs = async () => {
  const res = await axios.get(`${API}/total-blogs`);
  return res.data;
};
