"use client";
import { useParams } from "next/navigation";
import { Box, Typography, Paper, Stack, Button } from "@mui/material";
import Link from "next/link";

const mockFriends = [
  { id: "alice", name: "Alice Wonderland" },
  { id: "bob", name: "Bob Marley" },
  { id: "clara", name: "Clara Oswald" },
];

const mockTrips = {
  alice: [
    {
      title: "Paris Adventure",
      description: "Romantic trip to Paris.",
      places: ["Eiffel Tower", "Louvre", "Montmartre"],
    },
    {
      title: "London Calling",
      description: "Exploring London landmarks.",
      places: ["Big Ben", "London Eye"],
    },
  ],
  bob: [
    {
      title: "Jamaica Vibes",
      description: "Island fun and reggae.",
      places: ["Kingston", "Montego Bay"],
    },
  ],
  clara: [
    {
      title: "Doctor Who Tour",
      description: "Timey-wimey adventures.",
      places: ["Cardiff", "London"],
    },
  ],
};

export default function FriendTripsPage() {
  const params = useParams();
  const friendId = params?.friendId;
  const friend = mockFriends.find((f) => f.id === friendId);
  const trips = mockTrips[friendId] || [];

  if (!friend) {
    return (
      <Typography variant="h5" color="error">
        Friend not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 8, mb: 8 }}>
      <Stack direction="row" spacing={2} mb={2}>
        <Button component={Link} href="/main/friends" variant="outlined">
          Back to Friends
        </Button>
        <Button component={Link} href="/main" variant="outlined">
          Back to Dashboard
        </Button>
        <Button component={Link} href="/" variant="outlined">
          Home
        </Button>
      </Stack>
      <Paper
        sx={{
          p: 5,
          borderRadius: 4,
          background: "rgba(255,255,255,0.95)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={900}
          color="#1976d2"
          sx={{ mb: 3 }}
        >
          {friend.name}'s Trips
        </Typography>
        {trips.length === 0 ? (
          <Typography color="text.secondary">
            No trips found for this friend.
          </Typography>
        ) : (
          <Stack spacing={3}>
            {trips.map((trip, idx) => (
              <Paper
                key={idx}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: "rgba(25,118,210,0.07)",
                }}
              >
                <Typography variant="h6" fontWeight={700} color="#1976d2">
                  {trip.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  {trip.description}
                </Typography>
                <Typography color="#ff9800">
                  Places: {trip.places.join(", ")}
                </Typography>
              </Paper>
            ))}
          </Stack>
        )}
      </Paper>
    </Box>
  );
}
