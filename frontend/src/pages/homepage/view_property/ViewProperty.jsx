import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Paper,
  Divider,
  Avatar,
  CircularProgress,
  Stack,
  IconButton,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Book as BookIcon,
  Close as CloseIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { createBooking, getSingleProperty, getUserProfileApi, getReviewsApi, addReviewApi } from '../../../apis/Api';
import { toast } from 'react-toastify';
import ContactUs from '../../contactUs/ContactUs';
import { FaPhone, FaPhoneAlt } from 'react-icons/fa';

const ViewProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  });
  const [minDate, setMinDate] = useState('');
  const [minTime, setMinTime] = useState('');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(1);
  const [averageRating, setAverageRating] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [propertyRes, userRes, reviewsRes] = await Promise.all([
          getSingleProperty(id),
          getUserProfileApi(),
          getReviewsApi(id),
        ]);

        setProperty(propertyRes.data.property);
        const { firstName, lastName, email, phone } = userRes.data;
        setBookingForm((prev) => ({
          ...prev,
          name: `${firstName} ${lastName}`,
          email,
          phone,
        }));
        setReviews(reviewsRes.data.reviews);
        calculateAverageRating(reviewsRes.data.reviews);
      } catch (error) {
        toast.error('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const now = new Date();
    setMinDate(now.toISOString().split('T')[0]);
    setMinTime(now.toTimeString().slice(0, 5));
  }, [id]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      setAverageRating(0);
      return;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    setAverageRating(totalRating / reviews.length);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        userId: user._id,
        propertyId: id,
        date: bookingForm.date,
        time: bookingForm.time,
      };
      await createBooking(bookingData);
      setShowBookingModal(false);
      toast.success('Booking created successfully!');
      setBookingForm({ name: '', email: '', phone: '', date: '', time: '' });
    } catch (error) {
      toast.error('Booking creation failed!');
    }
  };

  const submitReview = async () => {
    if (!rating || !newReview) {
      toast.error('Please provide both rating and comment');
      return;
    }

    try {
      const res = await addReviewApi({ propertyId: id, rating, comment: newReview });
      toast.success(res.data.message);
      const updatedReviews = await getReviewsApi(id);
      setReviews(updatedReviews.data.reviews);
      calculateAverageRating(updatedReviews.data.reviews);
      setRating(1);
      setNewReview('');
    } catch (err) {
      toast.error('Failed to submit review');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!property) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography variant="h6">Property not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 10, px: 5, bgcolor: '#f0f4f8', minHeight: '100vh' }}>
      <Grid container spacing={4}>
        {/* Property Image and Basic Info */}
        <Grid item xs={12} md={8}>
          <Card elevation={4} sx={{ borderRadius: 3 }}>
            <CardMedia
              component="img"
              height="400"
              image={`http://localhost:5000/property/${property.propertyImage}`}
              alt={property.propertyTitle}
              sx={{ objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#0778e9' }}>
                {property.propertyTitle}
              </Typography>
              <Typography variant="h5" color="083775"  gutterBottom>
                Rs {property.propertyPrice.toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ color: '#555' }}>
                {property.propertyDescription}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                <LocationIcon color="primary" />
                <Typography variant="body1">{property.propertyLocation}</Typography>
              </Stack>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Box mt={4}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" gutterBottom>
                <Stack direction="row" spacing={1} alignItems="center">
                  <span style={{ fontWeight: 'bold' }}>Customer Reviews</span>
                </Stack>
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mb={3}>
                <Rating value={averageRating} precision={0.5} readOnly />
                <Typography>({averageRating.toFixed(1)})</Typography>
              </Box>

              {/* Review List */}
              <Stack spacing={2}>
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <Paper key={index} elevation={2} sx={{ p: 2, borderRadius: 3 }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {review.userId?.firstName?.[0] || 'U'}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {review.userId?.firstName || 'Unknown'} {review.userId?.lastName || ''}
                          </Typography>
                          <Rating value={review.rating} size="small" readOnly />
                        </Box>
                      </Stack>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {review.comment || 'No comment provided.'}
                      </Typography>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="body1">No reviews yet.</Typography>
                )}
              </Stack>

              {/* Add Review Section */}
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EditIcon color="primary" />
                    <span style={{ fontWeight: 'bold' }}>Add a Review</span>
                  </Stack>
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    multiline
                    rows={4}
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write your review here"
                    fullWidth
                  />
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography > 
                    <span style={{ fontWeight: 'bold' }}>Rating :</span></Typography>
                    <Rating value={rating} onChange={(_, newValue) => setRating(newValue)} />
                  </Box>
                  <Button
                    variant="contained"
                    onClick={submitReview}
                    sx={{ bgcolor: '#083775', '&:hover': { bgcolor: '#0D76F6FF' } }}
                    startIcon={<EditIcon />}
                  >
                    Submit Review
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Box>
        </Grid>

        {/* Property Details Card */}
        <Grid item xs={12} md={4}>
          <Card elevation={4} sx={{ borderRadius: 3, bgcolor: '#fff' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Property Details
              </Typography>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarIcon color="primary" />
                  <Typography>Added: {new Date(property.createdAt).toLocaleDateString()}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <VisibilityIcon color="primary" />
                  <Typography>Views: {property.views}</Typography>
                </Box>
                <Divider />
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<PhoneIcon />}
                    onClick={() => setShowCallModal(true)}
                    fullWidth
                    sx={{ bgcolor: 'success.main', '&:hover': { bgcolor: 'success.dark' } }}
                  >
                    Call
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<BookIcon />}
                    onClick={() => setShowBookingModal(true)}
                    fullWidth
                    sx={{ bgcolor: '#083775', '&:hover': { bgcolor: '#062c59' } }}
                  >
                    Book
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Contact Us Section */}
          <Box mt={4}>
            <ContactUs />
          </Box>
        </Grid>
      </Grid>

      {/* Call and Booking Modals */}
      {/* Call Modal */}
      <Dialog open={showCallModal} onClose={() => setShowCallModal(false)}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Contact Information</Typography>
            <IconButton onClick={() => setShowCallModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h5" align="center" gutterBottom>
            <FaPhoneAlt color="primary" /> 
            +977 9876543210
          </Typography>
          <Typography align="center">Make a call to book this property now.</Typography>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onClose={() => setShowBookingModal(false)}>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Book Property</Typography>
            <IconButton onClick={() => setShowBookingModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleBookingSubmit} sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <TextField
                label="Name"
                value={bookingForm.name}
                onChange={(e) => setBookingForm((prev) => ({ ...prev, name: e.target.value }))}
                fullWidth
                required
              />
              <TextField
                label="Email"
                type="email"
                value={bookingForm.email}
                onChange={(e) => setBookingForm((prev) => ({ ...prev, email: e.target.value }))}
                fullWidth
                required
              />
              <TextField
                label="Phone"
                type="tel"
                value={bookingForm.phone}
                onChange={(e) => setBookingForm((prev) => ({ ...prev, phone: e.target.value }))}
                fullWidth
                required
              />
              <TextField
                label="Preferred Date"
                type="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm((prev) => ({ ...prev, date: e.target.value }))}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: minDate }}
                fullWidth
                required
              />
              <TextField
                label="Preferred Time"
                type="time"
                value={bookingForm.time}
                onChange={(e) => setBookingForm((prev) => ({ ...prev, time: e.target.value }))}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: minTime }}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#083775', '&:hover': { bgcolor: '#062c59' } }}>
                Submit Booking
              </Button>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ViewProperty;
