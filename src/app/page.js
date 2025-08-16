"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAuth } from "../contexts/AuthContext";

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const featureList = [
  {
    title: "Unlimited Places",
    description:
      "Add as many places as you want to your trip, unlike Google Maps.",
    icon: "🌍",
  },
  {
    title: "Smart Route Planning",
    description: "Auto-arrange your route for the best travel experience.",
    icon: "🗺️",
  },
  {
    title: "Cost & Tips",
    description: "Add comments, costs, and tips for each place.",
    icon: "💡",
  },
  {
    title: "Social & Sharing",
    description:
      "Share your trip or places with friends, comment, and request advice.",
    icon: "🤝",
  },
  {
    title: "Map Memories",
    description: "See everywhere you've traveled on a beautiful map.",
    icon: "📍",
  },
];

const sampleTrips = [
  {
    id: 1,
    title: "Florida Adventure",
    description: "A week exploring Orlando, Tampa, Miami, and Key West.",
    places: [
      {
        name: "Orlando",
        activities: ["Disney World", "Universal Studios"],
        cost: "$300/day",
      },
      {
        name: "Tampa",
        activities: ["Busch Gardens", "Tampa Riverwalk"],
        cost: "$200/day",
      },
      {
        name: "Miami",
        activities: ["South Beach", "Wynwood Walls"],
        cost: "$350/day",
      },
      {
        name: "Key West",
        activities: ["Duval Street", "Mallory Square"],
        cost: "$250/day",
      },
    ],
    comments: [
      { user: "Alice", text: "Loved the beaches in Miami!" },
      { user: "Bob", text: "Universal Studios is a must-visit." },
    ],
    photos: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: 2,
    title: "California Coast Adventure",
    description: "A road trip along the stunning Pacific Coast Highway.",
    places: [
      {
        name: "San Francisco",
        activities: ["Golden Gate Bridge", "Alcatraz"],
        cost: "$400/day",
      },
      { 
        name: "Big Sur", 
        activities: ["McWay Falls", "Bixby Bridge"], 
        cost: "$200/day" 
      },
    ],
    comments: [{ user: "Clara", text: "The Pacific Coast is incredible!" }],
    photos: [
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: 3,
    title: "New York City Experience",
    description: "Exploring the Big Apple from Times Square to Central Park.",
    places: [
      {
        name: "Manhattan",
        activities: ["Times Square", "Broadway"],
        cost: "$500/day",
      },
      { 
        name: "Central Park", 
        activities: ["Walking trails", "Bethesda Fountain"], 
        cost: "$0" 
      },
    ],
    comments: [{ user: "Daisuke", text: "Central Park is so peaceful." }],
    photos: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=80",
    ],
  },
];

