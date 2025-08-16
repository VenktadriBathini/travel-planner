"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Tabs,
  Tab,
  IconButton,
  Badge,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  LocationOn,
  AccessTime,
  AttachMoney,
  PhotoCamera,
  Favorite,
  Share,
  Edit,
  Add,
  People,
  Public,
  Lock,
  Instagram,
  Facebook,
  Twitter,
  Language,
  Email,
  Phone,
} from "@mui/icons-material";
import { useParams } from "next/navigation";

// Mock user data - in real app this would come from API
const mockUser = {
  id: "1",
  username: "sarah_adventures",
  fullName: "Sarah Johnson",
  email: "sarah@email.com",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
  coverPhoto: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=400&fit=crop",
  bio: "Travel enthusiast | Photography lover | Adventure seeker 🌍✈️",
  location: "New York, NY",
  website: "https://sarahadventures.com",
  socialMedia: {
    instagram: "@sarah_adventures",
    facebook: "sarah.johnson.travel",
    twitter: "@sarah_travels"
  },
  followers: 1247,
  following: 892,
  totalTrips: 8,
  totalPhotos: 156,
  memberSince: "2023-01-15",
  isFollowing: false,
  isOwnProfile: false,
  stats: {
    countriesVisited: 12,
    citiesExplored: 45,
    totalDistance: "23,450 km",
    averageTripDuration: "8.5 days",
    totalSpent: "$18,750"
  }
};

const mockTrips = [
  {
    id: "1",
    title: "Florida Sunshine Adventure",
    description: "A week exploring the best of Florida - from theme parks to beaches!",
    startDate: "2024-03-15",
    endDate: "2024-03-22",
    status: "completed",
    budget: 2500,
    currency: "USD",
    photos: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    ],
    places: ["Orlando", "Tampa", "Miami", "Key West"],
    likes: 24,
    comments: 8
  },
  {
    id: "2",
    title: "European Backpacking",
    description: "3 months exploring Europe on a budget",
    startDate: "2023-06-01",
    endDate: "2023-09-01",
    status: "completed",
    budget: 8000,
    currency: "EUR",
    photos: [
      "https://images.unsplash.com/photo-1502602898535-0b7b0b7b0b7b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop"
    ],
    places: ["Paris", "Rome", "Barcelona", "Amsterdam", "Berlin"],
    likes: 67,
    comments: 23
  },
  {
    id: "3",
    title: "Southeast Asia Adventure",
    description: "Exploring Thailand, Vietnam, and Cambodia",
    startDate: "2023-12-01",
    endDate: "2024-01-15",
    status: "completed",
    budget: 3500,
    currency: "USD",
    photos: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop"
    ],
    places: ["Bangkok", "Ho Chi Minh City", "Hanoi", "Siem Reap"],
    likes: 89,
    comments: 31
  }
];

const mockPhotos = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop",
    caption: "Magic Kingdom magic ✨",
    location: "Orlando, FL",
    timestamp: "2024-03-16T18:30:00Z",
    likes: 45
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    caption: "Key West sunset vibes 🌅",
    location: "Key West, FL",
    timestamp: "2024-03-21T18:15:00Z",
    likes: 38
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1502602898535-0b7b0b7b0b7b?w=300&h=300&fit=crop",
    caption: "Eiffel Tower at night",
    location: "Paris, France",
    timestamp: "2023-07-15T20:30:00Z",
    likes: 67
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop",
    caption: "Louvre Pyramid",
    location: "Paris, France",
    timestamp: "2023-07-17T14:00:00Z",
    likes: 52
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=300&fit=crop",
    caption: "Shibuya Crossing",
    location: "Tokyo, Japan",
    timestamp: "2023-11-11T19:00:00Z",
    likes: 73
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=300&fit=crop",
    caption: "Senso-ji Temple",
    location: "Tokyo, Japan",
    timestamp: "2023-11-13T08:30:00Z",
    likes: 58
  }
];

