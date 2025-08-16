"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link as MuiLink,
  Paper,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Create new user object
      const newUser = {
        id: `user_${Date.now()}`,
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password, // In real app, this would be hashed
        avatar: `https://images.unsplash.com/photo-${Math.floor(
          Math.random() * 1000000
        )}?w=150&h=150&fit=crop&crop=face`,
        coverPhoto: `https://images.unsplash.com/photo-${Math.floor(
          Math.random() * 1000000
        )}?w=1200&h=400&fit=crop`,
        bio: "New travel enthusiast! 🌍✈️",
        location: "Unknown",
        website: "",
        socialMedia: {
          instagram: "",
          facebook: "",
          twitter: "",
        },
        followers: 0,
        following: 0,
        totalTrips: 0,
        totalPhotos: 0,
        memberSince: new Date().toISOString().split("T")[0],
        stats: {
          countriesVisited: 0,
          citiesExplored: 0,
          totalDistance: "0 km",
          averageTripDuration: "0 days",
          totalSpent: "$0",
        },
      };

      // Store user in localStorage for demo purposes
      const existingUsers = JSON.parse(
        localStorage.getItem("demoUsers") || "[]"
      );
      existingUsers.push(newUser);
      localStorage.setItem("demoUsers", JSON.stringify(existingUsers));

      // Also store current user session and login
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      login(newUser); // Use the auth context

      setSuccess(true);
      setTimeout(() => {
        router.push("/feed");
      }, 2000);
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 6,
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(2px)",
            borderRadius: 4,
            textAlign: "center",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            fontWeight={700}
            sx={{
              background: "linear-gradient(45deg, #1976d2, #ff9800)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 4,
            }}
          >
            Join Us
          </Typography>
          <Box component="form" onSubmit={handleSignup}>
            <TextField
              name="username"
              label="Username"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            />
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              margin="normal"
              value={formData.fullName}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Button
            component={Link}
            href="/dashboard?demo=true"
            variant="outlined"
            fullWidth
            sx={{
              mb: 3,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              borderColor: "#ff9800",
              color: "#ff9800",
              "&:hover": {
                borderColor: "#f57c00",
                backgroundColor: "rgba(255, 152, 0, 0.04)",
              },
            }}
          >
            🚀 Try Demo Mode
          </Button>

          <Typography align="center" sx={{ mt: 3 }}>
            Already have an account?{" "}
            <MuiLink
              component={Link}
              href="/auth/login"
              sx={{
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Login
            </MuiLink>
          </Typography>
        </Paper>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Account created successfully! Redirecting to feed..."
      />
    </Box>
  );
}