export default function Home() {
  const { user } = useAuth();
  const globeEl = useRef();
  const [globeReady, setGlobeReady] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim() === "") {
      setResults([]);
      return;
    }
    const q = e.target.value.toLowerCase();
    setResults(
      sampleTrips.filter(
        (trip) =>
          trip.title.toLowerCase().includes(q) ||
          trip.places.some((place) => place.name.toLowerCase().includes(q))
      )
    );
  };

  // Handle globe ready callback
  const handleGlobeReady = useCallback(() => {
    setGlobeReady(true);
  }, []);

  // Animate globe on mount
  useEffect(() => {
    if (globeEl.current && globeReady) {
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 2000);
    }
  }, [globeReady]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        pt: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* Hero Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            mb: 6,
          }}
        >
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              pr: { md: 6 },
            }}
          >
            <Typography
              variant="h2"
              fontWeight={800}
              sx={{
                background: "linear-gradient(90deg, #1976d2 30%, #ff9800 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                letterSpacing: 1,
              }}
            >
              {user ? `Welcome back, ${user.fullName}!` : "Explore the World"}
            </Typography>
            <Typography
              variant="h5"
              color="white"
              fontWeight={500}
              sx={{ mb: 2, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
            >
              {user 
                ? "Ready for your next adventure? Plan trips, share memories, and discover new places with friends."
                : "Save your trips, make memories, and share your adventures. Plan smarter, travel further, and inspire others."
              }
            </Typography>
            <Typography variant="body1" color="#e0e0e0" sx={{ mb: 4 }}>
              {user 
                ? "Search for places and trips, or start planning your next journey."
                : "Search for places and trips others have explored, or start your own journey."
              }
            </Typography>
            
            {!user ? (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mb: 2 }}
              >
                <Button
                  component={Link}
                  href="/auth/login"
                  variant="contained"
                  size="large"
                  sx={{ fontWeight: 700, px: 4 }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  href="/auth/signup"
                  variant="outlined"
                  size="large"
                  sx={{
                    fontWeight: 700,
                    px: 4,
                    color: "white",
                    borderColor: "white",
                    "&:hover": { borderColor: "#ff9800", color: "#ff9800" },
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  component={Link}
                  href="/dashboard?demo=true"
                  variant="text"
                  size="large"
                  sx={{ fontWeight: 700, px: 4, color: "#ff9800" }}
                >
                  Try Demo
                </Button>
              </Stack>
            ) : (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mb: 2 }}
              >
                <Button
                  component={Link}
                  href="/feed"
                  variant="contained"
                  size="large"
                  sx={{ fontWeight: 700, px: 4 }}
                >
                  📱 View Feed
                </Button>
                <Button
                  component={Link}
                  href="/create-trip"
                  variant="outlined"
                  size="large"
                  sx={{
                    fontWeight: 700,
                    px: 4,
                    color: "white",
                    borderColor: "white",
                    "&:hover": { borderColor: "#ff9800", color: "#ff9800" },
                  }}
                >
                  ✈️ Plan New Trip
                </Button>
                <Button
                  component={Link}
                  href="/explore"
                  variant="text"
                  size="large"
                  sx={{ fontWeight: 700, px: 4, color: "#ff9800" }}
                >
                  🗺️ Explore Destinations
                </Button>
              </Stack>
            )}

            {/* Search Bar */}
            <Paper
              sx={{
                mt: 2,
                p: 1,
                background: "rgba(255,255,255,0.15)",
                borderRadius: 3,
                maxWidth: 400,
                mx: { xs: "auto", md: 0 },
              }}
            >
              <TextField
                fullWidth
                placeholder="Search places or trips (try 'Florida', 'California', 'New York')"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#1976d2" }} />
                    </InputAdornment>
                  ),
                  sx: { color: "white", fontWeight: 500, fontSize: "1.1rem" },
                }}
                sx={{ input: { color: "white" } }}
                value={search}
                onChange={handleSearch}
              />
            </Paper>
          </Box>
          {/* Globe Animation */}
          <Box
            sx={{
              flex: 1,
              height: { xs: 300, md: 400 },
              mt: { xs: 6, md: 0 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: 300, md: 400 },
                height: { xs: 300, md: 400 },
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.20)",
              }}
            >
              <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                backgroundColor="rgba(0,0,0,0)"
                onGlobeReady={handleGlobeReady}
                width={400}
                height={400}
                animateIn={true}
              />
            </Box>
          </Box>
        </Box>

        {/* Pre-login Search Results */}
        {results.length > 0 && (
          <Box sx={{ mt: 8, mb: 6 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              color="white"
              align="center"
              sx={{ mb: 4, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
            >
              Search Results
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {results.map((trip) => (
                <Grid item xs={12} sm={6} md={4} key={trip.id}>
                  <Card
                    sx={{
                      background: "rgba(255,255,255,0.15)",
                      color: "white",
                      borderRadius: 3,
                      boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.10)",
                      minHeight: 220,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 3,
                      textAlign: "center",
                      border: "1px solid rgba(255,255,255,0.2)",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.03)" },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                        {trip.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="#e0e0e0"
                        sx={{ mb: 2 }}
                      >
                        {trip.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="#90caf9"
                        sx={{ mb: 1 }}
                      >
                        Places: {trip.places.map((p) => p.name).join(", ")}
                      </Typography>
                      <Typography variant="caption" color="#ffe082">
                        {trip.comments.length} comments, {trip.photos.length}{" "}
                        photos
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Feature Highlights */}
        <Box sx={{ mt: 8, mb: 6 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="white"
            align="center"
            sx={{ mb: 4, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            Why Choose Us?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {featureList.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <Card
                  sx={{
                    background: "rgba(255,255,255,0.15)",
                    color: "white",
                    borderRadius: 3,
                    boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.10)",
                    minHeight: 180,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                    textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 1 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="#e0e0e0">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* User's Recent Activity (if logged in) */}
        {user && (
          <Box sx={{ mt: 8, mb: 6 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              color="white"
              align="center"
              sx={{ mb: 4, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
            >
              Your Travel Journey
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    background: "rgba(255,255,255,0.15)",
                    color: "white",
                    borderRadius: 3,
                    boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.10)",
                    minHeight: 180,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                    textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 1 }}>
                    📊
                  </Typography>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    Dashboard
                  </Typography>
                  <Typography variant="body2" color="#e0e0e0" sx={{ mb: 2 }}>
                    View your trips, stats, and travel history
                  </Typography>
                  <Button
                    component={Link}
                    href="/dashboard"
                    variant="outlined"
                    size="small"
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Go to Dashboard
                  </Button>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    background: "rgba(255,255,255,0.15)",
                    color: "white",
                    borderRadius: 3,
                    boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.10)",
                    minHeight: 180,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                    textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 1 }}>
                    👥
                  </Typography>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    Friends
                  </Typography>
                  <Typography variant="body2" color="#e0e0e0" sx={{ mb: 2 }}>
                    Connect with friends and share travel experiences
                  </Typography>
                  <Button
                    component={Link}
                    href="/friends"
                    variant="outlined"
                    size="small"
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    View Friends
                  </Button>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    background: "rgba(255,255,255,0.15)",
                    color: "white",
                    borderRadius: 3,
                    boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.10)",
                    minHeight: 180,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                    textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 1 }}>
                    🗺️
                  </Typography>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    Explore
                  </Typography>
                  <Typography variant="body2" color="#e0e0e0" sx={{ mb: 2 }}>
                    Discover new destinations and travel inspiration
                  </Typography>
                  <Button
                    component={Link}
                    href="/explore"
                    variant="outlined"
                    size="small"
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Start Exploring
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}
