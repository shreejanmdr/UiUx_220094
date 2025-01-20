import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';
import { getAllBookings, updateBookingStatus } from '../../../apis/Api';
import { toast } from 'react-toastify';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getAllBookings();
        console.log(response.data);
        setBookings(response.data.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleApprove = async (bookingId) => {
    try {
      await updateBookingStatus({ bookingId, status: 'approved' });
      const updatedBookings = bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, status: 'approved' } : booking
      );
      setBookings(updatedBookings);
      toast.success('Booking approved successfully!');
    } catch (error) {
      console.error('Error approving booking:', error);
      toast.error('Error updating booking status');
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Booking List
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff' }}>User</TableCell>
                <TableCell sx={{ color: '#fff' }}>Property</TableCell>
                <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                <TableCell sx={{ color: '#fff' }}>Time</TableCell>
                <TableCell sx={{ color: '#fff' }}>Status</TableCell>
                <TableCell sx={{ color: '#fff' }}>Payment Method</TableCell>
                <TableCell sx={{ color: '#fff' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow key={booking._id} hover>
                    <TableCell>{booking.user?.firstName}</TableCell>
                    <TableCell>{booking.property?.propertyTitle}</TableCell>
                    <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                    <TableCell>{booking.time}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color={booking.status === 'approved' ? 'green' : 'orange'}
                      >
                        {booking.status}
                      </Typography>
                    </TableCell>
                    <TableCell>{booking.paymentMethod}</TableCell>
                    <TableCell>
                      {booking.status === 'pending' && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleApprove(booking._id)}
                          sx={{ textTransform: 'none' }}
                        >
                          Approve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No bookings available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default BookingList;
