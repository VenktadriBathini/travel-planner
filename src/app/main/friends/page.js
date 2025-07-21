"use client";

import Link from "next/link";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

const mockFriends = [
  { id: "alice", name: "Alice Wonderland" },
  { id: "bob", name: "Bob Marley" },
  { id: "clara", name: "Clara Oswald" },
];

export default function FriendsPage() {
  const [friends, setFriends] = useState(mockFriends);
  const [invite, setInvite] = useState("");

  const handleInvite = () => {
    if (
      invite.trim() &&
      !friends.find((f) => f.id === invite.trim().toLowerCase())
    ) {
      setFriends([
        ...friends,
        { id: invite.trim().toLowerCase(), name: invite.trim() },
      ]);
      setInvite("");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 8, mb: 8 }}>
      <Stack direction="row" spacing={2} mb={2}>
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
          Your Friends
        </Typography>
        <Stack spacing={2} mb={4}>
          {friends.map((friend) => (
            <Button
              key={friend.id}
              component={Link}
              href={`/main/friends/${friend.id}`}
              variant="outlined"
              sx={{ fontWeight: 700, fontSize: "1.1rem" }}
            >
              {friend.name}
            </Button>
          ))}
        </Stack>
        <Typography variant="h6" fontWeight={700} color="#1976d2" mb={2}>
          Invite a Friend
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <TextField
            value={invite}
            onChange={(e) => setInvite(e.target.value)}
            placeholder="Enter friend's name"
            size="small"
            sx={{ background: "#fff", borderRadius: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleInvite}
            sx={{ fontWeight: 700 }}
          >
            Invite
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
