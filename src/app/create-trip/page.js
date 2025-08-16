"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Autocomplete,
} from "@mui/material";
import {
  Add,
  Delete,
  LocationOn,
  AccessTime,
  AttachMoney,
  Luggage,
  PhotoCamera,
  Save,
  ArrowBack,
  ArrowForward,
  Map,
  Route,
  Timeline,
  DirectionsCar,
  Flight,
  Train,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import the map component
const MapComponent = dynamic(() => import("../../components/MapComponent"), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});

// US Cities database for autocomplete
const usCities = [
  { name: "Orlando, FL", coordinates: [28.5383, -81.3792], state: "Florida" },
  { name: "Tampa, FL", coordinates: [27.9506, -82.4572], state: "Florida" },
  { name: "Miami, FL", coordinates: [25.7617, -80.1918], state: "Florida" },
  { name: "Key West, FL", coordinates: [24.5551, -81.78], state: "Florida" },
  {
    name: "San Francisco, CA",
    coordinates: [37.7749, -122.4194],
    state: "California",
  },
  {
    name: "Los Angeles, CA",
    coordinates: [34.0522, -118.2437],
    state: "California",
  },
  {
    name: "San Diego, CA",
    coordinates: [32.7157, -117.1611],
    state: "California",
  },
  {
    name: "Big Sur, CA",
    coordinates: [36.2704, -121.8081],
    state: "California",
  },
  { name: "New York, NY", coordinates: [40.7128, -74.006], state: "New York" },
  {
    name: "Manhattan, NY",
    coordinates: [40.7589, -73.9851],
    state: "New York",
  },
  {
    name: "Central Park, NY",
    coordinates: [40.7829, -73.9654],
    state: "New York",
  },
  { name: "Aspen, CO", coordinates: [39.1911, -106.8175], state: "Colorado" },
  { name: "Denver, CO", coordinates: [39.7392, -104.9903], state: "Colorado" },
  {
    name: "Rocky Mountain National Park, CO",
    coordinates: [40.3428, -105.6836],
    state: "Colorado",
  },
  { name: "Austin, TX", coordinates: [30.2672, -97.7431], state: "Texas" },
  { name: "Houston, TX", coordinates: [29.7604, -95.3698], state: "Texas" },
  {
    name: "Fredericksburg, TX",
    coordinates: [30.2752, -98.872],
    state: "Texas",
  },
  {
    name: "Nashville, TN",
    coordinates: [36.1627, -86.7816],
    state: "Tennessee",
  },
  { name: "Memphis, TN", coordinates: [35.1495, -90.049], state: "Tennessee" },
  {
    name: "New Orleans, LA",
    coordinates: [29.9511, -90.0715],
    state: "Louisiana",
  },
  { name: "Las Vegas, NV", coordinates: [36.1699, -115.1398], state: "Nevada" },
  {
    name: "Seattle, WA",
    coordinates: [47.6062, -122.3321],
    state: "Washington",
  },
  { name: "Portland, OR", coordinates: [45.5152, -122.6784], state: "Oregon" },
];

