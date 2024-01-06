import { Button, InputNumber, Table, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import { GetProductsByIdArray } from "../../../apicalls/products";
import {
  DeleteItemFromCart,
  GetCurrentUser,
  UpdateCart,
} from "../../../apicalls/users";
import PayForm from "./PayForm";
import { setCartCount, setUser } from "../../../redux/usersSlice";

function Cart() {
  const [showPayForm, setShowPayForm] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [cart, setCart] = React.useState([]);

  const getData = async () => {
    try {
      ///
      dispatch(setLoader(true));

      // Fetch current user data
      const response = await GetCurrentUser();

      // Fetch products based on product IDs in the user's cart
      const productIdsInCart = Object.keys(response.data.cart);

      // Check if there are any product IDs before making the request
      if (productIdsInCart.length === 0) {
        // No products in the cart, set cart state to empty array
        setCart([]);
        dispatch(setLoader(false));
        return;
      }

      const help = await GetProductsByIdArray(productIdsInCart);

      dispatch(setLoader(false));
      ///

      dispatch(setLoader(false));
      for (let i = 0; i < help.data.length; i++) {
        help.data[i]["amount"] = response.data.cart[help.data[i]._id];
      }
      if (response.success) {
        setCart(help.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const onDelete = async (id) => {
    try {
      dispatch(setLoader(true));
      const resUser = await GetCurrentUser();

      const response = await DeleteItemFromCart(resUser.data._id, id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        const updatedUserResponse = await GetCurrentUser();
        if (updatedUserResponse.success) {
          dispatch(setUser(updatedUserResponse.data));
          const count = Object.values(updatedUserResponse.data.cart).reduce(
            (sum, item) => sum + item,
            0
          );
          dispatch(setCartCount(count));
        } else {
          // Handle error when updating user data
          message.error(updatedUserResponse.message);
        }

        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const handleAmountChange = async (productId, newAmount) => {
    try {
      dispatch(setLoader(true));
      const resUser = await GetCurrentUser();

      // Update the amount in the user's cart
      resUser.data.cart[productId] = newAmount;

      const response = await UpdateCart(resUser.data._id, {
        id: productId,
        amount: newAmount,
      });

      dispatch(setLoader(false));

      if (response.success) {
        message.success(response.message);
        const updatedUserResponse = await GetCurrentUser();
        if (updatedUserResponse.success) {
          dispatch(setUser(updatedUserResponse.data));
          const count = Object.values(updatedUserResponse.data.cart).reduce(
            (sum, item) => sum + item,
            0
          );
          dispatch(setCartCount(count));
        } else {
          // Handle error when updating user data
          message.error(updatedUserResponse.message);
        }

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
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      ellipsis: true,
      render: (text, record) => {
        const { _id } = record;
        return (
          <div className="flex gap-5">
            <InputNumber
              min={1}
              max={999}
              defaultValue={user.cart[_id] || 1}
              onChange={(value) => handleAmountChange(_id, value)}
            />
          </div>
        );
      },
    },
    {
      title: "Price for one (₪)",
      dataIndex: "price",
      ellipsis: true,
    },
    {
      title: "Price (₪)",
      dataIndex: "price",
      render: (text, record) => {
        const { price, _id, amount } = record;
        return <div className="flex gap-5">{price * amount}</div>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-5">
            <i
              className="ri-delete-bin-line cursor-pointer"
              onClick={() => onDelete(_id)}
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
      <div>
        <Table columns={columns} dataSource={cart} />
        {showPayForm && (
          <PayForm
            showPayForm={showPayForm}
            setShowPayForm={setShowPayForm}
            getData={getData}
            cart={cart}
          />
        )}
      </div>
      <div className="mt-10">
        <div className="flex justify-evenly">
          <div></div>
          <div className="flex">
            <span className="flex mt-4 text-2xl">
              Total Amount:{" "}
              {cart.reduce((sum, item) => sum + item.amount * item.price, 0)} ₪
            </span>
          </div>

          <div className="flex">
            <Button
              danger
              type="primary"
              size="large"
              onClick={() => {
                cart.reduce((sum, item) => sum + item.amount * item.price, 0) &&
                  setShowPayForm(true);
              }}
            >
              Pay Now!
            </Button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
