import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Stack,
  Avatar,
  Divider,
  Container,
} from '@mui/material';
import { getUserProfileApi, updateUserProfileApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const UserProfile = () => {
  // State for storing user details
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Fetch user data from the API on component mount
  useEffect(() => {
    getUserProfileApi()
      .then((res) => {
        setUser(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setPhone(res.data.phone);
      })
      .catch(() => {
        toast.error('Error fetching user data');
      });
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateUserProfileApi({ firstName, lastName, phone, password })
      .then((res) => {
        toast.success('Profile updated successfully');
        setUser(res.data);
        setEditMode(false);
      })
      .catch(() => {
        toast.error('Error updating profile');
      });
  };

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Box textAlign="center" mb={4}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: '#083775',
              fontSize: '2rem',
              margin: 'auto',
            }}
          >
            {user?.firstName?.[0] || 'U'}
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>
            My Profile
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your account details
          </Typography>
        </Box>

        {!editMode ? (
          <Box>
            <Stack spacing={3} divider={<Divider flexItem />}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  First Name
                </Typography>
                <Typography variant="body1">{user.firstName}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Last Name
                </Typography>
                <Typography variant="body1">{user.lastName}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Email
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Phone
                </Typography>
                <Typography variant="body1">{user.phone}</Typography>
              </Box>
            </Stack>
            <Box textAlign="center" mt={4}>
              <Button
                startIcon={<EditIcon />}
                variant="contained"
                onClick={() => setEditMode(true)}
                sx={{ bgcolor: '#083775', '&:hover': { bgcolor: '#062c59' } }}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
        ) : (
          <form onSubmit={handleUpdateProfile}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password (optional)"
                />
              </Grid>
            </Grid>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button
                startIcon={<CancelIcon />}
                variant="outlined"
                onClick={() => setEditMode(false)}
                sx={{ color: '#083775', borderColor: '#083775' }}
              >
                Cancel
              </Button>
              <Button
                startIcon={<SaveIcon />}
                type="submit"
                variant="contained"
                sx={{ bgcolor: '#083775', '&:hover': { bgcolor: '#062c59' } }}
              >
                Save Changes
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default UserProfile;
