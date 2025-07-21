"use client";
import { useParams } from "next/navigation";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";

const featureList = [
  {
    title: "Unlimited Places",
    description:
      "Add as many places as you want to your trip, unlike Google Maps.",
    icon: "🌍",
    slug: "unlimited-places",
  },
  {
    title: "Smart Route Planning",
    description: "Auto-arrange your route for the best travel experience.",
    icon: "🗺️",
    slug: "smart-route-planning",
  },
  {
    title: "Cost & Tips",
    description: "Add comments, costs, and tips for each place.",
    icon: "💡",
    slug: "cost-tips",
  },
  {
    title: "Social & Sharing",
    description:
      "Share your trip or places with friends, comment, and request advice.",
    icon: "🤝",
    slug: "social-sharing",
  },
  {
    title: "Map Memories",
    description: "See everywhere you’ve traveled on a beautiful map.",
    icon: "📍",
    slug: "map-memories",
  },
];

export default function FeaturePage() {
  const params = useParams();
  const slug = params?.slug;
  const feature = featureList.find((f) => f.slug === slug);
  const [desc, setDesc] = useState(feature ? feature.description : "");
  const [edit, setEdit] = useState(false);

  if (!feature) {
    return (
      <Typography variant="h5" color="error">
        Feature not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 8, mb: 8 }}>
      <Paper
        sx={{
          p: 5,
          borderRadius: 4,
          background: "rgba(255,255,255,0.95)",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" sx={{ mb: 2 }}>
          {feature.icon}
        </Typography>
        <Typography
          variant="h4"
          fontWeight={900}
          color="#1976d2"
          sx={{ mb: 2 }}
        >
          {feature.title}
        </Typography>
        {edit ? (
          <TextField
            multiline
            minRows={2}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {desc}
          </Typography>
        )}
        <Button
          variant="outlined"
          onClick={() => setEdit((e) => !e)}
          sx={{ mt: 1 }}
        >
          {edit ? "Save" : "Edit Description"}
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          [This info is stored only in memory and will reset on refresh.]
        </Typography>
      </Paper>
    </Box>
  );
}
