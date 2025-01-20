import React, { useEffect, useState } from "react";
import "./Property.css";
import PropertyCard from "../../../components/PropertyCarda";
import SearchBar from "../../../components/SearchBar/Searchbar";
import { getPropertyCount, propertyPagination } from "../../../apis/Api";

const Properties = () => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [propertyCount, setPropertyCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const limit = 8;

  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPropertyCount();
    fetchProperties(page, searchQuery, sortOrder);
  }, [page, searchQuery, sortOrder]);

  const fetchPropertyCount = async () => {
    try {
      const res = await getPropertyCount();
      const count = res.data.propertyCount;
      setPropertyCount(count);
      setTotalPages(Math.ceil(count / limit));
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching property count");
    }
  };

  const fetchProperties = async (pageNum, query, sort) => {
    try {
      const res = await propertyPagination(pageNum, limit, query, sort);
      setProperties(res.data.property || []);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching properties");
    }
  };

  if (error) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter properties">
          {properties
            .filter((property) =>
              property.propertyTitle
                .toLowerCase()
                .includes(filter.toLowerCase()) ||
              property.propertyLocation
                .toLowerCase()
                .includes(filter.toLowerCase()) ||
              property.propertyCategory
                .toLowerCase()
                .includes(filter.toLowerCase())
            )
            .map((card) => (
              <PropertyCard card={card} key={card._id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
