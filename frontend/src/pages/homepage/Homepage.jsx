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
           <img src="/assets/images/carousel1.jpg" className="d-block w-100 h-50" alt="..." />
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
