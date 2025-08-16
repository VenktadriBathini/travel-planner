"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Button,
  Chip,
  Grid,
  Paper,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Tabs,
  Tab,
  Badge,
  Alert,
  Snackbar,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  Add,
  Remove,
  Message,
  Share,
  LocationOn,
  AccessTime,
  AttachMoney,
  Luggage,
  Favorite,
  FavoriteBorder,
  Comment,
  Send,
  Check,
  Close,
  PersonAdd,
  PersonRemove,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import the map component
const MapComponent = dynamic(() => import("../../components/MapComponent"), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});

export default function FriendsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [tripDetailsOpen, setTripDetailsOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [success, setSuccess] = useState("");

  // Mock data for friends, trips, and requests
  const [friends] = useState([
    {
      id: "friend1",
      username: "sarah_adventures",
      fullName: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "online",
      recentTrip: "Florida Sunshine Adventure",
      lastActive: "2 hours ago",
    },
    {
      id: "friend2",
      username: "mike_explorer",
      fullName: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "offline",
      recentTrip: "California Coast Adventure",
      lastActive: "1 day ago",
    },
    {
      id: "friend3",
      username: "emma_wanderlust",
      fullName: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "online",
      recentTrip: "New York City Experience",
      lastActive: "30 minutes ago",
    },
  ]);

  const [friendRequests] = useState([
    {
      id: "req1",
      username: "alex_globetrotter",
      fullName: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      message: "Hey! I saw we both love hiking. Would love to connect and share travel tips!",
      timestamp: "2 hours ago",
    },
    {
      id: "req2",
      username: "lisa_sunshine",
      fullName: "Lisa Park",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      message: "Love your travel photos! Let's be friends and share adventures!",
      timestamp: "1 day ago",
    },
  ]);

  const [suggestions] = useState([
    {
      id: "sug1",
      username: "david_mountains",
      fullName: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 3,
      interests: ["Hiking", "Photography", "National Parks"],
    },
    {
      id: "sug2",
      username: "anna_beach",
      fullName: "Anna Martinez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 2,
      interests: ["Beach", "Water Sports", "Tropical Destinations"],
    },
  ]);

  const [sharedTrips] = useState([
    {
      id: "trip1",
      userId: "friend1",
      user: friends[0],
      title: "Florida Sunshine Adventure",
      description: "A week exploring Orlando, Tampa, Miami, and Key West with amazing theme parks and beaches!",
      places: [
        { name: "Orlando, FL", coordinates: [28.5383, -81.3792], type: "Theme Parks" },
        { name: "Tampa, FL", coordinates: [27.9506, -82.4572], type: "City & Culture" },
        { name: "Miami, FL", coordinates: [25.7617, -80.1918], type: "Beach & Nightlife" },
        { name: "Key West, FL", coordinates: [24.5551, -81.78], type: "Island Paradise" },
      ],
      duration: "7 days",
      cost: "$2,500",
      bestTime: "March-May",
      photos: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop",
      ],
      likes: 24,
      comments: 8,
      isLiked: false,
      isShared: false,
      timestamp: "2 days ago",
    },
    {
      id: "trip2",
      userId: "friend2",
      user: friends[1],
      title: "California Coast Adventure",
      description: "Road trip along the stunning Pacific Coast Highway from San Francisco to Big Sur",
      places: [
        { name: "San Francisco, CA", coordinates: [37.7749, -122.4194], type: "City & Culture" },
        { name: "Big Sur, CA", coordinates: [36.2704, -121.8081], type: "Scenic Beauty" },
      ],
      duration: "7 days",
      cost: "$3,500",
      bestTime: "September-November",
      photos: [
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop",
      ],
      likes: 18,
      comments: 5,
      isLiked: true,
      isShared: false,
      timestamp: "1 week ago",
    },
  ]);

  React.useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
  }, [user, router]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAcceptRequest = (requestId) => {
    setSuccess("Friend request accepted!");
    // In real app, this would update the database
  };

  const handleRejectRequest = (requestId) => {
    setSuccess("Friend request rejected!");
    // In real app, this would update the database
  };

  const handleAddFriend = (suggestionId) => {
    setSuccess("Friend request sent!");
    // In real app, this would send a friend request
  };

  const handleRemoveFriend = (friendId) => {
    setSuccess("Friend removed!");
    // In real app, this would remove the friend
  };

  const handleLikeTrip = (tripId) => {
    setSharedTrips(prev => prev.map(trip => 
      trip.id === tripId 
        ? { ...trip, isLiked: !trip.isLiked, likes: trip.isLiked ? trip.likes - 1 : trip.likes + 1 }
        : trip
    ));
  };

  const handleShareTrip = (trip) => {
    setSelectedTrip(trip);
    setShareDialogOpen(true);
  };

  const handleViewTripDetails = (trip) => {
    setSelectedTrip(trip);
    setTripDetailsOpen(true);
  };

  const handleSendMessage = (friend) => {
    setSelectedFriend(friend);
    setMessageDialogOpen(true);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setSuccess("Message sent!");
      setNewMessage("");
      setMessageDialogOpen(false);
    }
  };

  const shareTrip = () => {
    setSuccess("Trip shared successfully!");
    setShareDialogOpen(false);
  };

  const renderFriendsTab = () => (
    <Box>
      <TextField
        fullWidth
        placeholder="Search friends..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />
      
      <Grid container spacing={3}>
        {friends.map((friend) => (
          <Grid item xs={12} sm={6} md={4} key={friend.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: friend.status === "online" ? "success.main" : "grey.500",
                        }}
                      />
                    }
                  >
                    <Avatar src={friend.avatar} sx={{ width: 60, height: 60, mr: 2 }} />
                  </Badge>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {friend.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      @{friend.username} • {friend.lastActive}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Recent trip: {friend.recentTrip}
                </Typography>
                
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Message />}
                    onClick={() => handleSendMessage(friend)}
                  >
                    Message
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Share />}
                    onClick={() => handleViewTripDetails(sharedTrips.find(t => t.userId === friend.id))}
                  >
                    View Trips
                  </Button>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleRemoveFriend(friend.id)}
                  >
                    <PersonRemove />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderRequestsTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Pending Friend Requests ({friendRequests.length})
      </Typography>
      
      <List>
        {friendRequests.map((request) => (
          <ListItem key={request.id} divider>
            <ListItemAvatar>
              <Avatar src={request.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={request.fullName}
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    @{request.username}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {request.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {request.timestamp}
                  </Typography>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  color="success"
                  onClick={() => handleAcceptRequest(request.id)}
                >
                  <Check />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleRejectRequest(request.id)}
                >
                  <Close />
                </IconButton>
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderSuggestionsTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        People You May Know ({suggestions.length})
      </Typography>
      
      <Grid container spacing={3}>
        {suggestions.map((suggestion) => (
          <Grid item xs={12} sm={6} md={4} key={suggestion.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar src={suggestion.avatar} sx={{ width: 60, height: 60, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {suggestion.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      @{suggestion.username} • {suggestion.mutualFriends} mutual friends
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Interests:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {suggestion.interests.map((interest) => (
                      <Chip
                        key={interest}
                        label={interest}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
                
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<PersonAdd />}
                  onClick={() => handleAddFriend(suggestion.id)}
                >
                  Add Friend
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderSharedTripsTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Trips Shared by Friends ({sharedTrips.length})
      </Typography>
      
      <Grid container spacing={3}>
        {sharedTrips.map((trip) => (
          <Grid item xs={12} sm={6} md={4} key={trip.id}>
            <Card>
              <CardMedia
                component="img"
                image={trip.photos[0]}
                alt={trip.title}
                sx={{ height: 200 }}
              />
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar src={trip.user.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {trip.user.fullName}
                  </Typography>
                </Box>
                
                <Typography variant="h6" gutterBottom>
                  {trip.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {trip.description}
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Chip icon={<AccessTime />} label={trip.duration} size="small" />
                  <Chip icon={<AttachMoney />} label={trip.cost} size="small" />
                  <Chip icon={<LocationOn />} label={`${trip.places.length} places`} size="small" />
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={trip.isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
                    onClick={() => handleLikeTrip(trip.id)}
                  >
                    {trip.likes}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Comment />}
                  >
                    {trip.comments}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Share />}
                    onClick={() => handleShareTrip(trip)}
                  >
                    Share
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleViewTripDetails(trip)}
                    sx={{ ml: "auto" }}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: "#1976d2" }}>
          👥 Friends & Connections
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Connect with friends, share trips, and discover new travel companions
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label={`Friends (${friends.length})`} />
          <Tab label={`Requests (${friendRequests.length})`} />
          <Tab label={`Suggestions (${suggestions.length})`} />
          <Tab label={`Shared Trips (${sharedTrips.length})`} />
        </Tabs>
      </Paper>

      {activeTab === 0 && renderFriendsTab()}
      {activeTab === 1 && renderRequestsTab()}
      {activeTab === 2 && renderSuggestionsTab()}
      {activeTab === 3 && renderSharedTripsTab()}

      {/* Trip Details Dialog */}
      <Dialog
        open={tripDetailsOpen}
        onClose={() => setTripDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h5">
              {selectedTrip?.title}
            </Typography>
            <IconButton onClick={() => setTripDetailsOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedTrip && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Trip Details
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {selectedTrip.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                    <AccessTime color="action" />
                    <Typography variant="body2">{selectedTrip.duration}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                    <AttachMoney color="action" />
                    <Typography variant="body2">{selectedTrip.cost}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                    <Luggage color="action" />
                    <Typography variant="body2">Best: {selectedTrip.bestTime}</Typography>
                  </Box>
                </Box>
                
                <Typography variant="h6" gutterBottom>
                  Places Visited
                </Typography>
                <List>
                  {selectedTrip.places.map((place, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={place.name}
                        secondary={place.type}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Trip Map
                </Typography>
                <Box sx={{ height: 400, borderRadius: 2, overflow: "hidden" }}>
                  <MapComponent places={selectedTrip.places} />
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>

      {/* Share Trip Dialog */}
      <Dialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Share Trip</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Share "{selectedTrip?.title}" with your friends
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Add a personal message..."
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Share with:
            </Typography>
            {friends.map((friend) => (
              <Chip
                key={friend.id}
                label={friend.fullName}
                onClick={() => {}}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </DialogContent>
        <Box sx={{ p: 2, display: "flex", gap: 1 }}>
          <Button onClick={() => setShareDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={shareTrip}>
            Share Trip
          </Button>
        </Box>
      </Dialog>

      {/* Send Message Dialog */}
      <Dialog
        open={messageDialogOpen}
        onClose={() => setMessageDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Send Message to {selectedFriend?.fullName}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <Box sx={{ p: 2, display: "flex", gap: 1 }}>
          <Button onClick={() => setMessageDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={sendMessage} disabled={!newMessage.trim()}>
            Send Message
          </Button>
        </Box>
      </Dialog>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess("")}
        message={success}
      />
    </Container>
  );
}
