
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/resume";

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const matchResume = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("jobDescription", jobDescription);
  return axios.post(`${API_BASE_URL}/match`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getHistory = async () => {
  return axios.get(`${API_BASE_URL}/history`);
};
