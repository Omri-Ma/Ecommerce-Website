import { Button, Table, message, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import {
  DeleteProduct,
  GetProducts,
  UpdateProductStatus,
} from "../../../apicalls/products";
import moment from "moment";

function Products() {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [showProductForm, setShowProductForm] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts({
        seller: user._id,
      });
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(setLoader(true));
      const response = await UpdateProductStatus(id, status);
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

  const deleteProduct = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteProduct(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
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
      title: "Price",
      dataIndex: "price",
      ellipsis: true, 
    },
    {
      title: "Category",
      dataIndex: "category",
      ellipsis: true, 
    },
    {
      title: "Age",
      dataIndex: "age",
      ellipsis: true, 
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex">
            <div className="flex">
              {status === "Active" && (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Active
                </Tag>
              )}

              {status === "Disabled" && (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Disabled
                </Tag>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      ellipsis: true, 
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;

        //
        return (
          <div className="flex justify-center space-x-4 items-center">
            <div className="flex ">
              <i
                className="ri-edit-box-line cursor-pointer"
                onClick={() => {
                  setSelectedProduct(record);
                  setShowProductForm(true);
                }}
              ></i>
            </div>
            {status === "Active" && (
              <span
                className="underline cursor-pointer "
                onClick={() => onStatusUpdate(_id, "Disabled")}
              >
                Disable
              </span>
            )}

            {status === "Disabled" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "Active")}
              >
                Activate
              </span>
            )}
            <i
              className="ri-delete-bin-line cursor-pointer"
              onClick={() => {
                deleteProduct(record._id);
              }}
            ></i>
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
      <div className="flex justify-end mb-2 ">
        <Button
          type="default"
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
        >
          Add Product
        </Button>
      </div>

      <Table columns={columns} dataSource={products} />

      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}
    </div>
  );
}

export default Products;
