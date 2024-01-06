import React, { useEffect } from "react";
import { Avatar, Badge,  message } from "antd";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import { setUser, setCartCount , selectCartCount} from "../redux/usersSlice";

function ProtectedPage({ children }) {
  const { user } = useSelector((state) => state.users);
  const cartCount = useSelector(selectCartCount);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetCurrentUser();

      if (response.success) {
        dispatch(setUser(response.data));
        const count = Object.values(response.data.cart).reduce(
          (sum, item) => sum + item,
          0
        );
        dispatch(setCartCount(count));
        dispatch(setLoader(false));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <div>
        {/*header*/}
        <div className="flex justify-between items-center bg-primary p-5">
          <h1
            className="text-2xl text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            Outside the Box
          </h1>
          <div className="bg-white py-2 px-5 rounded flex gap-1 items-center ">
            <div
              className="cursor-pointer"
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              {user.role === "user" && (<Badge count={cartCount} className="mr-2">
                <Avatar
                  style={{ backgroundColor: "#50C878" }}
                  shape="square"
                  icon={<i className="ri-shopping-cart-line"></i>}
                />
              </Badge>)}
            </div>
            <span
              className="underline cursor-pointer"
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              {" "}
              {user.name.replace(/\b\w/g, (char) => char.toUpperCase()) + (user.role === "user" ? "'s Cart " : " - Admin Panel")}
            </span>
            <span className="mx-6">|</span>
            <i
              className="ri-logout-box-r-line  cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>

        {/*body*/}
        <div className="p-5">{children}</div>
      </div>
    )
  );
}

export default ProtectedPage;
