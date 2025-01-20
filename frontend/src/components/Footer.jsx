import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from '@mui/material';
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaCopyright,
} from 'react-icons/fa';
import { FaAnglesRight } from 'react-icons/fa6';

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#f5f5f5', py: 4 }}>
      <Container>
        <Grid container spacing={4}>
          {/* Logo Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <img
                src='/assets/images/logo1.png'
                alt='Logo'
                style={{ width: '100%', maxWidth: '150px' }}
              />
            </Box>
          </Grid>

          {/* Useful Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Useful Links
            </Typography>
            <Box>
              <Link href="/homepage" underline="hover" color="textPrimary" display="block">
                <FaAnglesRight color='#083775' /> Home
              </Link>
              <Link href="/about/us" underline="hover" color="textPrimary" display="block">
                <FaAnglesRight color='#083775' /> About Us
              </Link>
              <Link href="/contact_us" underline="hover" color="textPrimary" display="block">
                <FaAnglesRight color='#083775' /> Contact Us
              </Link>
              <Link href="/terms_condition" underline="hover" color="textPrimary" display="block">
                <FaAnglesRight color='#083775' /> Terms and Conditions
              </Link>
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="#" color="primary" size="large">
                <FaFacebook />
              </IconButton>
              <IconButton href="#" color="primary" size="large">
                <FaLinkedin />
              </IconButton>
              <IconButton href="#" color="primary" size="large">
                <FaGithub />
              </IconButton>
            </Box>
          </Grid>

          {/* Address Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Address
            </Typography>
            <Box>
              <Typography display="flex" alignItems="center" gutterBottom>
                <FaLocationDot color='#083775' style={{ marginRight: '8px' }} /> Maitidevi, Kathmandu, Nepal
              </Typography>
              <Typography display="flex" alignItems="center" gutterBottom>
                <FaPhone color='#083775' style={{ marginRight: '8px' }} /> +977 9876541230
              </Typography>
              <Typography display="flex" alignItems="center">
                <FaEnvelope color='#083775' style={{ marginRight: '8px' }} /> ForRent@gmail.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Copyright Section */}
      <Box sx={{ backgroundColor: '#083775', color: '#fff', py: 0.5, textAlign: 'center', mt: 1}}>
        <Typography>
          <FaCopyright style={{ marginRight: '4px',marginLeft: '4px',marginBottom: '2px' }} /> 2024 ForRent. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
