import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import moment from "moment";

function PurchaseHistory() {
  const { user } = useSelector((state) => state.users);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Purchased Amount",
      dataIndex: "soldAmount",
      ellipsis: true,
    },

    {
      title: "Paid (₪)",
      dataIndex: "earned",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      ellipsis: true,
    },

    {
      title: "Shipped To",
      dataIndex: "address",
      ellipsis: true,
    },

    {
      title: "Special Requests",
      dataIndex: "specialRequest",
      ellipsis: true,
    },
    {
      title: "Purchased At",
      dataIndex: "createdAt",
      ellipsis: true,
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY HH:mm"),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={user.purchaseHistory} />
    </div>
  );
}

export default PurchaseHistory;