const mockFriends = [
  {
    id: "2",
    username: "mike_explorer",
    fullName: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    mutualTrips: 2
  },
  {
    id: "3",
    username: "emma_wanderlust",
    fullName: "Emma Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    mutualTrips: 1
  },
  {
    id: "4",
    username: "alex_globetrotter",
    fullName: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    mutualTrips: 3
  }
];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId;
  const [user, setUser] = useState(mockUser);
  const [trips, setTrips] = useState(mockTrips);
  const [photos, setPhotos] = useState(mockPhotos);
  const [friends, setFriends] = useState(mockFriends);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFollow = () => {
    setUser(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        pb: 4,
      }}
    >
      {/* Cover Photo */}
      <Box
        sx={{
          height: 300,
          backgroundImage: `url(${user.coverPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
            p: 3,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
              <Avatar
                src={user.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid white",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              />
              <Box sx={{ flex: 1, color: "white" }}>
                <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
                  {user.fullName}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                  @{user.username}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.8 }}>
                  {user.bio}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                  <Chip
                    icon={<LocationOn />}
                    label={user.location}
                    color="primary"
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  />
                  <Chip
                    icon={<AccessTime />}
                    label={`Member since ${formatDate(user.memberSince)}`}
                    color="primary"
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {!user.isOwnProfile && (
                  <Button
                    variant={user.isFollowing ? "outlined" : "contained"}
                    color={user.isFollowing ? "inherit" : "primary"}
                    onClick={handleFollow}
                    sx={{ minWidth: 120 }}
                  >
                    {user.isFollowing ? "Following" : "Follow"}
                  </Button>
                )}
                {user.isOwnProfile && (
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Edit Profile
                  </Button>
                )}
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  sx={{ color: "white", borderColor: "white" }}
                >
                  Share Profile
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -4, position: "relative", zIndex: 2 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="h4" fontWeight={800} color="primary" sx={{ mb: 1 }}>
                {user.stats.countriesVisited}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Countries Visited
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="h4" fontWeight={800} color="success.main" sx={{ mb: 1 }}>
                {user.stats.citiesExplored}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cities Explored
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="h4" fontWeight={800} color="warning.main" sx={{ mb: 1 }}>
                {user.stats.totalDistance}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Distance
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="h4" fontWeight={800} color="info.main" sx={{ mb: 1 }}>
                {user.stats.totalSpent}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Spent
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Social Stats */}
        <Paper
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4" fontWeight={800} color="primary">
                    {user.followers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Followers
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4" fontWeight={800} color="success.main">
                    {user.following}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Following
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4" fontWeight={800} color="warning.main">
                    {user.totalTrips}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Trips
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4" fontWeight={800} color="info.main">
                    {user.totalPhotos}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Photos
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                {user.socialMedia.instagram && (
                  <IconButton color="primary" size="large">
                    <Instagram />
                  </IconButton>
                )}
                {user.socialMedia.facebook && (
                  <IconButton color="primary" size="large">
                    <Facebook />
                  </IconButton>
                )}
                {user.socialMedia.twitter && (
                  <IconButton color="primary" size="large">
                    <Twitter />
                  </IconButton>
                )}
                {user.website && (
                  <IconButton color="primary" size="large">
                    <Language />
                  </IconButton>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs */}
        <Paper
          sx={{
            borderRadius: 3,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
              <Tab label={`Trips (${trips.length})`} />
              <Tab label={`Photos (${photos.length})`} />
              <Tab label={`Friends (${friends.length})`} />
              <Tab label="About" />
            </Tabs>
          </Box>

          {/* Trips Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              {trips.map((trip) => (
                <Grid item xs={12} md={6} lg={4} key={trip.id}>
                  <Card sx={{ height: "100%", borderRadius: 3 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={trip.photos[0]}
                      alt={trip.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                        {trip.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {trip.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip
                          label={formatDate(trip.startDate)}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={formatCurrency(trip.budget, trip.currency)}
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Places: {trip.places.join(", ")}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            ❤️ {trip.likes}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            💬 {trip.comments}
                          </Typography>
                        </Box>
                        <Chip
                          label={trip.status}
                          color={trip.status === "completed" ? "success" : "warning"}
                          size="small"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Photos Tab */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              {photos.map((photo) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
                  <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={photo.url}
                      alt={photo.caption}
                    />
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                        {photo.caption}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                        📍 {photo.location}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ❤️ {photo.likes} • {formatDate(photo.timestamp)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Friends Tab */}
          <TabPanel value={tabValue} index={2}>
            <List>
              {friends.map((friend) => (
                <ListItem key={friend.id} sx={{ mb: 2 }}>
                  <ListItemAvatar>
                    <Avatar src={friend.avatar} sx={{ width: 56, height: 56 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" fontWeight={600}>
                        {friend.fullName}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          @{friend.username}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          {friend.mutualTrips} mutual trips
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Button variant="outlined" size="small">
                      View Profile
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </TabPanel>

          {/* About Tab */}
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Contact Information
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Email color="action" />
                    <Typography>{user.email}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <LocationOn color="action" />
                    <Typography>{user.location}</Typography>
                  </Box>
                  {user.website && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Language color="action" />
                      <Typography>{user.website}</Typography>
                    </Box>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Travel Preferences
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Average Trip Duration
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {user.stats.averageTripDuration}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Favorite Destinations
                    </Typography>
                    <Typography variant="body1">
                      Florida, Paris, Tokyo, Bali, Italy
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
}
