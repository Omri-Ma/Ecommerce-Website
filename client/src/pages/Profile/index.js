import React from "react";
import { Tabs } from "antd";
import Cart from "./Cart"
import PurchaseHistory from "./PurchaseHistory";

function Profile() {
  const items = [
    {
      key: '1',
      label: 'Cart',
      children: <Cart />,
    },
    {
      key: '2',
      label: 'Purchase History',
      children: <PurchaseHistory />,
    },
  ];
  
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items}>
      </Tabs>
    </div>
  );
}

export default Profile;
