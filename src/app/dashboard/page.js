"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Modal,
  Chip,
  Divider,
  Avatar,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import dynamic from "next/dynamic";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Import Leaflet CSS and fix markers only on client side
let L;
if (typeof window !== "undefined") {
  import("leaflet/dist/leaflet.css");
  L = require("leaflet");
  
  // Fix for default markers in react-leaflet
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}
import { useSearchParams } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import GroupIcon from "@mui/icons-material/Group";
import DirectionsIcon from "@mui/icons-material/Directions";



// Unified sampleTrips data (same as landing page)
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
        coords: [28.5383, -81.3792],
      },
      {
        name: "Tampa",
        activities: ["Busch Gardens", "Tampa Riverwalk"],
        cost: "$200/day",
        coords: [27.9506, -82.4572],
      },
      {
        name: "Miami",
        activities: ["South Beach", "Wynwood Walls"],
        cost: "$350/day",
        coords: [25.7617, -80.1918],
      },
      {
        name: "Key West",
        activities: ["Duval Street", "Mallory Square"],
        cost: "$250/day",
        coords: [24.5551, -81.78],
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
    title: "Paris City Break",
    description: "Romantic trip to Paris with unlimited sightseeing.",
    places: [
      {
        name: "Eiffel Tower",
        activities: ["Climb the tower", "Picnic nearby"],
        cost: "$50",
        coords: [48.8584, 2.2945],
      },
      {
        name: "Louvre Museum",
        activities: ["See the Mona Lisa"],
        cost: "$30",
        coords: [48.8606, 2.3376],
      },
    ],
    comments: [{ user: "Clara", text: "The Louvre is incredible!" }],
    photos: [
      "https://images.unsplash.com/photo-1502602898535-0b7b0b7b0b7b?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: 3,
    title: "Tokyo Exploration",
    description: "Modern meets tradition in Japan's capital.",
    places: [
      {
        name: "Shibuya",
        activities: ["Crossing", "Shopping"],
        cost: "$100/day",
        coords: [35.6595, 139.7005],
      },
      {
        name: "Asakusa",
        activities: ["Senso-ji Temple"],
        cost: "$20",
        coords: [35.7148, 139.7967],
      },
    ],
    comments: [{ user: "Daisuke", text: "Senso-ji is so peaceful." }],
    photos: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80",
    ],
  },
];

// Smarter packing list suggestion logic (mock for demo)
function getGeneralPackingList() {
  return [
    { item: "Passport/ID", reason: "Required for travel" },
    { item: "Phone & Charger", reason: "Stay connected and take photos" },
    { item: "Toiletries", reason: "Personal hygiene" },
    { item: "Travel Insurance", reason: "Safety first" },
    { item: "Medications", reason: "Health essentials" },
  ];
}

function getPlacePackingList(place) {
  const coldPlaces = ["Paris", "Asakusa", "Key West"];
  const hotPlaces = ["Miami", "Orlando", "Tampa", "Shibuya"];
  const rainyPlaces = ["Key West", "Tokyo"];
  const nightlifePlaces = ["Miami", "Shibuya"];
  const museumPlaces = ["Paris", "Asakusa"];
  const packing = [];
  if (coldPlaces.includes(place.name)) {
    packing.push({ item: "Jacket/Coat", reason: "Cold weather expected" });
    packing.push({ item: "Warm Hat/Gloves", reason: "For chilly days/nights" });
  }
  if (hotPlaces.includes(place.name)) {
    packing.push({ item: "Sunscreen", reason: "Protect from sunburn" });
    packing.push({ item: "Sunglasses", reason: "Bright sunny days" });
    packing.push({ item: "Hat/Cap", reason: "Shade from the sun" });
  }
  if (rainyPlaces.includes(place.name)) {
    packing.push({ item: "Umbrella/Raincoat", reason: "Rain is likely" });
  }
  if (nightlifePlaces.includes(place.name)) {
    packing.push({ item: "Party Wear", reason: "Enjoy the nightlife" });
  }
  if (museumPlaces.includes(place.name)) {
    packing.push({
      item: "Notebook",
      reason: "Jot down interesting facts at museums",
    });
  }
  if (place.activities.some((a) => a.toLowerCase().includes("beach"))) {
    packing.push({ item: "Swimwear", reason: "For the beach" });
    packing.push({ item: "Flip-flops", reason: "Beach footwear" });
    packing.push({ item: "Beach Towel", reason: "Relax on the sand" });
  }
  if (place.activities.some((a) => a.toLowerCase().includes("hiking"))) {
    packing.push({ item: "Hiking Boots", reason: "For hiking trails" });
    packing.push({ item: "Backpack", reason: "Carry essentials on hikes" });
  }
  return packing;
}

