"use client";
import { useAuth } from "../../contexts/AuthContext";
import {
  Box,
  Button,
  Container,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1rem 2rem",
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e0e0e0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <span
          style={{
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "#1976d2",
            letterSpacing: "1px",
          }}
        >
          🌍 Worldwise
        </span>
      </Link>

      {user ? (
        // Logged in user navigation
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            component={Link}
            href="/feed"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            📱 Feed
          </Button>
          <Button
            component={Link}
            href="/create-trip"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            ✈️ Plan Trip
          </Button>
          <Button
            component={Link}
            href="/explore"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            🗺️ Explore
          </Button>
          <Button
            component={Link}
            href="/friends"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            👥 Friends
          </Button>
          <Button
            component={Link}
            href="/dashboard"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            📊 Dashboard
          </Button>

          {/* User profile menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              src={user.avatar}
              alt={user.fullName}
              sx={{ width: 40, height: 40, cursor: "pointer" }}
              onClick={handleMenuOpen}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                component={Link}
                href={`/profile/${user.id}`}
                onClick={handleMenuClose}
              >
                👤 My Profile
              </MenuItem>
              <MenuItem
                component={Link}
                href="/dashboard"
                onClick={handleMenuClose}
              >
                📊 My Trips
              </MenuItem>
              <MenuItem onClick={handleLogout}>🚪 Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      ) : (
        // Guest user navigation
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            component={Link}
            href="/explore"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            🗺️ Explore
          </Button>
          <Button
            component={Link}
            href="/auth/login"
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          >
            🔑 Login
          </Button>
          <Button
            component={Link}
            href="/auth/signup"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            ✨ Sign Up
          </Button>
        </Box>
      )}
    </header>
  );
}
