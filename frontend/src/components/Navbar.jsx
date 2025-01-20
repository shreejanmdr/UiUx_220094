import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  Badge,
  Container,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Home as HomeIcon,
  BookOnline as BookIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const user = (() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== "undefined") {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse user data:", e);
        return null;
      }
    }
    return null;
  })();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate("/login");
    window.dispatchEvent(new Event('storage'));
    handleMenuClose();
  };

  const navButtonStyle = {
    color: '#083775',
    '&:hover': {
      backgroundColor: 'rgba(8, 55, 117, 0.04)',
    },
    fontSize: { xs: '0.875rem', sm: '1rem' },
    padding: { xs: '6px 12px', sm: '8px 16px' }
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: '#D9E2EE' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ flexGrow: 0 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                component="img"
                src="/assets/images/logo1.png"
                alt="Logo"
                sx={{ 
                  width: { xs: 90, sm: 110 },
                  display: { xs: 'none', md: 'flex' }
                }}
              />
            </Link>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ 
              display: { md: 'none' }, 
              ml: 'auto',
              color: '#083775'
            }}
            onClick={handleMobileMenuToggle}
            edge="start"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Navigation */}
          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' }, 
            justifyContent: 'flex-end',
            gap: { md: 1, lg: 2 },
            mr: 2
          }}>
            <Button
              component={Link}
              to="/homepage"
              startIcon={<HomeIcon />}
              sx={navButtonStyle}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/my_bookings"
              startIcon={<BookIcon />}
              sx={navButtonStyle}
            >
              My Bookings
            </Button>
            <Button
              component={Link}
              to="/wishlist"
              startIcon={
                <Badge badgeContent={0} color="error">
                  <FavoriteIcon />
                </Badge>
              }
              sx={navButtonStyle}
            >
              Wishlist
            </Button>
          </Box>

          {/* User Section */}
          <Box sx={{ flexShrink: 0 }}>
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  onClick={handleProfileMenuOpen}
                  sx={{
                    ...navButtonStyle,
                    textTransform: 'none'
                  }}
                  startIcon={
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#8B6B42' }}>
                      {user.firstName?.charAt(0)}
                    </Avatar>
                  }
                >
                  {!isMobile && user.firstName}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem 
                    component={Link} 
                    to="/user/profile"
                    sx={{ color: '#083775' }}
                  >
                    <PersonIcon sx={{ mr: 1 }} /> Profile
                  </MenuItem>
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ color: '#083775' }}
                  >
                    <LogoutIcon sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{
                    color: '#083775',
                    borderColor: '#083775',
                    '&:hover': {
                      borderColor: '#083775',
                      backgroundColor: 'rgba(8, 55, 117, 0.04)',
                    },
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{
                    bgcolor: '#083775',
                    '&:hover': { bgcolor: '#083775' },
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Menu */}
      <Box
        sx={{
          display: { xs: mobileMenuOpen ? 'block' : 'none', md: 'none' },
          bgcolor: '#083775',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <MenuItem 
          component={Link} 
          to="/homepage"
          sx={{ color: '#083775' }}
        >
          <HomeIcon sx={{ mr: 1 }} /> Home
        </MenuItem>
        <MenuItem 
          component={Link} 
          to="/my_bookings"
          sx={{ color: '#083775' }}
        >
          <BookIcon sx={{ mr: 1 }} /> My Bookings
        </MenuItem>
        <MenuItem 
          component={Link} 
          to="/wishlist"
          sx={{ color: '#083775' }}
        >
          <FavoriteIcon sx={{ mr: 1 }} /> Wishlist
        </MenuItem>
      </Box>
    </AppBar>
  );
};

export default Navbar;