// Mock community suggestions for demo
const communitySuggestions = {
  Miami: ["Mosquito Repellent", "Reusable Water Bottle"],
  Paris: ["Power Adapter (EU)", "Comfortable Walking Shoes"],
  "Key West": ["Snorkel Gear"],
  Orlando: ["Rain Poncho"],
  Tampa: ["Camera"],
  Shibuya: ["Transit Card"],
  Asakusa: ["Temple Etiquette Guide"],
};

// Mock friends who visited
const friendsVisited = [
  { name: "Alice", avatar: "A" },
  { name: "Bob", avatar: "B" },
  { name: "Clara", avatar: "C" },
];

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get("demo") === "true";
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [suggestDialog, setSuggestDialog] = useState({
    open: false,
    place: null,
  });
  const [suggestionText, setSuggestionText] = useState("");
  const [shareDialog, setShareDialog] = useState(false);
  const [adviceDialog, setAdviceDialog] = useState(false);
  const [itineraryDialog, setItineraryDialog] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before rendering map
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {isDemo && (
          <Paper
            sx={{
              mb: 4,
              p: 2,
              background: "rgba(25, 118, 210, 0.15)",
              border: "1px solid #1976d2",
              color: "#1976d2",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              🎉 Demo Mode
            </Typography>
            <Typography variant="body2">
              Explore all features with sample data.{" "}
              <b>Login or sign up to create your own trips!</b>
            </Typography>
          </Paper>
        )}
        <Typography
          variant="h3"
          fontWeight={800}
          color="white"
          align="center"
          sx={{ mb: 6, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
        >
          {isDemo ? "Demo Trips" : "Your Trips"}
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {sampleTrips.map((trip) => (
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
                onClick={() => setSelectedTrip(trip)}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    {trip.title}
                  </Typography>
                  <Typography variant="body2" color="#e0e0e0" sx={{ mb: 2 }}>
                    {trip.description}
                  </Typography>
                  <Typography variant="body2" color="#90caf9" sx={{ mb: 1 }}>
                    Places: {trip.places.map((p) => p.name).join(", ")}
                  </Typography>
                  <Typography variant="caption" color="#ffe082">
                    {trip.comments.length} comments, {trip.photos.length} photos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Trip Details Modal */}
        <Modal open={!!selectedTrip} onClose={() => setSelectedTrip(null)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "95vw", md: 900 },
              maxHeight: "90vh",
              overflowY: "auto",
              bgcolor: "rgba(30,30,40,0.98)",
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
              color: "white",
            }}
          >
            {selectedTrip && (
              <>
                {/* Modal Header with Actions */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h4" fontWeight={800}>
                    {selectedTrip.title}
                  </Typography>
                  <Box>
                    <IconButton
                      color="info"
                      onClick={() => setShareDialog(true)}
                      title="Share Trip"
                    >
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      color="info"
                      onClick={() => setAdviceDialog(true)}
                      title="Request Advice"
                    >
                      <HelpOutlineIcon />
                    </IconButton>
                    <IconButton
                      color="info"
                      onClick={() => setItineraryDialog(true)}
                      title="Request Itinerary"
                    >
                      <DirectionsIcon />
                    </IconButton>
                  </Box>
                </Box>
                {/* Friends Who Visited */}
                <Box
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <GroupIcon sx={{ color: "#90caf9" }} />
                  <Typography variant="body2" color="#90caf9" sx={{ mr: 1 }}>
                    Friends who visited:
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {friendsVisited.map((f) => (
                      <Avatar
                        key={f.name}
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: "#1976d2",
                          fontSize: 16,
                        }}
                      >
                        {f.avatar}
                      </Avatar>
                    ))}
                  </Stack>
                </Box>
                <Typography variant="body1" color="#bdbdbd" sx={{ mb: 2 }}>
                  {selectedTrip.description}
                </Typography>
                <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.2)" }} />
                {/* Trip Roadmap */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    Trip Roadmap
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    {selectedTrip.places.map((place, idx) => (
                      <Box
                        key={place.name}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: "#ff9800",
                            fontWeight: 700,
                          }}
                        >
                          {idx + 1}
                        </Avatar>
                        <Typography variant="subtitle2" color="#ffe082">
                          {place.name}
                        </Typography>
                        {idx < selectedTrip.places.length - 1 && (
                          <DirectionsIcon sx={{ color: "#90caf9", mx: 1 }} />
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Box>
                {/* Map with pins and route */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    Trip Map & Route
                  </Typography>
                  {isMounted ? (
                    <MapContainer
                      center={selectedTrip.places[0].coords}
                      zoom={6}
                      style={{ height: 300, width: "100%", borderRadius: 12 }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      {selectedTrip.places.map((place, idx) => (
                        <Marker key={place.name} position={place.coords}>
                          <Popup>
                            <Typography variant="subtitle2">
                              {place.name}
                            </Typography>
                            <Typography variant="caption">
                              {place.activities.join(", ")}
                            </Typography>
                          </Popup>
                        </Marker>
                      ))}
                      {/* Route polyline */}
                      <Polyline
                        positions={selectedTrip.places.map((p) => p.coords)}
                        color="#1976d2"
                      />
                    </MapContainer>
                  ) : (
                    <Box
                      sx={{
                        height: 300,
                        width: "100%",
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      <Typography>Loading map...</Typography>
                    </Box>
                  )}
                </Box>
                {/* Places List */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    Places & Activities
                  </Typography>
                  <Stack spacing={2}>
                    {selectedTrip.places.map((place, idx) => (
                      <Paper
                        key={place.name}
                        sx={{
                          p: 2,
                          background: "rgba(255,255,255,0.08)",
                          color: "white",
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight={700}>
                          {idx + 1}. {place.name}
                        </Typography>
                        <Typography variant="body2" color="#90caf9">
                          Activities: {place.activities.join(", ")}
                        </Typography>
                        <Typography variant="body2" color="#ffe082">
                          Cost: {place.cost}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
                {/* Photos */}
                {selectedTrip.photos.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                      Photos
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      {selectedTrip.photos.map((url, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            width: 120,
                            height: 80,
                            borderRadius: 2,
                            overflow: "hidden",
                            boxShadow: 2,
                          }}
                        >
                          <img
                            src={url}
                            alt="Trip"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}
                {/* Comments */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    Comments
                  </Typography>
                  <Stack spacing={1}>
                    {selectedTrip.comments.map((c, idx) => (
                      <Paper
                        key={idx}
                        sx={{
                          p: 1.5,
                          background: "rgba(255,255,255,0.10)",
                          color: "white",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 28,
                            height: 28,
                            bgcolor: "#1976d2",
                            fontSize: 16,
                          }}
                        >
                          {c.user[0]}
                        </Avatar>
                        <Typography variant="body2">
                          <b>{c.user}:</b> {c.text}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
                {/* Packing List */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                    Suggested Packing List
                  </Typography>
                  {/* General Essentials */}
                  <Typography
                    variant="subtitle2"
                    color="#90caf9"
                    sx={{ mb: 1 }}
                  >
                    General Essentials
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    sx={{ mb: 2 }}
                  >
                    {getGeneralPackingList().map((p, idx) => (
                      <Tooltip key={idx} title={p.reason} arrow>
                        <Chip
                          label={p.item}
                          color="info"
                          variant="outlined"
                          sx={{ mb: 1 }}
                        />
                      </Tooltip>
                    ))}
                  </Stack>
                  {/* Place-specific lists */}
                  {selectedTrip.places.map((place, idx) => {
                    const placeList = getPlacePackingList(place);
                    if (placeList.length === 0) return null;
                    return (
                      <Box key={place.name} sx={{ mb: 2 }}>
                        <Typography
                          variant="subtitle2"
                          color="#ffe082"
                          sx={{ mb: 0.5 }}
                        >
                          For {place.name}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          sx={{ mb: 1 }}
                        >
                          {placeList.map((p, i) => (
                            <Tooltip key={i} title={p.reason} arrow>
                              <Chip
                                label={p.item}
                                color="success"
                                variant="outlined"
                                sx={{ mb: 1 }}
                              />
                            </Tooltip>
                          ))}
                        </Stack>
                        {/* Community Suggestions */}
                        <Typography
                          variant="caption"
                          color="#90caf9"
                          sx={{ mb: 0.5, display: "block" }}
                        >
                          Community Suggestions
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          sx={{ mb: 1 }}
                        >
                          {(communitySuggestions[place.name] || []).map(
                            (item, i) => (
                              <Chip
                                key={i}
                                label={item}
                                color="warning"
                                variant="outlined"
                                size="small"
                              />
                            )
                          )}
                        </Stack>
                        <Button
                          size="small"
                          variant="text"
                          color="info"
                          sx={{ textTransform: "none", fontWeight: 600, pl: 0 }}
                          onClick={() =>
                            setSuggestDialog({ open: true, place: place.name })
                          }
                        >
                          Suggest an item
                        </Button>
                      </Box>
                    );
                  })}
                </Box>
                <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }} />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ fontWeight: 700, py: 1.5, fontSize: "1.1rem" }}
                  onClick={() => setSelectedTrip(null)}
                >
                  Close
                </Button>
              </>
            )}
          </Box>
        </Modal>
        {/* Suggestion Dialog (mock for demo) */}
        <Dialog
          open={suggestDialog.open}
          onClose={() => setSuggestDialog({ open: false, place: null })}
        >
          <DialogTitle>Suggest an item for {suggestDialog.place}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Item suggestion"
              fullWidth
              variant="standard"
              value={suggestionText}
              onChange={(e) => setSuggestionText(e.target.value)}
              helperText="In the real app, your suggestion will help future travelers!"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setSuggestDialog({ open: false, place: null })}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setSuggestDialog({ open: false, place: null });
                setSuggestionText("");
              }}
            >
              Submit (Demo)
            </Button>
          </DialogActions>
        </Dialog>
        {/* Share Dialog (mock for demo) */}
        <Dialog open={shareDialog} onClose={() => setShareDialog(false)}>
          <DialogTitle>Share Trip</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Share this trip with your friends! (Demo only)
            </Typography>
            <TextField
              fullWidth
              value="https://yourapp.com/trip/demo123"
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />
            <Typography variant="caption" color="text.secondary">
              Sign up to generate real shareable links.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShareDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
        {/* Request Advice Dialog (mock for demo) */}
        <Dialog open={adviceDialog} onClose={() => setAdviceDialog(false)}>
          <DialogTitle>Request Advice</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Ask friends or past visitors for tips and recommendations! (Demo
              only)
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Sign up to request advice from real users.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAdviceDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
        {/* Request Itinerary Dialog (mock for demo) */}
        <Dialog
          open={itineraryDialog}
          onClose={() => setItineraryDialog(false)}
        >
          <DialogTitle>Request Itinerary</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Want to save this trip to your own planner? (Demo only)
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Sign up to request and save this trip!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setItineraryDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
