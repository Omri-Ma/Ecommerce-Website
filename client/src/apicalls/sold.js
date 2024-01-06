import { axiosInstance } from "./axiosinstance";
//Add sold item
export const AddSold = async (payload) => {
    
    try {
      const response = await axiosInstance.post("/api/sold/add-sold", payload);
      return response.data;
    } catch (error) {
      return error.message;
    }
  };

  // get all sold items
  export const GetSoldItems = async () => {
    try {
      const response = await axiosInstance.get("/api/sold/get-sold-items");
      return response.data;
    } catch (error) {
      return error.message;
    }
  };