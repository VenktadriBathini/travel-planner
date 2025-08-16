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

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // For demo purposes, we'll check against demo users or use a simple validation
      // In a real app, this would validate against your backend

      // Check if user exists in demo users
      const demoUsers = JSON.parse(localStorage.getItem("demoUsers") || "[]");
      const user = demoUsers.find((u) => u.email === formData.email);

      if (user && user.password === formData.password) {
        // Store current user session
        localStorage.setItem("currentUser", JSON.stringify(user));
        login(user); // Use the auth context
        setSuccess(true);
        setTimeout(() => {
          router.push("/feed");
        }, 2000);
      } else {
        // For demo purposes, allow login with any email/password combination
        // In real app, this would be proper authentication
        const demoUser = {
          id: `demo_${Date.now()}`,
          username: formData.email.split("@")[0],
          fullName: "Demo User",
          email: formData.email,
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          coverPhoto:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
          bio: "Demo travel enthusiast! 🌍✈️",
          location: "Demo City",
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

        localStorage.setItem("currentUser", JSON.stringify(demoUser));
        login(demoUser); // Use the auth context
        setSuccess(true);
        setTimeout(() => {
          router.push("/feed");
        }, 2000);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
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
            Welcome Back
          </Typography>
          <Box component="form" onSubmit={handleLogin}>
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
              {loading ? "Logging In..." : "Login"}
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
            Don&apos;t have an account?{" "}
            <MuiLink
              component={Link}
              href="/auth/signup"
              sx={{
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign Up
            </MuiLink>
          </Typography>
        </Paper>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Login successful! Redirecting to feed..."
      />
    </Box>
  );
}
