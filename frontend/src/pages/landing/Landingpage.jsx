import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";

const Landingpage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        mt: "35px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url('/assets/images/bg4.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#2E3A59",
        padding: "20px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Section */}
          <Grid
            item
            xs={12}
            md={6}
            component={motion.div}
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Box textAlign={{ xs: "center", md: "left" }} p={2}>
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{
                  mb: 2,
                  color: "#083775",
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                ForRent<p></p> Property Rentals
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                  color: "#555",
                }}
              >
                Discover ForRent, your trusted partner in finding the perfect
                property to rent. Whether you're searching for your dream home
                or the ideal rental space, we are here to make it easy and
                hassle-free. Your happiness is our priority, and we’re dedicated
                to helping you find the place that feels like home. Explore
                ForRent today and begin your journey toward the perfect rental
                property!
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      backgroundColor: "#0B5DC7FF",
                      color: "#fff",
                      padding: 2,
                      borderRadius: "8px",
                      height: "120px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      Our Vision
                    </Typography>
                    <Typography textAlign="center">
                      Being the main choice for rentals prioritizing comfort and
                      safety.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      backgroundColor: "#1B2D5AFF",
                      color: "#fff",
                      padding: 2,
                      borderRadius: "8px",
                      height: "120px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      Our Mission
                    </Typography>
                    <Typography textAlign="center">
                      Providing a variety of property options to suit your
                      needs.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: 5,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      px: 20,
                      py: 1,
                      fontSize: "1.2rem",
                      mb: 3,
                      backgroundColor: "#083775",
                      "&:hover": { backgroundColor: "#7E9BEBFF" },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Get Started
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>

        
        </Grid>
      </Container>
    </Box>
  );
};

export default Landingpage;
