export const BASE_URL = "http://localhost:5000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "api/auth/login",
    REGISTER: "api/auth/register",
    GET_PROFILE: "api/auth/profile",
    UPDATE_PROFILE: "api/auth/update-profile",
  },
  USERS: {
    GET_ALL_USERS: "/api/users", // Get all users (Admin only)
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`, // Get user by ID
    CREATE_USER: "/api/users/create", // Create a new user (Admin only)
    UPDATE_USER: (userId) => `/api/users/update/${userId}`,
    DELETE_USER: (userId) => `/api/users/delete/${userId}`, // Delete a user
  },
  TASKS: {
    GET_DASHBOARD_DATA: "/api/tasks/dashboard", // Get Dashboard Data
    GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard", // Get User Dashb
    GET_ALL_TASKS: "/api/tasks/", // Get all tasks (Admin: all, User: only assigr
    GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`, // Get task by ID
    CREATE_TASK: "/api/tasks/create", // Create a new task (Admin only)
    UPDATE_TASK: (taskId) => `/api/tasks/update/${taskId}`, // Update task details
    DELETE_TASK: (taskId) => `/api/tasks/delete/${taskId}`, // Delete a task (Admin only)
    UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, // Update task status
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/checklist`, // Update todo checklist
  },
  REPORTS: {
      EXPORT_TASKS: "/api/reports/export/tasks", // Download all tasks as an Excel
      EXPORT_USERS: "/api/reports/export/users", // Download user-task report
  },
  IMAGE: {
    UPLOAD_IMAGE: "api/auth/upload-image",
  },
};
