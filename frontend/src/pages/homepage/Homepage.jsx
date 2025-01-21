// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Button,
//   Menu,
//   MenuItem,
//   TextField,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SortIcon from "@mui/icons-material/Sort";
// import Pagination from "@mui/material/Pagination";
// import { getPropertyCount, propertyPagination } from "../../apis/Api";
// import PropertyCard from "../../components/PropertyCarda";


// const Homepage = () => {
//   const [properties, setProperties] = useState([]);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const limit = 8;

//   useEffect(() => {
//     fetchPropertyCount();
//     fetchProperties(page, searchQuery, sortOrder);
//   }, [page, searchQuery, sortOrder]);

//   const fetchPropertyCount = async () => {
//     try {
//       const res = await getPropertyCount();
//       const count = res.data.propertyCount;
//       setTotalPages(Math.ceil(count / limit));
//     } catch (err) {
//       setError(err.response?.data?.message || "Error fetching property count");
//     }
//   };

//   const fetchProperties = async (pageNum, query, sort) => {
//     try {
//       const res = await propertyPagination(pageNum, limit, query, sort);
//       setProperties(res.data.property || []);
//     } catch (err) {
//       setError(err.response?.data?.message || "Error fetching properties");
//     }
//   };

//   const handlePagination = (event, value) => {
//     setPage(value);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     setPage(1);
//   };

//   const handleSortOrderChange = (order) => {
//     setSortOrder(order);
//     setPage(1);
//   };

//   return (
//     <Box bgcolor="#f9f9f9" minHeight="100vh">
//       {/* Carousel */}
//       <div
//         id="carouselExampleCaptions"
//         className="carousel slide"
//         data-bs-ride="carousel"
//       >
//         <div
//           className="carousel-inner"
//           style={{ height: "400px", overflow: "hidden" }}
//         >
//           {/* Slide 1 */}
//           <div className="carousel-item active" style={{ marginTop: "64px" }}>
//             <img
//               src="/assets/images/2.png"
//               className="d-block w-100"
//               alt="..."
//               style={{ height: "100%", objectFit: "cover" }}
//             />
//             <div className="carousel-caption d-md-block">
//               {/* <h5>Hurry up and buy!</h5>
//               <p>Don't miss the golden chance to own your dream property.</p> */}
//             </div>
//           </div>

//           {/* Slide 2 */}
//           <div className="carousel-item" style={{ marginTop: "64px" }}>
//             <img
//               src="/assets/images/3.png"
//               className="d-block w-100"
//               alt="..."
//               style={{ height: "100%", objectFit: "cover" }}
//             />
//             <div className="carousel-caption d-md-block">
//               {/* <h5>Best Rate in the Market!</h5>
//               <p>Explore properties at unbeatable prices.</p> */}
//             </div>
//           </div>

//           {/* Slide 3 */}
//           <div className="carousel-item " style={{ marginTop: "64px" }} >
//             <img
//               src="/assets/images/cc.png"
//               className="d-block w-100 h-30"
//               alt="..."
//               style={{ height: "100%", objectFit: "fit" }}
//             />
//             <div className="carousel-caption d-md-block">
//               {/* <h5>Limited Time Offers!</h5>
//               <p>Book your flats at the best price today!</p> */}
//             </div>
//           </div>
//         </div>

//         {/* Carousel Controls */}
//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#carouselExampleCaptions"
//           data-bs-slide="prev"
//         >
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         </button>
//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#carouselExampleCaptions"
//           data-bs-slide="next"
//         >
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         </button>
//       </div>

//      {/* Search and Sort Section */}
// <Container maxWidth="" sx={{ mb: 2, mt: 2 }}>
//   <Grid container spacing={2} alignItems="center">
//     {/* Search Bar */}
//     <Grid item xs={12} md={6}>
//       <TextField
//         fullWidth
//         variant="outlined"
//         placeholder="Search for properties..."
//         value={searchQuery}
//         onChange={handleSearchChange}
//         sx={{
//           backgroundColor: "#fff",
//           borderRadius: "80px",
//           boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "80px",
//             padding: "px 16px",
//           },
//         }}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <IconButton>
//                 <SearchIcon />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
//     </Grid>

//     {/* Sort Button */}
//     <Grid item xs={12} md={6} textAlign={{ xs: "left", md: "right" }}>
//       <Button
//         variant="contained"
//         onClick={() => handleSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
//         sx={{
//           textTransform: "none",
//           padding: "10px 20px",
//           backgroundColor: "#083775",
//           color: "#fff",
//           borderRadius: "25px",
//           boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//           "&:hover": {
//             backgroundColor: "#062c59",
//           },
//         }}
//       >
//         <SortIcon sx={{ marginRight: "8px" }} />
//         Sort by Price
//       </Button>
//     </Grid>
//   </Grid>
// </Container>


