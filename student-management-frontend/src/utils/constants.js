export const API_ENDPOINTS = {
  STUDENTS: '/students',
  SEARCH: '/students/search',
  COURSE: '/students/course'
};

export const ROUTES = {
  HOME: '/',
  STUDENTS: '/students',
  ADD_STUDENT: '/students/add',
  EDIT_STUDENT: '/students/edit',
  STUDENT_DETAILS: '/students/details'
};

export const MESSAGES = {
  SUCCESS: {
    STUDENT_CREATED: 'Student created successfully!',
    STUDENT_UPDATED: 'Student updated successfully!',
    STUDENT_DELETED: 'Student deleted successfully!'
  },
  ERROR: {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    VALIDATION: 'Please fill in all required fields correctly.'
  }
};

export const COURSES = [
  'Computer Science',
  'Information Technology',
  'Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Marketing',
  'Finance',
  'Human Resources',
  'Other'
];
