import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import { Button, InputNumber, message } from "antd";
import { GetProductById } from "../../apicalls/products";
import Divider from "../../components/Divider";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { AddToCart, GetCurrentUser } from "../../apicalls/users";
import { setCartCount, setUser } from "../../redux/usersSlice";

function ProductInfo() {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const [amount, setAmount] = React.useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProductById(id);

      dispatch(setLoader(false));

      if (response.success) {
        setProduct(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const onAdd = async (item) => {
    if (user.role === "admin") {
      message.error("Admin users cant use the shop");
    } else {
      try {
        dispatch(setLoader(true));
        let response = await AddToCart(user._id, item);

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
            setAmount(1);
          } else {
            // Handle error when updating user data
            message.error(updatedUserResponse.message);
          }
          setAmount(1);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(setLoader(false));
        message.error(error.message);
      }
    }
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    product && (
      <div>
        <div className="grid grid-cols-2 gap-5  mt-5">
          {/* Images */}
          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className="w-full h-96 object-cover rounded-md"
            />
            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer" +
                      (selectedImageIndex === index
                        ? "border-2 border-green-600 border-dashed p-2"
                        : "")
                    }
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                );
              })}
            </div>
            <Divider />
            <div>
              <h1 className="text-gray-600">Added On:</h1>
              <span className="text-gray-600">
                {moment(product.createdAt).format("MMM D, YYYY HH:MM A")}
              </span>
            </div>
          </div>

          {/* details */}
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-2xl font-semibold text-red-600">
                {product.name}
              </h1>
              <span style={{ wordWrap: 'break-word' }}>{product.description}</span>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-red-600">
                Product Details
              </h1>
              <div className="flex justify-between mt-4">
                <span>Price:</span>
                <span>₪ {product.price}</span>
              </div>
              <div className="flex justify-between mt-4">
                <span>Category:</span>
                <span>
                  {product.category.charAt(0).toUpperCase() +
                    product.category.slice(1)}
                </span>
              </div>
              <div className="flex justify-between mt-4">
                <span>Fast Shipping:</span>
                <span>
                  {product.fastShipping ? "Available" : "Not Available"}
                </span>
              </div>
              <div className="flex justify-between mt-4">
                <span>Limited Edition:</span>
                <span>{product.limitedEdition ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-4">
                <span>Made In Israel:</span>
                <span>{product.madeInIsrael ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-4">
                <span>Fast Shipping:</span>
                <span>
                  {product.fastShipping ? "Available" : "Not Available"}
                </span>
              </div>
              <div className="flex justify-between mt-4">
                <span>Reccomended For:</span>
                <span>
                  {product.age.charAt(0).toUpperCase() + product.age.slice(1)}
                </span>
              </div>
            </div>
            <Divider />
            <div className="flex justify-center">
              <h1 className="text-2xl font-semibold text-red-600">
                Add to Cart
              </h1>
            </div>
            <div>
              <div className="flex justify-evenly">
                <div className="flex">
                  <span className="flex mt-4">
                    Total Amount: {amount * product.price} ₪
                  </span>
                </div>
                <div className="flex">
                  <InputNumber
                    min={1}
                    max={999}
                    defaultValue={1}
                    onChange={setAmount}
                  />
                </div>

                <div className="flex">
                  <Button
                    danger
                    type="primary"
                    size="large"
                    onClick={() => onAdd([id, amount])}
                  >
                    Add to Cart!
                  </Button>
                </div>
              </div>
            </div>
            <Divider />
          </div>
        </div>
      </div>
    )
  );
}

export default ProductInfo;
