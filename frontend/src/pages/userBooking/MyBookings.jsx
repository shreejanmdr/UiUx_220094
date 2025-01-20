import React, { useEffect, useState } from 'react';
import { 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Chip,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Payment, AccessTime, CalendarMonth, Close } from '@mui/icons-material';
import { getUserBookings, updatePaymentMethod } from '../../apis/Api';
import { toast } from 'react-toastify';
import KhaltiCheckout from "khalti-checkout-web";
import config from '../../components/KhaltiConfig';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
}));

const StyledChip = styled(Chip)(({ status, theme }) => ({
  fontWeight: 'bold',
  backgroundColor: 
    status === 'pending' ? theme.palette.warning.light :
    status === 'approved' ? theme.palette.success.light :
    status === 'rejected' ? theme.palette.error.light :
    theme.palette.grey[300],
  color: 
    status === 'pending' ? theme.palette.warning.dark :
    status === 'approved' ? theme.palette.success.dark :
    status === 'rejected' ? theme.palette.error.dark :
    theme.palette.grey[900],
}));

const PaymentButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 200,
  padding: theme.spacing(1.5),
  '&.pay-arrival': {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  '&.khalti': {
    backgroundColor: '#5C2D91',
    color: 'white',
    '&:hover': {
      backgroundColor: '#4A2275',
    },
  },
}));

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getUserBookings();
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

  const handleProceedToPayment = (booking) => {
    setSelectedBooking(booking);
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedBooking(null);
  };

  const handlePaymentMethod = async (method) => {
    try {
      await updatePaymentMethod({ bookingId: selectedBooking._id, paymentMethod: method });
      setShowPaymentModal(false);
      toast.success('Payment method updated! Waiting for booking approval.');
      const updatedBookings = bookings.map((booking) =>
        booking._id === selectedBooking._id ? { ...booking, paymentMethod: method } : booking
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error('Error updating payment method:', error);
      toast.error('Error updating payment method');
    }
  };

  const handleKhaltiPayment = () => {
    let checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 150 });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!bookings.length) {
    return (
      <Card className="mt-4">
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" py={4}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No bookings available
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Your booking history will appear here once you make a reservation.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom component="h1" textAlign="center" color="primary">
        My Bookings
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Property</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Payment</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id} hover>
                <TableCell>{booking.property?.propertyTitle}</TableCell>
                <TableCell align="center">
                  <Avatar
                    src={`http://localhost:5000/property/${booking.property?.propertyImage}`}
                    alt={booking.property?.propertyTitle}
                    sx={{ width: 64, height: 64, margin: 'auto' }}
                    variant="rounded"
                  />
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <CalendarMonth fontSize="small" />
                    {new Date(booking.date).toLocaleDateString()}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <AccessTime fontSize="small" />
                    {booking.time}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <StyledChip
                    label={booking.status}
                    status={booking.status.toLowerCase()}
                  />
                </TableCell>
                <TableCell align="center">
                  {booking.paymentMethod ? (
                    <Chip
                      icon={<Payment />}
                      label={booking.paymentMethod}
                      color="primary"
                      variant="outlined"
                    />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleProceedToPayment(booking)}
                      startIcon={<Payment />}
                    >
                      Pay Now
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={showPaymentModal}
        onClose={handleClosePaymentModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Select Payment Method</Typography>
            <Button
              onClick={handleClosePaymentModal}
              color="inherit"
              size="small"
              startIcon={<Close />}
            >
              Close
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} py={2}>
            <PaymentButton
              variant="contained"
              className="pay-arrival"
              onClick={() => handlePaymentMethod('Pay on arrival')}
              fullWidth
            >
              Pay on Arrival
            </PaymentButton>
            <PaymentButton
              variant="contained"
              className="khalti"
              onClick={handleKhaltiPayment}
              fullWidth
            >
              Pay with Khalti
            </PaymentButton>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Typography variant="caption" color="textSecondary">
            Choose your preferred payment method to complete the booking
          </Typography>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyBookings;