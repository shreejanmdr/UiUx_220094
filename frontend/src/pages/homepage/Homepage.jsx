// import React, { useEffect, useState } from "react";
// import { getPropertyCount, propertyPagination } from "../../apis/Api";
// import PropertyCard from "../../components/PropertyCarda";
// import "./Homepage.css";

// const Homepage = () => {
//   const [properties, setProperties] = useState([]);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [propertyCount, setPropertyCount] = useState(0);
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
//       setPropertyCount(count);
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

//   const handlePagination = (pageNum) => {
//     setPage(pageNum);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     setPage(1); // Reset to first page on search
//   };

//   const handleSortOrderChange = (order) => {
//     setSortOrder(order);
//     setPage(1); // Reset to first page on sort change
//   };

//   return (
//     <div className="container">
//       {/* Carousel */}
//       <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img src="/assets/images/carousel1.jpg" className="d-block w-100 h-50" alt="..." />
//             <div className="carousel-caption d-md-block">
//               <h5>Hurry up and buy!</h5>
//               <p>Don't miss the golden chance to own your dream property.</p>
//             </div>
//           </div>
//           <div className="carousel-item">
//             <img src="/assets/images/carousel2.jpg" className="d-block w-100" alt="..." />
//             <div className="carousel-caption d-md-block">
//               <h5>Best Rate in the Market!</h5>
//               <p>Explore properties at unbeatable prices.</p>
//             </div>
//           </div>
//           <div className="carousel-item">
//             <img src="/assets/images/carousel3.jpg" className="d-block w-100" alt="..." />
//             <div className="carousel-caption d-md-block">
//               <h5>Limited Time Offers!</h5>
//               <p>Book your flats at the best price today!</p>
//             </div>
//           </div>
//         </div>
//         <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         </button>
//         <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         </button>
//       </div>

//       {/* Search and Sort */}
//       <div className="controls mt-4">
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search by area or property ID..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//           <button className="search-button">Search</button>
//         </div>
//         <div className="sort-dropdown">
//           <button className="sort-button">Sort by</button>
//           <ul className="dropdown-menu">
//             <li onClick={() => handleSortOrderChange("asc")}>Price: Low to High</li>
//             <li onClick={() => handleSortOrderChange("desc")}>Price: High to Low</li>
//           </ul>
//         </div>
//       </div>

//       {/* Property Cards */}
//       <h2 className="section-title">Discover Your Dream Property</h2>
//       <div className="properties-grid">
//   {error ? (
//     <div className="error-message">{error}</div>
//   ) : properties && properties.length > 0 ? (
//     properties.map((property) => {
//       if (!property?._id) {
//         console.error("Property does not have an _id:", property);
//         return null; // Skip rendering this property
//       }
//       return (
//         <PropertyCard
//           key={property._id}
//           card={property}
//           color="#083775"
//         />
//       );
//     })
//   ) : (
//     <div className="no-results">No properties match your search criteria.</div>
//   )}
// </div>





//    <nav className="pagination-nav">
//       <ul className="pagination">
//      <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
//             <button onClick={() => handlePagination(1)}>First</button>
//           </li>
//           <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
//             <button onClick={() => handlePagination(page - 1)}>Previous</button>
//           </li>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
//               <button onClick={() => handlePagination(i + 1)}>{i + 1}</button>
//             </li>
//           ))}
//           <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
//             <button onClick={() => handlePagination(page + 1)}>Next</button>
//           </li>
//           <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
//             <button onClick={() => handlePagination(totalPages)}>Last</button>
//           </li>
//         </ul>
//       </nav>
//      </div>
//   );
//  };

// export default Homepage;



import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import Pagination from '@mui/material/Pagination';
import { getPropertyCount, propertyPagination } from '../../apis/Api';
import PropertyCard from '../../components/PropertyCarda';
import Carousel from 'react-material-ui-carousel';
import './Homepage.css';

const Homepage = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
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
      setError(err.response?.data?.message || 'Error fetching property count');
    }
  };

  const fetchProperties = async (pageNum, query, sort) => {
    try {
      const res = await propertyPagination(pageNum, limit, query, sort);
      setProperties(res.data.property || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching properties');
    }
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setPage(1);
  };

  return (
    <Box bgcolor="#f9f9f9" minHeight="100vh">

       {/* Carousel */}
       <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
         <div className="carousel-inner">
           <div className="carousel-item active">
             <img src="/assets/images/carousel1.jpg" className="d-block w-85 h-30" alt="..." />
             <div className="carousel-caption d-md-block">
               <h5>Hurry up and buy!</h5>
               <p>Don't miss the golden chance to own your dream property.</p>
             </div>
           </div>
           <div className="carousel-item" >
             <img src="/assets/images/carousel2.jpg" className="d-block w-85 h-30" alt="..." />
             <div className="carousel-caption d-md-block">
               <h5>Best Rate in the Market!</h5>
               <p>Explore properties at unbeatable prices.</p>
             </div>
          </div>
          <div className="carousel-item">
            <img src="/assets/images/carousel3.jpg" className="d-block w-85 h-30" alt="..." />             <div className="carousel-caption d-md-block">
               <h5>Limited Time Offers!</h5>
              <p>Book your flats at the best price today!</p>
             </div>
          </div>
         </div>
         <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
       </button>
       <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
       </button>
      </div>


      {/* Search and Sort Section */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by area or property ID..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} textAlign="right">
            <Button
              variant="outlined"
              startIcon={<SortIcon />}
              onClick={() => handleSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
              style={{ textTransform: 'none', padding: '10px 20px' }}
            >
              Sort by Price
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Property Cards Section */}
      <Container maxWidth="lg">
        <Typography variant="h4" color="primary" gutterBottom>
          Discover Your Dream Property
        </Typography>
        <Grid container spacing={4}>
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
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination count={totalPages} page={page} onChange={handlePagination} color="primary" />
      </Box>
    </Box>
  );
};

export default Homepage;
