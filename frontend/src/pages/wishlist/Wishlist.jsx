import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from '@mui/material';
import { FaAd, FaBook, FaBookOpen, FaHouseUser, FaTrash } from 'react-icons/fa';
import { MdLocationOn } from "react-icons/md";
import { toast } from 'react-toastify';
import { createBooking, getUserProfileApi, getUserWishlistApi, removeFromWishlistApi } from '../../apis/Api';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: ''
  });
  const [minDate, setMinDate] = useState('');
  const [minTime, setMinTime] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await getUserWishlistApi();
      if (Array.isArray(res.data.data)) {
        setWishlist(res.data.data);
      } else {
        throw new Error('Wishlist data is not an array');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching wishlist');
    }
  };

  const handleRemove = async (propertyId) => {
    const confirmDialog = window.confirm("Are you sure you want to remove this property from your wishlist?");
    if (!confirmDialog) return;

    try {
      await removeFromWishlistApi(propertyId);
      toast.success('Property removed from wishlist');
      fetchWishlist();
    } catch (err) {
      setError(err.response?.data?.message || 'Error removing property from wishlist');
      toast.error('Error removing property from wishlist');
    }
  };

  const handleBookClick = async (property) => {
    try {
      const res = await getUserProfileApi();
      const { firstName, lastName, email, phone } = res.data;
      setBookingForm({
        name: `${firstName} ${lastName}`,
        email: email,
        phone: phone,
        date: '',
        time: ''
      });
      const now = new Date();
      setMinDate(now.toISOString().split('T')[0]);
      setMinTime(now.toTimeString().slice(0, 5));
      setSelectedProperty(property);
      setShowBookingModal(true);
    } catch (error) {
      console.log('Error fetching user profile:', error);
    }
  };

  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));

    if (name === 'date') {
      const selectedDate = new Date(value);
      const currentDate = new Date(minDate);
      setMinTime(selectedDate.toDateString() === currentDate.toDateString() ? currentDate.toTimeString().slice(0, 5) : '00:00');
      setBookingForm(prevForm => ({ ...prevForm, time: '' }));
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const bookingData = {
      userId: user._id,
      propertyId: selectedProperty._id,
      date: bookingForm.date,
      time: bookingForm.time
    };

    try {
      const res = await createBooking(bookingData);
      console.log('Booking created:', res.data);
      setBookingForm({ name: '', email: '', phone: '', date: '', time: '' });
      setShowBookingModal(false);
      toast.success('Booking created successfully!');
    } catch (error) {
      console.error('Booking creation error:', error.response ? error.response.data : error.message);
      toast.error('Booking creation failed!');
    }
  };

  return (
    <Container sx={{ marginTop: 10, marginBottom: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#083775' }}>
        My Wishlist
      </Typography>
      {error && <Typography color="error" textAlign="center">{error}</Typography>}
      {wishlist.length === 0 ? (
        <Typography textAlign="center" sx={{ fontStyle: 'italic', marginTop: 3 }}>
          Your wishlist is empty.
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {wishlist.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5000/property/${property.propertyImage}`}
                  alt={property.propertyTitle}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0778e9'}}>
                    {property.propertyTitle}
                  </Typography>
                  <Typography color="error" variant="body1" sx={{ fontWeight: 'bold',color: '#333' }}>
                    Rs {property.propertyPrice}
                  </Typography>
                  
                  <Typography variant="body2" color="textSecondary">
                  <MdLocationOn className="location-icon" />
                    {property.propertyLocation}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    startIcon={<FaHouseUser />}
                    onClick={() => handleBookClick(property)}
                    sx={{
                      backgroundColor: '#083775',
                      color: 'white',
                      width: '100%',
                      '&:hover': { backgroundColor: '#257CE8FF' },
                    }}
                  >
                    Book Property
                  </Button>
                  <IconButton
                    onClick={() => handleRemove(property._id)}
                    color="error"
                  >
                    <FaTrash />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={showBookingModal} onClose={() => setShowBookingModal(false)}>
        <DialogTitle sx={{ backgroundColor: '#083775', color: 'white' }}>Book Property</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleBookingSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={bookingForm.name}
              onChange={handleBookingFormChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              value={bookingForm.email}
              onChange={handleBookingFormChange}
              fullWidth
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={bookingForm.phone}
              onChange={handleBookingFormChange}
              fullWidth
              required
            />
            <TextField
              label="Preferred Date"
              name="date"
              type="date"
              value={bookingForm.date}
              onChange={handleBookingFormChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: minDate }}
            />
            <TextField
              label="Preferred Time"
              name="time"
              type="time"
              value={bookingForm.time}
              onChange={handleBookingFormChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: minTime }}
            />
            <DialogActions>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#083775', color: 'white', '&:hover': { backgroundColor: '#062c59' } }}>
                Book Now
              </Button>
              <Button onClick={() => setShowBookingModal(false)} sx={{ color: '#083775' }}>Cancel</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Wishlist;
