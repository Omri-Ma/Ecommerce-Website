import React from "react";

const categories = [
  { name: "Board", value: "board" },
  { name: "Card", value: "card" },
  { name: "Tabletop", value: "tabletop" },
  { name: "Puzzles", value: "puzzles" },
];
const ages = [
  { name: "Children", value: "children" },
  { name: "Family", value: "family" },
  { name: "Adults", value: "adults" },
];

function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  return (
    <div id="sidebar" className="w-72 h-200 bg-gray-200 rounded">
      <div className="flex justify-between mx-5 my-2 ">
        <h1 className="text-primary text-2xl">Filters</h1>
        <i
          className="ri-close-line text-2xl cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        ></i>
      </div>
      <div className="gap-1 flex flex-col mt-5 mx-5">
        <div>
          <h1 className="text-gray-600 text-xl">Categories:</h1>{" "}
          <div className="flex flex-col gap-1">
            {categories.map((category) => {
              return (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="category"
                    className="max-width"
                    checked={filters.category.includes(category.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          category: [...filters.category, category.value],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          category: filters.category.filter(
                            (item) => item !== category.value
                          ),
                        });
                      }
                    }}
                  />
                  <label htmlFor="category">{category.name}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="text-gray-600 text-xl">Best For:</h1>{" "}
          <div className="flex flex-col gap-1">
            {ages.map((age) => {
              return (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="category"
                    className="max-width"
                    checked={filters.age.includes(age.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          age: [...filters.age, age.value],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          age: filters.age.filter((item) => item !== age.value),
                        });
                      }
                    }}
                  />
                  <label htmlFor="age">{age.name}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
