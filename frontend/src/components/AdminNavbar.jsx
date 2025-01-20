import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button } from '@mui/material';
import { FaBook, FaDoorOpen, FaHome, FaUser, FaUserAlt } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const AdminNavbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#D9E2EE', boxShadow: 'none' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" width="100%">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src="/assets/images/logo.png" alt="Logo" style={{ width: '80px', marginRight: '16px' }} />
          </Link>
          <Typography variant="h4"  mt="5" color="#083775" bold   gutterBottom>Admin Dashboard</Typography>
          <Box flexGrow={1} />
          {user ? (
            <Box ml={2} display="flex" alignItems="center">
              <Box display={{ xs: 'none', md: 'flex' }} mr={2}>
                <Button component={Link} to="/admin/dashboard" sx={{ color: '#083775' }} startIcon={<FaHome />}>
                  My Dashboard
                </Button>
                <Button component={Link} to="/admin/booking_list" sx={{ color: '#083775' }} startIcon={<FaBook />}>
                  Booking List
                </Button>
                <Button component={Link} to="/admin/view_contact" sx={{ color: '#083775' }} startIcon={<FaMessage />}>
                  Contact
                </Button>
              </Box>
              <Button
                onClick={handleMenuOpen}
                variant="contained"
                sx={{ backgroundColor: '#083775', color: 'white' }}
                startIcon={<FaUser />}
              >
                Welcome, {user.firstName}!
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem component={Link} to="/user/profile" onClick={handleMenuClose}>
                  <FaUserAlt style={{ marginRight: '8px' }} /> My Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <FaDoorOpen style={{ marginRight: '8px' }} /> Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box ml={2} display="flex">
              <Button component={Link} to="/login" variant="contained" sx={{ backgroundColor: '#083775', color: 'white', marginRight: '8px' }}>
                Login
              </Button>
              <Button component={Link} to="/register" variant="contained" sx={{ backgroundColor: '#083775', color: 'white' }}>
                Register
              </Button>
            </Box>
          )}
          <Box display={{ xs: 'flex', md: 'none' }}>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
