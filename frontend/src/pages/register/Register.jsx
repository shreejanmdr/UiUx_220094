import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/Api";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let isValid = true;

    if (firstName.trim() === "") {
      setFirstNameError("First name is required!");
      isValid = false;
    }

    if (lastName.trim() === "") {
      setLastNameError("Last name is required!");
      isValid = false;
    }

    if (email.trim() === "") {
      setEmailError("Email is required!");
      isValid = false;
    }

    if (phone.trim() === "") {
      setPhoneError("Phone number is required!");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required!");
      isValid = false;
    }

    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm password is required!");
      isValid = false;
    }

    if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError("Password and confirm password do not match");
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
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "60px",
        minHeight: "80vh",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        padding: 1,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Paper
          elevation={10}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: "16px",
            overflow: "hidden",
            maxWidth: 850,
            width: "100%",
            height: "80%",
          }}
        >
          {/* Left Section - Registration Form */}
          <Box
            sx={{
              flex: 1,
              padding: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 1,
                textAlign: "center",
                color: "#083775",
              }}
            >
              Create Your Account
            </Typography>
            <form onSubmit={handleSubmit} >
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                margin="dense"
                borderRadius= "30px"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setFirstNameError("");
                }}
                error={!!firstNameError}
                helperText={firstNameError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                margin="dense"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setLastNameError("");
                }}
                error={!!lastNameError}
                helperText={lastNameError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                variant="outlined"
                margin="dense"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                error={!!emailError}
                helperText={emailError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                variant="outlined"
                margin="dense"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError("");
                }}
                error={!!phoneError}
                helperText={phoneError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="dense"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                margin="dense"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  borderRadius: "30px",
                  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                  "&:hover": { background: "#2575fc" },
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Register"
                )}
              </Button>
            </form>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="center" gap={1}>
              <Button
                startIcon={<FacebookIcon />}
                variant="outlined"
                color="primary"
                size="small"
              >
                Facebook
              </Button>
              <Button
                startIcon={<GoogleIcon />}
                variant="outlined"
                color="error"
                size="small"
              >
                Google
              </Button>
            </Box>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                textAlign: "center",
                color: "gray",
              }}
            >
              Already have an account?{" "}
              <a
                href="/login"
                style={{
                  color: "#6a11cb",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Login
              </a>
            </Typography>
          </Box>

          {/* Right Section - Illustration */}
          <Box
            sx={{
              flex: 1,
              background: "linear-gradient(135deg, #1976d2, #083775)",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Register Now
            </Typography>
            <motion.img
              src="/assets/images/register.png"
              alt="Register Illustration"
              style={{ maxWidth: "150%", margin: "" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <Typography
              mt={2}
              textAlign="center"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Join us to find your dream home.<p></p> Create an account now!
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Register;
