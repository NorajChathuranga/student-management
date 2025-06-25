import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const studentService = {
  // Get all students
  getAllStudents: async () => {
    try {
      const response = await api.get('/students');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch students');
    }
  },

  // Get student by ID
  getStudentById: async (id) => {
    try {
      const response = await api.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch student');
    }
  },

  // Create new student
  createStudent: async (studentData) => {
    try {
      const response = await api.post('/students', studentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create student');
    }
  },

  // Update student
  updateStudent: async (id, studentData) => {
    try {
      const response = await api.put(`/students/${id}`, studentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update student');
    }
  },

  // Delete student
  deleteStudent: async (id) => {
    try {
      await api.delete(`/students/${id}`);
      return true;
    } catch (error) {
      throw new Error('Failed to delete student');
    }
  },

  // Search students
  searchStudents: async (query) => {
    try {
      const response = await api.get(`/students/search?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to search students');
    }
  },

  // Get students by course
  getStudentsByCourse: async (course) => {
    try {
      const response = await api.get(`/students/course/${encodeURIComponent(course)}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch students by course');
    }
  }
};

export default studentService;
