"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Paper,
  Tabs,
  Tab,
  Rating,
  Avatar,
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Search,
  LocationOn,
  AccessTime,
  AttachMoney,
  Star,
  Favorite,
  FavoriteBorder,
  Share,
  PhotoCamera,
  TrendingUp,
  Explore,
  Public,
  Flight,
  Hotel,
  Restaurant,
  Attractions,
} from "@mui/icons-material";

// Mock data for destinations
const popularDestinations = [
  {
    id: "1",
    name: "Orlando, Florida",
    country: "USA",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 1247,
    bestTime: "March-May, September-November",
    avgCost: "$300/day",
    description: "Theme park capital of the world with year-round sunshine and endless entertainment options.",
    highlights: ["Disney World", "Universal Studios", "SeaWorld", "International Drive"],
    tags: ["Family-friendly", "Theme Parks", "Sunshine", "Entertainment"],
    coordinates: [28.5383, -81.3792],
    tripCount: 156,
    photoCount: 2341
  },
  {
    id: "2",
    name: "Miami, Florida",
    country: "USA",
    image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=600&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 892,
    bestTime: "December-April",
    avgCost: "$350/day",
    description: "Vibrant coastal city known for its beautiful beaches, art deco architecture, and Latin culture.",
    highlights: ["South Beach", "Wynwood Walls", "Little Havana", "Vizcaya Museum"],
    tags: ["Beach", "Nightlife", "Culture", "Art"],
    coordinates: [25.7617, -80.1918],
    tripCount: 134,
    photoCount: 1892
  },
  {
    id: "3",
    name: "Key West, Florida",
    country: "USA",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 567,
    bestTime: "March-May, November-December",
    avgCost: "$250/day",
    description: "Tropical paradise at the southernmost point of the continental United States.",
    highlights: ["Duval Street", "Mallory Square", "Snorkeling", "Sunset cruise"],
    tags: ["Tropical", "Island", "Water Sports", "Sunset"],
    coordinates: [24.5551, -81.78],
    tripCount: 89,
    photoCount: 1234
  },
  {
    id: "4",
    name: "Tampa, Florida",
    country: "USA",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop",
    bestTime: "March-May, October-December",
    avgCost: "$200/day",
    description: "Historic port city with beautiful bay views, museums, and family attractions.",
    highlights: ["Busch Gardens", "Tampa Riverwalk", "Ybor City", "Florida Aquarium"],
    tags: ["Family", "History", "Bay Views", "Museums"],
    coordinates: [27.9506, -82.4572],
    tripCount: 67,
    photoCount: 892
  },
  {
    id: "5",
    name: "Paris, France",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898535-0b7b0b7b0b7b?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 2341,
    bestTime: "March-May, September-November",
    avgCost: "€400/day",
    description: "The City of Light offers world-class art, cuisine, and iconic landmarks.",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Champs-Élysées"],
    tags: ["Romance", "Art", "Culture", "Food"],
    coordinates: [48.8566, 2.3522],
    tripCount: 445,
    photoCount: 5678
  },
  {
    id: "6",
    name: "Tokyo, Japan",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 1567,
    bestTime: "March-May, October-November",
    avgCost: "¥35,000/day",
    description: "Ultra-modern metropolis where cutting-edge technology meets ancient traditions.",
    highlights: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Skytree", "Tsukiji Market"],
    tags: ["Technology", "Tradition", "Food", "Shopping"],
    coordinates: [35.6762, 139.6503],
    tripCount: 234,
    photoCount: 3456
  }
];

const trendingDestinations = [
  {
    id: "7",
    name: "Bali, Indonesia",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 892,
    bestTime: "April-October",
    avgCost: "$150/day",
    description: "Island paradise known for its spiritual temples, rice terraces, and beautiful beaches.",
    highlights: ["Ubud", "Seminyak", "Rice Terraces", "Sacred Monkey Forest"],
    tags: ["Wellness", "Beach", "Culture", "Nature"],
    coordinates: [-8.3405, 115.0920],
    tripCount: 178,
    photoCount: 2345,
    trending: true
  },
  {
    id: "8",
    name: "Amalfi Coast, Italy",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 456,
    bestTime: "April-June, September-October",
    avgCost: "€500/day",
    description: "Dramatic coastline with colorful cliffside villages and Mediterranean charm.",
    highlights: ["Positano", "Amalfi", "Ravello", "Capri"],
    tags: ["Coast", "Luxury", "Mediterranean", "Romance"],
    coordinates: [40.6340, 14.6026],
    tripCount: 89,
    photoCount: 1234,
    trending: true
  }
];

