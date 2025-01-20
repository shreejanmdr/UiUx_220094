// import React from 'react'
// import './Aboutus.css'

// const Aboutus = () => {
//   return (
//     <>
//     <div className='pt-5'>
//         <div className='heading'>
//             <h1>About Us</h1>
//             <p>A real estate management system, to make you find your desired property easier.</p>
//         </div>
//         <div className='container'>
//             <section className='about'>
//                 <div className='about-image'>
//                     <img src='/assets/images/register.png'></img>
//                 </div>
//                 <div className='about-content'>
//                     <h2 style={{color: '#083775'}}>Welcome to Estate Ease!</h2>
//                     <p>At our real estate management company, we are committed to offering our clients a diverse range of the latest and most innovative property solutions. Our journey has been extensive, giving us the expertise to provide you with premium quality services that are both efficient and cost-effective.</p>
//                 </div>
//             </section>
//         </div>
//     </div>
//     </>
//   )
// }

// export default Aboutus


import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import './Aboutus.css';

const Aboutus = () => {
  return (
    <Box pt={5} bgcolor="#f4f4f4" pb={5}>
      {/* Heading Section */}
      <Box textAlign="center" mb={4}>
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
