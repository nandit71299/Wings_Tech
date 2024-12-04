import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts/`);
    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      throw new Error(
        response?.response?.data?.message || "Failed to fetch posts"
      );
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.response.data.message || "Failed to fetch posts",
      data: [],
    };
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      throw new Error(
        response?.response?.data?.message || "Failed to fetch post"
      );
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.response.data.message || "Failed to fetch post",
      data: {},
    };
  }
};

export const verifyUser = async () => {
  const token = localStorage.getItem("token"); // Get token from localStorage

  if (!token) {
    throw new Error("No token found");
  }

  // Make the request to verify the token
  return axios.get(`${API_URL}/verify-token`, { token });
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, data);
    console.log(response.data.token);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return { success: true, message: "Login successful" };
    }
  } catch (error) {
    console.error("Failed to login", error);
    return {
      success: false,
      message: error.response.data.message || "Failed to login",
    };
  }
};

export const addComment = async ({ userId, postId, comment }) => {
  try {
    const response = await axios.post(
      `${API_URL}/posts/add-comment/${postId}/${userId}`,
      { comment: comment }
    );
    if (response.data.success) {
      return {
        success: true,
        message: "Comment added successfully",
        data: response.data.post,
      };
    }
  } catch (error) {
    console.error("Failed to add comment", error);
    return {
      success: false,
      message: error.response.data.message || "Failed to add comment",
    };
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, data);

    // Assuming the response contains a message or success field
    if (response.data.user) {
      return {
        success: true,
        message: "Registration successful. You can now log in.",
      };
    }
  } catch (error) {
    console.error("Failed to register", error);
    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : "Failed to register",
    };
  }
};
