import { axiosInstance } from "./axiosinstance";

// register user
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// login user
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get current user
export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-current-user");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all users
export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-users");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update user status
export const UpdateUserStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/update-user-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// add to user cart
export const AddToCart = async (id, item) => {
  try {
    const response = await axiosInstance.put(`/api/users/add-to-cart/${id}`, {
      item,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Update item in user's cart
export const UpdateCart = async (id, item) => {
  try {
    const response = await axiosInstance.put(`/api/users/update-cart/${id}`, {
      item ,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete item in user cart
export const DeleteItemFromCart = async (id, item) => {
  try {
    
    const response = await axiosInstance.put(
      `/api/users/delete-item-from-cart/${id}`,
      { item }
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

//delete the user's cart
export const DeleteUserCart = async (id) => {
  try {
    
    const response = await axiosInstance.delete(
      `/api/users/delete-cart/${id}`
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update user purchse history
export const UpdateHistory = async (id, historyItem) => {
  try {
    
    const response = await axiosInstance.put(
      `/api/users/update-history/${id}`,
       historyItem 
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

