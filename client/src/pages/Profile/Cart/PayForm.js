import { Modal, Form, Input, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProductById } from "../../../apicalls/products";
import { setLoader } from "../../../redux/loadersSlice";
import { AddSold } from "../../../apicalls/sold";
import {
  DeleteUserCart,
  GetCurrentUser,
  UpdateHistory,
} from "../../../apicalls/users";
import { setCartCount, setUser } from "../../../redux/usersSlice";
import moment from "moment";

const rules = [
  {
    required: true,
    message: "Required",
  },
];

function PayForm({ showPayForm, setShowPayForm, getData, cart }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  

  const onFinish = async (values) => {
    if (user.status === "blocked") {
      message.error("Your account is BLOCKED, please contact the admin");
    } else {
      try {
        dispatch(setLoader(true));

        // Create an array of promises for all the asynchronous operations
        const promises = Object.keys(user.cart).map(async (key) => {
          const item = values;
          const currentProduct = await GetProductById(key);
          item.name = currentProduct.data.name;
          item.soldAmount = user.cart[key];
          item.earned = currentProduct.data.price * item.soldAmount;
          item.soldToName = user.name;
          item.email = user.email;
          item.phone = values.phone;
          item.address = values.address;
          item.specialRequest = values.specialRequest;
          item.createdAt = moment().format("YYYY-MM-DD HH:mm");

          const response = await AddSold(item);
          if (response.success) {
            message.success(response.message);

            const response2 = await UpdateHistory(user._id, item);
            if (response2.success) {
              message.success(response2.message);
            } else {
              message.error(response2.message);
            }

            return response.success;
          } else {
            message.error(response.message);
            return false;
          }
        });

        // Wait for all promises to resolve
        const results = await Promise.all(promises);

        // Check if all promises were successful before proceeding
        if (results.every((result) => result)) {
          // Delete the user's cart
          const deleteResponse = await DeleteUserCart(user._id);
          if (deleteResponse.success) {
            message.success(deleteResponse.message);
            getData();
            setShowPayForm(false);
          } else {
            message.error(deleteResponse.message);
          }

          const updatedUserResponse = await GetCurrentUser();
          if (updatedUserResponse.success) {
            dispatch(setUser(updatedUserResponse.data));
            const count = Object.values(updatedUserResponse.data.cart).reduce(
              (sum, item) => sum + item,
              0
            );

            dispatch(setCartCount(count));
          } else {
            message.error(updatedUserResponse.message);
          }
        }

        dispatch(setLoader(false));
      } catch (error) {
        dispatch(setLoader(false));
        message.error(error.message);
      }
    }
  };

  const formRef = React.useRef(null);

  return (
    <Modal
      title=""
      open={showPayForm}
      onCancel={() => setShowPayForm(false)}
      centered
      width={1000}
      okText={
        "Pay " +
        cart.reduce((sum, item) => sum + item.amount * item.price, 0) +
        "₪ For All Products"
      }
      onOk={() => {
        formRef.current.submit();
      }}
    >
      <div>
        <h1 className="text-primary text-2xl text-center font-semibold uppercase">
          {/*selectedProduct ? "Edit Product" : "Add Product"*/}
        </h1>
        <div className="flex py-3">
          <h1 className="text-2xl font-semibold text-red-600 ">
            CART CHECKOUT!
          </h1>
        </div>
        <div className="flex pb-3">
          <span>
            {user.name.replace(/\b\w/g, (char) => char.toUpperCase())} please
            fill in the next details carefully, these details will be important
            to contact {<br />} you about the shipment of your items!
          </span>
        </div>

        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item label="Phone" name="phone" rules={rules}>
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Address" name="address" rules={rules}>
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Special Requests"
            name="specialRequest"
            rules={rules}
          >
            <Input type="textbox" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default PayForm;
