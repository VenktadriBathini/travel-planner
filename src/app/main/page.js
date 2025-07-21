"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const mockTrips = [
  {
    id: 1,
    name: "Florida Adventure",
    dates: "2023-04-10 to 2023-04-18",
    places: ["Tampa", "Miami", "Key West", "Orlando"],
    cover:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "A road trip through Florida's best cities and beaches.",
  },
  {
    id: 2,
    name: "California Coast",
    dates: "2022-08-05 to 2022-08-15",
    places: ["San Francisco", "Monterey", "Santa Barbara", "Los Angeles"],
    cover:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    description: "Exploring the Pacific Coast Highway.",
  },
];

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
    description: "See everywhere you’ve traveled on a beautiful map.",
    icon: "📍",
  },
];

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function MainPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(0,0,0,0.10), rgba(0,0,0,0.10)), url('https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular-projection.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {/* Dashboard Header */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #1976d2 60%, #ff9800 100%)",
          boxShadow: 3,
          mb: 4,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
          <Button
            component={Link}
            href="/main/plan"
            sx={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}
          >
            Plan a Trip
          </Button>
          <Button
            component={Link}
            href="/main/previous"
            sx={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}
          >
            Previous Trip Details
          </Button>
          <Button
            component={Link}
            href="/main/add"
            sx={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}
          >
            Add Trip Details
          </Button>
          <Button
            component={Link}
            href="/main/friends"
            sx={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}
          >
            Friends
          </Button>
        </Toolbar>
      </AppBar>
      {/* Dashboard Content (existing) */}
      <Container maxWidth="md">
        <Paper
          elevation={24}
          sx={{
            p: 6,
            background: `linear-gradient(135deg, rgba(25,118,210,0.90) 0%, rgba(255,152,0,0.80) 100%)`,
            color: "#fff",
            borderRadius: 4,
            textAlign: "center",
            boxShadow: "0 8px 32px 0 rgba(31,38,135,0.10)",
            border: "1px solid rgba(255,255,255,0.18)",
            mt: { xs: 8, sm: 10 },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Typography
              variant="h4"
              fontWeight={900}
              color="#fff"
              m={0}
              sx={{ textShadow: "0 2px 8px rgba(25,118,210,0.18)" }}
            >
              Welcome back, Admin!
            </Typography>
            <Button
              variant="contained"
              sx={{
                fontWeight: 700,
                px: 3,
                py: 1,
                borderRadius: 2,
                background: "#fff",
                color: "#1976d2",
                "&:hover": { background: "#ff9800", color: "#fff" },
              }}
              onClick={() => alert("Trip planner coming soon!")}
            >
              + Plan New Trip
            </Button>
          </Box>
          <Typography
            variant="h6"
            color="#fff"
            fontWeight={800}
            mb={3}
            textAlign="left"
            sx={{ textShadow: "0 1px 6px rgba(25,118,210,0.18)" }}
          >
            Your Previous Trips
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
          >
            {mockTrips.map((trip) => (
              <Paper
                key={trip.id}
                elevation={6}
                sx={{
                  minWidth: 280,
                  maxWidth: 340,
                  flex: "1 1 320px",
                  background: "rgba(255,255,255,0.13)",
                  borderRadius: 3,
                  boxShadow: "0 2px 12px rgba(25, 118, 210, 0.08)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  p: 0,
                }}
              >
                <img
                  src={trip.cover}
                  alt={trip.name}
                  style={{ width: "100%", height: 140, objectFit: "cover" }}
                />
                <Box p={2} flex={1}>
                  <Typography
                    variant="h6"
                    fontWeight={800}
                    color="#fff"
                    mb={0.5}
                    sx={{ textShadow: "0 1px 6px rgba(25,118,210,0.18)" }}
                  >
                    {trip.name}
                  </Typography>
                  <Typography
                    color="#e3f2fd"
                    fontWeight={600}
                    mb={1}
                    fontSize={14}
                  >
                    {trip.dates}
                  </Typography>
                  <Typography
                    color="#ffe0b2"
                    fontWeight={700}
                    mb={0.5}
                    fontSize={15}
                  >
                    {trip.places.join(", ")}
                  </Typography>
                  <Typography color="#fffde7" fontSize={15} mb={1}>
                    {trip.description}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        fontWeight: 700,
                        borderRadius: 2,
                        background: "#fff",
                        color: "#1976d2",
                        "&:hover": { background: "#ff9800", color: "#fff" },
                      }}
                      onClick={() => alert("Trip details coming soon!")}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      sx={{
                        fontWeight: 700,
                        borderRadius: 2,
                        background: "#fff",
                        color: "#388e3c",
                        "&:hover": { background: "#ff9800", color: "#fff" },
                      }}
                      onClick={() => alert("Share trip coming soon!")}
                    >
                      Share
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Container>
      {/* Why Choose Us Section (dashboard) */}
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          color="#fff"
          align="center"
          sx={{ mb: 4, textShadow: "0 2px 8px rgba(25,118,210,0.18)" }}
        >
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {featureList.map((feature) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <Link
                href={`/main/feature/${slugify(feature.title)}`}
                style={{ textDecoration: "none" }}
              >
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
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.04)",
                      boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
                    },
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
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
