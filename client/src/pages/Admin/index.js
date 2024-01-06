import React, { useEffect } from "react";
import { Tabs } from "antd";
import Products from "./Products";
import Users from "./Users";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Profits from "./Profits";

function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Profits",
      children: <Profits />,
    },
    {
      key: "3",
      label: "Users",
      children: <Users />,
    },
  ];

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items}></Tabs>
    </div>
  );
}

export default Admin;
