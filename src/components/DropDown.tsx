import React from "react";
import { useSearchParams } from "react-router-dom";

export const Dropdown: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") || "";

  const handleOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ sort: e.target.value });
  };

  return (
    <div className="dropdown">
      <label htmlFor="sort-by">Sort By:</label>
      <select
        id="sort-by"
        className="select"
        value={sortBy}
        onChange={(e) => handleOptionSelect(e)}
      >
        <option className="option" value="">
          Select an option
        </option>
        <option className="option" value="price">
          Cheapest
        </option>
        <option className="option" value="data">
          Newest
        </option>
      </select>
    </div>
  );
};