const categories = [
  { name: "Beach Destinations", icon: "🏖️", count: 45 },
  { name: "City Breaks", icon: "🏙️", count: 67 },
  { name: "Mountain Adventures", icon: "⛰️", count: 34 },
  { name: "Cultural Heritage", icon: "🏛️", count: 56 },
  { name: "Food & Wine", icon: "🍷", count: 23 },
  { name: "Adventure Sports", icon: "🏄‍♂️", count: 28 },
  { name: "Wellness Retreats", icon: "🧘‍♀️", count: 19 },
  { name: "Family Fun", icon: "👨‍👩‍👧‍👦", count: 41 }
];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`explore-tabpanel-${index}`}
      aria-labelledby={`explore-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ExplorePage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFavorite = (destinationId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(destinationId)) {
      newFavorites.delete(destinationId);
    } else {
      newFavorites.add(destinationId);
    }
    setFavorites(newFavorites);
  };

  const handleShare = (destination) => {
    // In real app, this would open share dialog
    alert(`Share ${destination.name} with friends!`);
  };

  const filteredDestinations = [...popularDestinations, ...trendingDestinations].filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderDestinationCard = (destination) => (
    <Grid item xs={12} sm={6} md={4} key={destination.id}>
      <Card sx={{ height: "100%", position: "relative" }}>
        {destination.trending && (
          <Chip
            icon={<TrendingUp />}
            label="Trending"
            color="warning"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1,
              fontWeight: 600
            }}
          />
        )}
        <CardMedia
          component="img"
          height="200"
          image={destination.image}
          alt={destination.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
              {destination.name}
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleFavorite(destination.id)}
              color={favorites.has(destination.id) ? "error" : "default"}
            >
              {favorites.has(destination.id) ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {destination.country}
          </Typography>

          {destination.rating && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Rating value={destination.rating} precision={0.1} size="small" readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {destination.rating} ({destination.reviewCount} reviews)
              </Typography>
            </Box>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.4 }}>
            {destination.description}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip
              icon={<AccessTime />}
              label={destination.bestTime}
              size="small"
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<AttachMoney />}
              label={destination.avgCost}
              size="small"
              color="success"
              variant="outlined"
            />
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>Highlights:</strong> {destination.highlights.slice(0, 3).join(", ")}
            {destination.highlights.length > 3 && "..."}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
            {destination.tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                color="info"
                variant="outlined"
              />
            ))}
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="caption" color="text.secondary">
              📍 {destination.tripCount} trips • 📸 {destination.photoCount} photos
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setSelectedDestination(destination)}
          >
            View Details
          </Button>
          <Button
            size="small"
            startIcon={<Share />}
            onClick={() => handleShare(destination)}
          >
            Share
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            fontWeight={800}
            color="white"
            sx={{ mb: 2, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            Explore the World
          </Typography>
          <Typography
            variant="h6"
            color="rgba(255,255,255,0.9)"
            sx={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
          >
            Discover amazing destinations and get inspired for your next adventure
          </Typography>
        </Box>

        {/* Search Bar */}
        <Paper
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <TextField
            fullWidth
            placeholder="Search destinations, countries, or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {/* Categories */}
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Browse by Category
          </Typography>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid item xs={6} sm={4} md={3} key={category.name}>
                <Card
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <CardContent>
                    <Typography variant="h3" sx={{ mb: 1 }}>
                      {category.icon}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                      {category.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {category.count} destinations
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Main Content */}
        <Paper
          sx={{
            borderRadius: 3,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            overflow: "hidden",
          }}
        >
          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="explore tabs">
              <Tab 
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Explore />
                    All Destinations ({filteredDestinations.length})
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TrendingUp />
                    Trending
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Flight />
                    Popular
                  </Box>
                } 
              />
            </Tabs>
          </Box>

          {/* All Destinations Tab */}
          <TabPanel value={tabValue} index={0}>
            {filteredDestinations.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No destinations found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search terms or browse our categories above
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredDestinations.map(renderDestinationCard)}
              </Grid>
            )}
          </TabPanel>

          {/* Trending Tab */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              {trendingDestinations.map(renderDestinationCard)}
            </Grid>
          </TabPanel>

          {/* Popular Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              {popularDestinations.map(renderDestinationCard)}
            </Grid>
          </TabPanel>
        </Paper>
      </Container>

      {/* Destination Details Dialog */}
      <Dialog
        open={!!selectedDestination}
        onClose={() => setSelectedDestination(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedDestination && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <LocationOn color="primary" />
                {selectedDestination.name}, {selectedDestination.country}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <img
                    src={selectedDestination.image}
                    alt={selectedDestination.name}
                    style={{
                      width: "100%",
                      height: 250,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    About {selectedDestination.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedDestination.description}
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} color="primary">
                        Best Time to Visit
                      </Typography>
                      <Typography variant="body2">
                        {selectedDestination.bestTime}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} color="success.main">
                        Average Cost
                      </Typography>
                      <Typography variant="body2">
                        {selectedDestination.avgCost}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} color="info.main">
                        Highlights
                      </Typography>
                      <List dense>
                        {selectedDestination.highlights.map((highlight, index) => (
                          <ListItem key={index} sx={{ py: 0.5 }}>
                            <ListItemText primary={highlight} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} color="warning.main">
                        Tags
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {selectedDestination.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            color="info"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedDestination(null)}>Close</Button>
              <Button
                variant="contained"
                startIcon={<PhotoCamera />}
                onClick={() => {
                  alert("Photo gallery would open here!");
                  setSelectedDestination(null);
                }}
              >
                View Photos
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
