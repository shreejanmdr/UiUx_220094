

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Divider,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUserApi } from "../../apis/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved email if "Remember Me" was checked
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validate = () => {
    let isValid = true;

    if (email.trim() === "" || !email.includes("@")) {
      setEmailError("Email is empty or invalid");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is empty");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    const data = { email, password };

    loginUserApi(data)
      .then((res) => {
        setLoading(false);
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.userData));

          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }

          navigate(res.data.userData.isAdmin ? "/admin/dashboard" : "/homepage");
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Login failed");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        padding: 2,
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
            maxWidth: 900,
            width: "100%",
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              flex: 1,
              background: "linear-gradient(135deg, #1976d2, #083775)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Welcome Back!
            </Typography>
            <motion.img
              src="/assets/images/login.png"
              alt="Login Illustration"
              style={{ width: "80%", maxWidth: 300 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <Typography
              variant="body1"
              sx={{ textAlign: "center", mt: 2, fontSize: "1rem" }}
            >
              Explore the easiest way to find your dream rental. Log in to
              continue.
            </Typography>
          </Box>

          {/* Right Section */}
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
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 2,
                textAlign: "center",
                color: "#083775",
              }}
            >
              Login to Your Account
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                error={!!emailError}
                helperText={emailError}
                InputProps={{
                  style: { borderRadius: "30px" },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  style: { borderRadius: "30px" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember Me"
                sx={{ mt: 1 }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  borderRadius: "30px",
                  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                  "&:hover": { background: "#2575fc" },
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
            <Typography
              textAlign="right"
              sx={{ mt: 1, color: "gray", fontSize: "0.9rem" }}
            >
              <a
                href="/forgot_password"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Forgot your password?
              </a>
            </Typography>
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
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                textAlign: "center",
                color: "gray",
              }}
            >
              Don't have an account?{" "}
              <a
                href="/register"
                style={{
                  color: "#6a11cb",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </a>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;
