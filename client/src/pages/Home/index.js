import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import { GetProducts } from "../../apicalls/products";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

function Home() {
  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: "Active",
    category: [],
    age: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(filters);
      dispatch(setLoader(false));

      if (response.success) {
        setProducts(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div className="flex flex-1">
      <div className="flex h-full mt-5">
        {showFilters && (
          <Filters
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </div>
      <div className="flex flex-col flex-grow gap-5 p-5 ">
        <div className="flex gap-5">
          {!showFilters && (
            <i
              className="ri-equalizer-fill my-4 cursor-pointer justify-center"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          <input
            type="text"
            placeholder="Search products here ..."
            className="border border-x-gray-300 border-solid rounded p-2 h-14"
            value={filters.search}
            onChange={(e) => {
              setFilters({
                ...filters,
                search: e.target.value,
              });
            }}
          />
        </div>
        <div
          className={`grid gap-5 ${
            showFilters ? "grid-cols-4" : "grid-cols-5"
          }`}
        >
          {products?.map((product) => (
            <div
              key={product._id}
              className="border border-gray-300 border-solid rounded cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.images[0]}
                className="w-full h-52 object-cover rounded-t"
                alt=""
              />
              <div className="p-2 flex flex-col">
                <h1 className="text-lg font-semibold overflow-hidden overflow-ellipsis">{product.name}</h1>
                <p className="text-sm overflow-hidden overflow-ellipsis max-h-16">
                  {product.description}
                </p>
                <Divider />
                <span className="text-xl text-green-600 font-semibold overflow-hidden overflow-ellipsis">
                  ₪ {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
