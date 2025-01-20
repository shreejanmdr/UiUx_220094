import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { registerUserApi } from '../../apis/Api';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Grid,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let isValid = true;

    if (firstName.trim() === '') {
      setFirstNameError('First name is required!');
      isValid = false;
    }

    if (lastName.trim() === '') {
      setLastNameError('Last name is required!');
      isValid = false;
    }

    if (email.trim() === '') {
      setEmailError('Email is required!');
      isValid = false;
    }

    if (phone.trim() === '') {
      setPhoneError('Phone number is required!');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is required!');
      isValid = false;
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm password is required!');
      isValid = false;
    }

    if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError('Password and confirm password do not match');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const data = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };

    registerUserApi(data)
      .then((res) => {
        setLoading(false);
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response?.status === 400) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <Box
      className="register-container"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f6f9',
        py: 5,
      }}
    >
      <Paper
        className="register-box"
        elevation={6}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          borderRadius: '16px',
          width: { xs: '95%', md: '80%' },
          maxWidth: '1000px',
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6} sx={{ p: 4 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Welcome!
            </Typography>
            <Typography variant="h6" textAlign="center" gutterBottom>
              Let’s create an account!
            </Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                margin="normal"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setFirstNameError('');
                }}
                error={!!firstNameError}
                helperText={firstNameError}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                margin="normal"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setLastNameError('');
                }}
                error={!!lastNameError}
                helperText={lastNameError}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                fullWidth
                label="Phone"
                type="tel"
                variant="outlined"
                margin="normal"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError('');
                }}
                error={!!phoneError}
                helperText={phoneError}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                error={!!passwordError}
                helperText={passwordError}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError('');
                }}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                sx={{ mt: 2, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
              </Button>
            </Box>
            <Divider sx={{ my: 2 }}>or</Divider>
            <Box display="flex" justifyContent="center" gap={2}>
              <Button
                startIcon={<FacebookIcon />}
                variant="outlined"
                color="primary"
              >
                Facebook
              </Button>
              <Button
                startIcon={<GoogleIcon />}
                variant="outlined"
                color="error"
              >
                Google
              </Button>
            </Box>
            <Typography textAlign="center" mt={3}>
              Already have an account? <a href="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>Login</a>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: 'linear-gradient(135deg, #1976d2, #083775)',
              color: '#fff',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Welcome!
            </Typography>
            <img
              src="/assets/images/loginpage.png"
              alt="Register"
              style={{ maxWidth: '80%', margin: 'auto', marginTop: '20px' }}
            />
            <Typography mt={2} textAlign="center">
              Join us to find your dream home. Create an account now!
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Register;
