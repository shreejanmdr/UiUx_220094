import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, TextField, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { toast } from 'react-toastify';
import { createPropertyApi, deleteProperty, getAllBookings, getAllProperty } from '../../apis/Api';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [listedPropertiesCount, setListedPropertiesCount] = useState(0);
  const [deletedPropertiesCount, setDeletedPropertiesCount] = useState(0);
  const [bookedPropertiesCount, setBookedPropertiesCount] = useState(0);
  const [propertyTitle, setPropertyTitle] = useState('');
  const [propertyPrice, setPropertyPrice] = useState('');
  const [propertyCategory, setPropertyCategory] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [propertyImage, setPropertyImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editPropertyId, setEditPropertyId] = useState(null);

  useEffect(() => {
    getAllProperty()
      .then((res) => {
        if (res.data && res.data.Property) {
          setProperties(res.data.Property);
          setListedPropertiesCount(res.data.Property.length);
        } else {
          console.error('Invalid response structure:', res);
          toast.error('Failed to load properties.');
        }
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
        toast.error('Error fetching properties.');
      });

    getAllBookings()
      .then((res) => {
        if (res.data && res.data.data) {
          setBookedPropertiesCount(res.data.data.length);
        } else {
          console.error('Invalid bookings response structure:', res);
          toast.error('Failed to load bookings.');
        }
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
        toast.error('Error fetching bookings.');
      });
  }, []);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setPropertyImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('propertyTitle', propertyTitle);
    formData.append('propertyPrice', propertyPrice);
    formData.append('propertyCategory', propertyCategory);
    formData.append('propertyLocation', propertyLocation);
    formData.append('propertyImage', propertyImage);
    formData.append('propertyDescription', propertyDescription);

    if (editPropertyId) {
      // Update existing property API call
      toast.info('Edit functionality not implemented yet.');
    } else {
      createPropertyApi(formData)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            window.location.reload();
          }
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || 'Something went wrong!');
        });
    }
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm('Are you sure you want to delete this property?');
    if (confirmDialog) {
      deleteProperty(id)
        .then((res) => {
          if (res.status === 201) {
            toast.success(res.data.message);
            setDeletedPropertiesCount(deletedPropertiesCount + 1);
            setListedPropertiesCount(listedPropertiesCount - 1);
            setProperties(properties.filter((property) => property._id !== id));
          }
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || 'Error deleting property.');
        });
    }
  };

  const handleOpenDialog = (property = null) => {
    if (property) {
      setEditPropertyId(property._id);
      setPropertyTitle(property.propertyTitle);
      setPropertyPrice(property.propertyPrice);
      setPropertyCategory(property.propertyCategory);
      setPropertyLocation(property.propertyLocation);
      setPropertyDescription(property.propertyDescription);
      setPreviewImage(`http://localhost:5000/property/${property.propertyImage}`);
    } else {
      setEditPropertyId(null);
      setPropertyTitle('');
      setPropertyPrice('');
      setPropertyCategory('');
      setPropertyLocation('');
      setPropertyDescription('');
      setPreviewImage('');
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditPropertyId(null);
  };

  return (
    <Container>
      

      <Grid container spacing={4} sx={{ mb: 4 ,mt: 1 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Properties Listed</Typography>
              <Typography variant="h4" color="primary">{listedPropertiesCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Properties Booked</Typography>
              <Typography variant="h4" color="success">{bookedPropertiesCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Properties Sold</Typography>
              <Typography variant="h4" color="warning">{deletedPropertiesCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 4, bgcolor: '#1976d2', color: '#fff', '&:hover': { bgcolor: '#155a9c' } }}
        onClick={() => handleOpenDialog()}
      >
        Post Property
      </Button>

      <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Image</TableCell>
              <TableCell sx={{ color: '#fff' }}>Title</TableCell>
              <TableCell sx={{ color: '#fff' }}>Price</TableCell>
              <TableCell sx={{ color: '#fff' }}>Category</TableCell>
              <TableCell sx={{ color: '#fff' }}>Description</TableCell>
              <TableCell sx={{ color: '#fff' }}>Location</TableCell>
              <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property._id} hover>
                <TableCell>
                  <img src={`http://localhost:5000/property/${property.propertyImage}`} alt="" style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
                </TableCell>
                <TableCell>{property.propertyTitle}</TableCell>
                <TableCell>{property.propertyPrice}</TableCell>
                <TableCell>{property.propertyCategory}</TableCell>
                <TableCell>{property.propertyDescription}</TableCell>
                <TableCell>{property.propertyLocation}</TableCell>
                <TableCell>
                  <Link to={`/admin/dashboard/update/${property._id}`} style={{ textDecoration: 'none' }}>
                    <Button  color="primary" startIcon={<EditIcon />}></Button>
                  </Link>
                  <IconButton color="error" onClick={() => handleDelete(property._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editPropertyId ? 'Edit Property' : 'Post New Property'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Property Title"
              fullWidth
              required
              value={propertyTitle}
              onChange={(e) => setPropertyTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Property Price"
              fullWidth
              required
              type="number"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Property Category"
              fullWidth
              required
              value={propertyCategory}
              onChange={(e) => setPropertyCategory(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Property Location"
              fullWidth
              required
              value={propertyLocation}
              onChange={(e) => setPropertyLocation(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Property Description"
              fullWidth
              required
              multiline
              rows={4}
              value={propertyDescription}
              onChange={(e) => setPropertyDescription(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mb: 2, bgcolor: '#1976d2', color: '#fff', '&:hover': { bgcolor: '#155a9c' } }}
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImage}
              />
            </Button>
            {previewImage && (
              <Box sx={{ mb: 2 }}>
                <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
              </Box>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
