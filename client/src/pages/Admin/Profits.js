import { Table, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import moment from "moment";
import { GetSoldItems } from "../../apicalls/sold";

function Profits() {
  const [soldItems, setSoldItems] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      
      const response = await GetSoldItems(null);
       
    console.log(response);

      dispatch(setLoader(false));
      if (response.success) {
        setSoldItems(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };


  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
      
    },
    {
        title: "Sold Amount",
        dataIndex: "soldAmount",
        ellipsis: true, 
      },
      {
        title: "Profit (₪)",
        dataIndex: "earned",
        ellipsis: true, 
      },
      {
        title: "Client",
        dataIndex: "soldToName",
      },
    {
      title: "Email",
      dataIndex: "email",
      ellipsis: true, 
    },
    {
        title: "Phone Number",
        dataIndex: "phone",
      },
      {
        title: "Address",
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
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },

  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={soldItems} />
    </div>
  );
}

export default Profits;
