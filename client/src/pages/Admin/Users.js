import { Table, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import { GetAllUsers, UpdateUserStatus } from "../../apicalls/users";
import moment from "moment";

function Users() {
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllUsers();
      dispatch(setLoader(false));
      if (response.success) {
        setUsers(response.data.filter((user) => user.role === "user"));
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(setLoader(true));
      const response = await UpdateUserStatus(id, status);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      ellipsis: true, 
    },
    {
      title: "Email",
      dataIndex: "email",
      ellipsis: true, 
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (record) => record.role.toUpperCase(),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (record) => record.status.toUpperCase(),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-5">
            {status === "active" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "blocked")}
              >
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "active")}
              >
                Unblock
              </span>
            )}
            
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
}

export default Users;
