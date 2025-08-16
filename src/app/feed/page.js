"use client";
import React, { useState, useEffect, useRef } from "react";
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
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Share,
  BookmarkBorder,
  Bookmark,
  LocationOn,
  AccessTime,
  AttachMoney,
  Luggage,
  Map,
  Close,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import("../../components/MapComponent"), {
  ssr: false,
  loading: () => <CircularProgress />,
});

export default function FeedPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    if (isMounted) {
      fetchPosts();
    }
  }, [user, router, isMounted]);

  const fetchPosts = async () => {
    try {
      // Simulate API call to get posts
      const mockPosts = [
        {
          id: "post1",
          user: {
            id: "1",
            username: "sarah_adventures",
            fullName: "Sarah Johnson",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          },
          type: "trip_share",
          tripId: "1",
          content:
            "Just completed my amazing Florida adventure! 🌴☀️ From Disney magic to Key West sunsets, every moment was incredible. Check out my trip details for tips and recommendations! #Florida #Travel #Adventure",
          timestamp: "2024-03-22T15:30:00Z",
          likes: 24,
          comments: 8,
          shares: 3,
          isLiked: false,
          isBookmarked: false,
          photos: [
            {
              id: "pp1",
              url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
              caption: "Magic Kingdom magic ✨",
            },
            {
              id: "pp2",
              url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
              caption: "Key West sunset vibes 🌅",
            },
          ],
          location: "Florida, USA",
          tripDetails: {
            duration: "7 days",
            cost: "$2,500",
            bestTime: "March-May",
          },
          places: [
            {
              name: "Orlando, FL",
              coordinates: [28.5383, -81.3792],
              type: "Theme Parks",
            },
            {
              name: "Tampa, FL",
              coordinates: [27.9506, -82.4572],
              type: "City & Culture",
            },
            {
              name: "Miami, FL",
              coordinates: [25.7617, -80.1918],
              type: "Beach & Nightlife",
            },
            {
              name: "Key West, FL",
              coordinates: [24.5551, -81.78],
              type: "Island Paradise",
            },
          ],
        },
        {
          id: "post2",
          user: {
            id: "2",
            username: "mike_explorer",
            fullName: "Mike Chen",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          },
          type: "photo_share",
          tripId: "2",
          content:
            "California coast in the springtime is pure magic! 🌸✨ The wildflowers along the Pacific Coast Highway were absolutely breathtaking. #California #Spring #Travel",
          timestamp: "2024-02-16T12:00:00Z",
          likes: 18,
          comments: 5,
          shares: 2,
          isLiked: true,
          isBookmarked: false,
          photos: [
            {
              id: "pp3",
              url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop",
              caption: "Golden Gate Bridge with spring flowers 🌸",
            },
          ],
          location: "California, USA",
          tripDetails: {
            duration: "7 days",
            cost: "$3,500",
            bestTime: "September-November",
          },
          places: [
            {
              name: "San Francisco, CA",
              coordinates: [37.7749, -122.4194],
              type: "City & Culture",
            },
            {
              name: "Big Sur, CA",
              coordinates: [36.2704, -121.8081],
              type: "Scenic Beauty",
            },
          ],
        },
        {
          id: "post3",
          user: {
            id: "3",
            username: "emma_wanderlust",
            fullName: "Emma Rodriguez",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          },
          type: "travel_tip",
          tripId: "3",
          content:
            "Pro tip for NYC travelers: Visit Central Park early in the morning! You'll have the place almost to yourself and can experience the peaceful atmosphere without the crowds. The walking trails are perfect around 7 AM too! 🏞️ #NYC #TravelTips #CentralPark",
          timestamp: "2024-01-14T08:00:00Z",
          likes: 32,
          comments: 12,
          shares: 8,
          isLiked: false,
          isBookmarked: true,
          photos: [
            {
              id: "pp4",
              url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
              caption: "Peaceful morning at Central Park 🏞️",
            },
          ],
          location: "New York, USA",
          tripDetails: {
            duration: "7 days",
            cost: "$3,000",
            bestTime: "March-May, September-November",
          },
          places: [
            {
              name: "Manhattan, NY",
              coordinates: [40.7589, -73.9851],
              type: "City & Culture",
            },
            {
              name: "Central Park, NY",
              coordinates: [40.7829, -73.9654],
              type: "Nature & Recreation",
            },
          ],
        },
      ];

      if (isMounted) {
        setPosts(mockPosts);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  const handleLike = (postId) => {
    if (!isMounted) return;
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleBookmark = (postId) => {
    if (!isMounted) return;
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  const handleComment = (postId) => {
    if (!isMounted) return;
    const post = posts.find((p) => p.id === postId);
    setSelectedPost(post);
    setCommentDialogOpen(true);
  };

  const submitComment = () => {
    if (newComment.trim() && isMounted) {
      // Add comment logic here
      setNewComment("");
      setCommentDialogOpen(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <CircularProgress size={60} sx={{ color: "white" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 2,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "white",
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              mb: 2,
            }}
          >
            🌍 Travel Feed
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.9)",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Discover amazing adventures from your friends and the travel
            community
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Main Feed */}
          <Grid item xs={12} md={8}>
            {posts.map((post) => (
              <Card
                key={post.id}
                sx={{
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {/* Post Header */}
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      src={post.user.avatar}
                      alt={post.user.fullName}
                      sx={{
                        width: 50,
                        height: 50,
                        mr: 2,
                        border: "3px solid rgba(102, 126, 234, 0.3)",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "#2c3e50" }}
                      >
                        {post.user.fullName}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                        @{post.user.username} • {formatTimeAgo(post.timestamp)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Post Content */}
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, lineHeight: 1.6, color: "#34495e" }}
                  >
                    {post.content}
                  </Typography>

                  {/* Trip Details */}
                  <Paper
                    sx={{
                      p: 2,
                      mb: 2,
                      background:
                        "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                      borderRadius: 2,
                      border: "1px solid rgba(102, 126, 234, 0.2)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 1,
                      }}
                    >
                      <LocationOn sx={{ color: "#667eea" }} />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "#2c3e50" }}
                      >
                        {post.location}
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AccessTime sx={{ color: "#7f8c8d" }} />
                          <Typography variant="body2" sx={{ color: "#34495e" }}>
                            {post.tripDetails.duration}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AttachMoney sx={{ color: "#7f8c8d" }} />
                          <Typography variant="body2" sx={{ color: "#34495e" }}>
                            {post.tripDetails.cost}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Luggage sx={{ color: "#7f8c8d" }} />
                          <Typography variant="body2" sx={{ color: "#34495e" }}>
                            Best: {post.tripDetails.bestTime}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Photos */}
                  {post.photos && post.photos.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Grid container spacing={1}>
                        {post.photos.map((photo) => (
                          <Grid item xs={6} key={photo.id}>
                            <CardMedia
                              component="img"
                              image={photo.url}
                              alt={photo.caption}
                              sx={{
                                height: 200,
                                borderRadius: 2,
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  opacity: 0.9,
                                  transform: "scale(1.02)",
                                },
                              }}
                            />
                            {photo.caption && (
                              <Typography
                                variant="caption"
                                sx={{
                                  mt: 1,
                                  display: "block",
                                  color: "#7f8c8d",
                                  fontStyle: "italic",
                                }}
                              >
                                {photo.caption}
                              </Typography>
                            )}
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {/* Map Toggle */}
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<Map />}
                      onClick={() =>
                        setShowMap(post.id === showMap ? null : post.id)
                      }
                      sx={{
                        mb: 2,
                        borderColor: "#667eea",
                        color: "#667eea",
                        "&:hover": {
                          borderColor: "#764ba2",
                          backgroundColor: "rgba(102, 126, 234, 0.1)",
                        },
                      }}
                    >
                      {showMap === post.id
                        ? "Hide Map"
                        : "Show Map with Places"}
                    </Button>

                    {showMap === post.id && post.places && (
                      <Box
                        sx={{
                          height: 400,
                          borderRadius: 2,
                          overflow: "hidden",
                          border: "2px solid rgba(102, 126, 234, 0.3)",
                        }}
                      >
                        <MapComponent places={post.places} />
                      </Box>
                    )}
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                      startIcon={
                        post.isLiked ? (
                          <Favorite sx={{ color: "#e74c3c" }} />
                        ) : (
                          <FavoriteBorder />
                        )
                      }
                      onClick={() => handleLike(post.id)}
                      sx={{
                        color: post.isLiked ? "#e74c3c" : "#7f8c8d",
                        "&:hover": {
                          backgroundColor: "rgba(231, 76, 60, 0.1)",
                        },
                      }}
                    >
                      {post.likes}
                    </Button>
                    <Button
                      startIcon={<ChatBubbleOutline />}
                      onClick={() => handleComment(post.id)}
                      sx={{
                        color: "#7f8c8d",
                        "&:hover": {
                          backgroundColor: "rgba(102, 126, 234, 0.1)",
                        },
                      }}
                    >
                      {post.comments}
                    </Button>
                    <Button
                      startIcon={<Share />}
                      sx={{
                        color: "#7f8c8d",
                        "&:hover": {
                          backgroundColor: "rgba(102, 126, 234, 0.1)",
                        },
                      }}
                    >
                      {post.shares}
                    </Button>
                    <IconButton
                      onClick={() => handleBookmark(post.id)}
                      sx={{
                        ml: "auto",
                        color: post.isBookmarked ? "#667eea" : "#7f8c8d",
                        "&:hover": {
                          backgroundColor: "rgba(102, 126, 234, 0.1)",
                        },
                      }}
                    >
                      {post.isBookmarked ? (
                        <Bookmark sx={{ color: "#667eea" }} />
                      ) : (
                        <BookmarkBorder />
                      )}
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                position: "sticky",
                top: 100,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "#2c3e50",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                🗺️ Quick Actions
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  href="/create-trip"
                  sx={{
                    py: 1.5,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  ✈️ Plan New Trip
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  href="/explore"
                  sx={{
                    py: 1.5,
                    borderColor: "#667eea",
                    color: "#667eea",
                    "&:hover": {
                      borderColor: "#764ba2",
                      backgroundColor: "rgba(102, 126, 234, 0.1)",
                    },
                  }}
                >
                  🔍 Explore Destinations
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  href="/friends"
                  sx={{
                    py: 1.5,
                    borderColor: "#667eea",
                    color: "#667eea",
                    "&:hover": {
                      borderColor: "#764ba2",
                      backgroundColor: "rgba(102, 126, 234, 0.1)",
                    },
                  }}
                >
                  👥 Find Friends
                </Button>
              </Box>

              <Divider
                sx={{ my: 2, borderColor: "rgba(102, 126, 234, 0.2)" }}
              />

              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "#2c3e50",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                🌟 Trending Destinations
              </Typography>
              <List>
                {["Florida", "California", "New York", "Colorado", "Texas"].map(
                  (destination) => (
                    <ListItem key={destination} sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: "rgba(102, 126, 234, 0.8)",
                            color: "white",
                            fontWeight: 600,
                          }}
                        >
                          {destination.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={destination}
                        secondary={`${
                          Math.floor(Math.random() * 50) + 10
                        } travelers`}
                        primaryTypographyProps={{
                          sx: { color: "#2c3e50", fontWeight: 600 },
                        }}
                        secondaryTypographyProps={{
                          sx: { color: "#7f8c8d" },
                        }}
                      />
                    </ListItem>
                  )
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Comment Dialog */}
        <Dialog
          open={commentDialogOpen}
          onClose={() => setCommentDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.2)",
            },
          }}
        >
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#2c3e50", fontWeight: 600 }}
              >
                Comments
              </Typography>
              <IconButton
                onClick={() => setCommentDialogOpen(false)}
                sx={{ color: "#7f8c8d" }}
              >
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(102, 126, 234, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(102, 126, 234, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#667eea",
                    },
                  },
                }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={submitComment}
              disabled={!newComment.trim()}
              fullWidth
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                },
                "&:disabled": {
                  background: "#bdc3c7",
                },
              }}
            >
              Post Comment
            </Button>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