//       {/* Property Cards Section */}
//       <Container maxWidth="">
//         <Typography variant="h4"  style={{ marginTop: "1px" }} color="primary" gutterBottom>
//             Discover Your Dream Property
//         </Typography>
//         <Grid container spacing={2}>
//           {error ? (
//             <Typography color="error" variant="body1" align="center">
//               {error}
//             </Typography>
//           ) : properties.length > 0 ? (
//             properties.map((property) => (
//               <Grid item xs={12} sm={6} md={4} lg={3} key={property._id}>
//                 <PropertyCard card={property} />
//               </Grid>
//             ))
//           ) : (
//             <Typography variant="body1" align="center">
//               No properties match your search criteria.
//             </Typography>
//           )}
//         </Grid>
//       </Container>

//       {/* Pagination Section */}
//       <Box mt={2} display="flex" justifyContent="center">
//         <Pagination
//           count={totalPages}
//           page={page}
//           onChange={handlePagination}
//           color="primary"
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Homepage;



import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Menu,
  MenuItem,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import Pagination from "@mui/material/Pagination";
import { getPropertyCount, propertyPagination } from "../../apis/Api";
import PropertyCard from "../../components/PropertyCarda";

const Homepage = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAnchorEl, setSortAnchorEl] = useState(null); // State for Sort Dropdown
  const [sortOrder, setSortOrder] = useState("price-asc"); // Default sorting by "Price: Low to High"
  const limit = 8;

  useEffect(() => {
    fetchPropertyCount();
    fetchProperties(page, searchQuery, sortOrder);
  }, [page, searchQuery, sortOrder]);

  const fetchPropertyCount = async () => {
    try {
      const res = await getPropertyCount();
      const count = res.data.propertyCount;
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

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleSortMenuOpen = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortSelection = (type) => {
    setSortOrder(type);
    setPage(1); // Reset to the first page when sorting
    setSortAnchorEl(null); // Close the dropdown
  };

  return (
    <Box bgcolor="#f9f9f9" minHeight="100vh">
      {/* Carousel */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div
          className="carousel-inner"
          style={{ height: "400px", overflow: "hidden" }}
        >
          <div className="carousel-item active" style={{ marginTop: "64px" }}>
            <img
              src="/assets/images/2.png"
              className="d-block w-100"
              alt="..."
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>

          <div className="carousel-item" style={{ marginTop: "64px" }}>
            <img
              src="/assets/images/3.png"
              className="d-block w-100"
              alt="..."
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>

          <div className="carousel-item " style={{ marginTop: "64px" }}>
            <img
              src="/assets/images/cc.png"
              className="d-block w-100 h-30"
              alt="..."
              style={{ height: "100%", objectFit: "fit" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>

      {/* Search and Sort Section */}
      <Container maxWidth="" sx={{ mb: 2, mt: 2 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Search Bar */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for properties..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "80px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "80px",
                  padding: "px 16px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Sort Dropdown */}
          <Grid item xs={12} md={6} textAlign={{ xs: "left", md: "right" }}>
            <Button
              variant="contained"
              onClick={handleSortMenuOpen}
              sx={{
                textTransform: "none",
                padding: "10px 20px",
                backgroundColor: "#083775",
                color: "#fff",
                borderRadius: "25px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#062c59",
                },
              }}
            >
              <SortIcon sx={{ marginRight: "8px" }} />
              Sort
            </Button>
            <Menu
              anchorEl={sortAnchorEl}
              open={Boolean(sortAnchorEl)}
              onClose={handleSortMenuClose}
              MenuListProps={{ "aria-labelledby": "sort-button" }}
            >
              <MenuItem onClick={() => handleSortSelection("asc")}>
                Price: Low to High
              </MenuItem>
              <MenuItem onClick={() => handleSortSelection("desc")}>
                Price: High to Low
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Container>

      {/* Property Cards Section */}
      <Container maxWidth="">
        <Typography
          variant="h4"
          style={{ marginTop: "1px" }}
          color="primary"
          gutterBottom
        >
          Discover Your Dream Property
        </Typography>
        <Grid container spacing={2}>
          {error ? (
            <Typography color="error" variant="body1" align="center">
              {error}
            </Typography>
          ) : properties.length > 0 ? (
            properties.map((property) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={property._id}>
                <PropertyCard card={property} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align="center">
              No properties match your search criteria.
            </Typography>
          )}
        </Grid>
      </Container>

      {/* Pagination Section */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePagination}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Homepage;