export default function CreateTripPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [tripData, setTripData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    currency: "USD",
    visibility: "public",
    places: [],
    photos: [],
  });
  const [currentPlace, setCurrentPlace] = useState({
    name: "",
    type: "",
    coordinates: [0, 0],
    bestTimeToVisit: "",
    cost: "",
    duration: "",
    thingsToCarry: [],
    activities: [],
    tips: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showMap, setShowMap] = useState(true);
  const [success, setSuccess] = useState(false);
  const [routeOptimization, setRouteOptimization] = useState(null);

  React.useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
  }, [user, router]);

  // Filter cities based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCities([]);
      return;
    }

    const filtered = usCities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCities(filtered.slice(0, 10)); // Limit to 10 results
  }, [searchQuery]);

  const handleCitySelect = (city) => {
    setCurrentPlace({
      ...currentPlace,
      name: city.name,
      coordinates: city.coordinates,
      type: city.state.includes("FL")
        ? "Florida City"
        : city.state.includes("CA")
        ? "California City"
        : city.state.includes("NY")
        ? "New York City"
        : city.state.includes("CO")
        ? "Colorado City"
        : city.state.includes("TX")
        ? "Texas City"
        : "City",
    });
    setSearchQuery(city.name);
    setFilteredCities([]);
  };

  const addPlace = () => {
    if (currentPlace.name && currentPlace.type) {
      const newPlace = { ...currentPlace, id: Date.now() };
      setTripData({
        ...tripData,
        places: [...tripData.places, newPlace],
      });
      setCurrentPlace({
        name: "",
        type: "",
        coordinates: [0, 0],
        bestTimeToVisit: "",
        cost: "",
        duration: "",
        thingsToCarry: [],
        activities: [],
        tips: "",
      });
      setSearchQuery("");
      // Trigger route optimization
      optimizeRoute([...tripData.places, newPlace]);
    }
  };

  const removePlace = (index) => {
    const newPlaces = tripData.places.filter((_, i) => i !== index);
    setTripData({ ...tripData, places: newPlaces });
    if (newPlaces.length > 0) {
      optimizeRoute(newPlaces);
    } else {
      setRouteOptimization(null);
    }
  };

  const optimizeRoute = (places) => {
    if (places.length < 2) {
      setRouteOptimization(null);
      return;
    }

    // Simple route optimization (nearest neighbor algorithm)
    const optimizedPlaces = [...places];
    const visited = new Set();
    const route = [];

    // Start with first place
    let current = optimizedPlaces[0];
    route.push(current);
    visited.add(current.id);

    // Find nearest unvisited place
    while (route.length < places.length) {
      let nearest = null;
      let minDistance = Infinity;

      for (const place of optimizedPlaces) {
        if (visited.has(place.id)) continue;

        const distance = calculateDistance(
          current.coordinates,
          place.coordinates
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearest = place;
        }
      }

      if (nearest) {
        route.push(nearest);
        visited.add(nearest.id);
        current = nearest;
      }
    }

    // Calculate total distance and estimated time
    let totalDistance = 0;
    let totalTime = 0;

    for (let i = 0; i < route.length - 1; i++) {
      const distance = calculateDistance(
        route[i].coordinates,
        route[i + 1].coordinates
      );
      totalDistance += distance;
      totalTime += distance * 0.5; // Rough estimate: 0.5 hours per 100km
    }

    setRouteOptimization({
      route,
      totalDistance: Math.round(totalDistance),
      totalTime: Math.round(totalTime),
      estimatedCost: Math.round(totalDistance * 0.15), // Rough fuel cost estimate
    });
  };

  const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((coord2[0] - coord1[0]) * Math.PI) / 180;
    const dLon = ((coord2[1] - coord1[1]) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((coord1[0] * Math.PI) / 180) *
        Math.cos((coord2[0] * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSave = () => {
    // Save trip logic here
    setSuccess(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, color: "#1976d2" }}
        >
          ✈️ Plan Your Trip
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Create an amazing travel experience with smart route planning
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Side - Trip Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              📝 Trip Details
            </Typography>
            <TextField
              fullWidth
              label="Trip Title"
              value={tripData.title}
              onChange={(e) =>
                setTripData({ ...tripData, title: e.target.value })
              }
              margin="normal"
              required
              placeholder="e.g., Florida Sunshine Adventure"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={tripData.description}
              onChange={(e) =>
                setTripData({ ...tripData, description: e.target.value })
              }
              margin="normal"
              placeholder="Describe your trip..."
            />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={tripData.startDate}
                  onChange={(e) =>
                    setTripData({ ...tripData, startDate: e.target.value })
                  }
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  value={tripData.endDate}
                  onChange={(e) =>
                    setTripData({ ...tripData, endDate: e.target.value })
                  }
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Budget"
                  type="number"
                  value={tripData.budget}
                  onChange={(e) =>
                    setTripData({ ...tripData, budget: e.target.value })
                  }
                  placeholder="2500"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={tripData.currency}
                    onChange={(e) =>
                      setTripData({ ...tripData, currency: e.target.value })
                    }
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              📍 Add Places
            </Typography>

            {/* City Search */}
            <Autocomplete
              freeSolo
              options={filteredCities}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.name
              }
              inputValue={searchQuery}
              onInputChange={(event, newInputValue) => {
                setSearchQuery(newInputValue);
              }}
              onChange={(event, newValue) => {
                if (newValue && typeof newValue === "object") {
                  handleCitySelect(newValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for cities (e.g., Florida, California, New York)"
                  placeholder="Type to search..."
                  fullWidth
                  margin="normal"
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <LocationOn sx={{ mr: 1, color: "primary.main" }} />
                  <Box>
                    <Typography variant="body1">{option.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.state}
                    </Typography>
                  </Box>
                </Box>
              )}
            />

            {/* Place Details */}
            {currentPlace.name && (
              <Box sx={{ mt: 2, p: 2, bgcolor: "#f8f9fa", borderRadius: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Adding: {currentPlace.name}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Best Time to Visit"
                      value={currentPlace.bestTimeToVisit}
                      onChange={(e) =>
                        setCurrentPlace({
                          ...currentPlace,
                          bestTimeToVisit: e.target.value,
                        })
                      }
                      placeholder="e.g., March-May"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Cost"
                      value={currentPlace.cost}
                      onChange={(e) =>
                        setCurrentPlace({
                          ...currentPlace,
                          cost: e.target.value,
                        })
                      }
                      placeholder="e.g., $200"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label="Duration"
                  value={currentPlace.duration}
                  onChange={(e) =>
                    setCurrentPlace({
                      ...currentPlace,
                      duration: e.target.value,
                    })
                  }
                  margin="normal"
                  placeholder="e.g., 2 days"
                  size="small"
                />
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={addPlace}
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Add Place to Trip
                </Button>
              </Box>
            )}

            {/* Places List */}
            {tripData.places.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  📍 Places Added ({tripData.places.length})
                </Typography>
                <List>
                  {tripData.places.map((place, index) => (
                    <ListItem key={place.id} divider>
                      <ListItemText
                        primary={place.name}
                        secondary={`${place.type} • ${
                          place.duration || "Duration not set"
                        }`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => removePlace(index)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Save Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleSave}
              sx={{ mt: 3, py: 1.5 }}
              disabled={tripData.places.length === 0}
            >
              💾 Save Trip
            </Button>
          </Paper>
        </Grid>

        {/* Right Side - Map and Route */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">🗺️ Trip Map & Route</Typography>
              <Button
                variant="outlined"
                startIcon={<Map />}
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? "Hide Map" : "Show Map"}
              </Button>
            </Box>

            {showMap ? (
              <Box
                sx={{ height: 400, borderRadius: 2, overflow: "hidden", mb: 2 }}
              >
                <MapComponent places={tripData.places} />
              </Box>
            ) : (
              <Box
                sx={{
                  height: 400,
                  bgcolor: "#f5f5f5",
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  Map hidden
                </Typography>
              </Box>
            )}

            {/* Route Optimization */}
            {routeOptimization && (
              <Box sx={{ mt: 2, p: 2, bgcolor: "#e3f2fd", borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>
                  🚗 Optimized Route
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <DirectionsCar color="primary" sx={{ fontSize: 24 }} />
                      <Typography variant="body2" color="text.secondary">
                        Total Distance
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {routeOptimization.totalDistance} km
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <Timeline color="primary" sx={{ fontSize: 24 }} />
                      <Typography variant="body2" color="text.secondary">
                        Est. Time
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {routeOptimization.totalTime} hrs
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <AttachMoney color="primary" sx={{ fontSize: 24 }} />
                      <Typography variant="body2" color="text.secondary">
                        Est. Cost
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${routeOptimization.estimatedCost}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Typography variant="subtitle2" gutterBottom>
                  Optimized Route Order:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {routeOptimization.route.map((place, index) => (
                    <Chip
                      key={place.id}
                      label={`${index + 1}. ${place.name}`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Quick Tips */}
            <Box sx={{ mt: 2, p: 2, bgcolor: "#fff3e0", borderRadius: 2 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ color: "#f57c00" }}
              >
                💡 Quick Tips
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Search for cities by name or state (e.g., Florida, California)
                • The map will automatically show all added places • Route
                optimization calculates the best travel order • Add at least 2
                places to see route optimization
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Trip created successfully! Redirecting to dashboard..."
      />
    </Container>
  );
}
