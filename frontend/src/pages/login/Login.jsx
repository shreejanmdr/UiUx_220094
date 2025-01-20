import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
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

  const validation = () => {
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

    if (!validation()) {
      return;
    }

    setLoading(true);
    const data = {
      email,
      password,
    };

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

          if (res.data.userData.isAdmin) {
            window.location.href = "/admin/dashboard";
          } else {
            window.location.href = "/homepage";
          }
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
      className="login-container"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
      }}
    >
      <Paper
        className="login-box"
        elevation={6}
        style={{
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
          borderRadius: "16px",
          width: "900px",
        }}
      >
        <Box
          className="login-form"
          sx={{
            flex: 1,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "#fff",
          }}
        >
          <Typography variant="h4" textAlign="center" gutterBottom>
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleLogin}
          >
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
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"} // Dynamically change input type
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
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
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
              sx={{ mt: 2 }}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>

            <Typography textAlign="right" color="textSecondary">
              <a href="/forgot_password" style={{ textDecoration: "none", color: "#1976d2" }}>
                Forgot your password?
              </a>
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }}>or</Divider>
          <Box
            className="social-login-container"
            display="flex"
            justifyContent="center"
            gap={2}
          >
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

          <Typography textAlign="center" mt={3} color="textSecondary">
            Don’t have an account?{" "}
            <a
              href="/register"
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Sign Up
            </a>
          </Typography>
        </Box>
        <Box
          className="welcome-text"
          sx={{
            flex: 1,
            background: "linear-gradient(135deg, #1976d2, #083775)",
            color: "#fff",
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            WELCOME BACK!
          </Typography>
          <img
            src="/assets/images/loginpage.png"
            alt="Welcome"
            style={{ maxWidth: "80%", margin: "auto" }}
          />
          <Typography mt={2}>
            Hey there, please login to your account to continue Estate Ease!
            Always remember us if you're finding a home.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
