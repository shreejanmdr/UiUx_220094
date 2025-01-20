import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import './Aboutus.css';

const Aboutus = () => {
  return (
    <Box pt={10} mt={1} bgcolor="##F5F5F5" pb={5}>
      {/* Heading Section */}
      <Box textAlign="center" mb={4} mt={1} >
        <Typography variant="h3" color="primary" gutterBottom style={{ fontWeight: 'bold' }}>
          About Us
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          A real estate management system, designed to make finding your desired property easier and more convenient.
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <CardMedia
                component="img"
                alt="About Us"
                image="/assets/images/register.png"
                style={{ borderRadius: '12px', height: '100%', objectFit: 'cover' }}
              />
            </Card>
          </Grid>

          {/* Content Section */}
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h4" color="primary" gutterBottom style={{ fontWeight: 'bold' }}>
                Welcome to Estate Ease!
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                At our real estate management company, we are committed to offering our clients a diverse range of the latest and most innovative property solutions. Our journey has been extensive, giving us the expertise to provide you with premium quality services that are both efficient and cost-effective.
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Aboutus;
