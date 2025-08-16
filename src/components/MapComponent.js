"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";
import { LocationOn, Info } from "@mui/icons-material";

// Simple map component using HTML/CSS for demo purposes
// In a real app, you would use Google Maps API or Mapbox
export default function MapComponent({ places }) {
  const mapRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (mapRef.current && places && places.length > 0 && isMounted) {
      // Create a simple visual representation of the map
      renderMap();
    }
  }, [places, isMounted]);

  const renderMap = () => {
    if (!mapRef.current || !places || places.length === 0 || !isMounted) return;

    const mapContainer = mapRef.current;
    mapContainer.innerHTML = "";

    // Create map background
    const mapBackground = document.createElement("div");
    mapBackground.style.cssText = `
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
      position: relative;
      border-radius: 8px;
      overflow: hidden;
    `;

    // Add grid lines for map effect
    for (let i = 0; i < 10; i++) {
      const gridLine = document.createElement("div");
      gridLine.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 1px;
      `;

      if (i % 2 === 0) {
        // Vertical lines
        gridLine.style.width = "1px";
        gridLine.style.height = "100%";
        gridLine.style.left = `${i * 10}%`;
      } else {
        // Horizontal lines
        gridLine.style.height = "1px";
        gridLine.style.width = "100%";
        gridLine.style.top = `${i * 10}%`;
      }

      mapBackground.appendChild(gridLine);
    }

    // Add places as pins
    places.forEach((place, index) => {
      const pin = document.createElement("div");
      const pinSize = 20;

      // Calculate position based on coordinates (simplified)
      // In real app, you'd use proper coordinate mapping
      const x = 20 + index * 20 + Math.random() * 20;
      const y = 30 + index * 15 + Math.random() * 20;

      pin.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${pinSize}px;
        height: ${pinSize}px;
        background: #f44336;
        border: 3px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transform: translate(-50%, -50%);
        z-index: 10;
        transition: all 0.3s ease;
      `;

      // Add pin pulse animation
      const pulse = document.createElement("div");
      pulse.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background: rgba(244, 67, 54, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: pulse 2s infinite;
      `;

      // Add pulse keyframes
      if (!document.querySelector("#pulse-keyframes")) {
        const style = document.createElement("style");
        style.id = "pulse-keyframes";
        style.textContent = `
          @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      pin.appendChild(pulse);

      // Add place label
      const label = document.createElement("div");
      label.style.cssText = `
        position: absolute;
        top: ${pinSize + 5}px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 10px;
        font-weight: 600;
        color: #333;
        white-space: nowrap;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      `;
      label.textContent = place.name;

      pin.appendChild(label);

      // Show label on hover
      pin.addEventListener("mouseenter", () => {
        if (isMounted) {
          label.style.opacity = "1";
          pin.style.transform = "translate(-50%, -50%) scale(1.2)";
        }
      });

      pin.addEventListener("mouseleave", () => {
        if (isMounted) {
          label.style.opacity = "0";
          pin.style.transform = "translate(-50%, -50%) scale(1)";
        }
      });

      // Add click event for place details
      pin.addEventListener("click", () => {
        if (isMounted) {
          showPlaceDetails(place);
        }
      });

      mapBackground.appendChild(pin);
    });

    // Add map title
    const mapTitle = document.createElement("div");
    mapTitle.style.cssText = `
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(255, 255, 255, 0.9);
      padding: 8px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      color: #1976d2;
      backdrop-filter: blur(10px);
    `;
    mapTitle.textContent = `📍 ${places.length} Places Visited`;
    mapBackground.appendChild(mapTitle);

    mapContainer.appendChild(mapBackground);
  };

  const showPlaceDetails = (place) => {
    if (!isMounted) return;

    // Create a simple popup for place details
    const popup = document.createElement("div");
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 1000;
      max-width: 300px;
      text-align: center;
    `;

    popup.innerHTML = `
      <div style="margin-bottom: 15px;">
        <LocationOn style="color: #f44336; font-size: 40px;" />
      </div>
      <h3 style="margin: 0 0 10px 0; color: #1976d2;">${place.name}</h3>
      <p style="margin: 0 0 15px 0; color: #666;">Type: ${place.type}</p>
      <div style="display: flex; justify-content: center; gap: 10px;">
        <button onclick="this.parentElement.parentElement.remove()" 
                style="padding: 8px 16px; border: none; background: #1976d2; color: white; border-radius: 6px; cursor: pointer;">
          Close
        </button>
      </div>
    `;

    // Add overlay
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 999;
    `;
    overlay.addEventListener("click", () => {
      if (isMounted) {
        popup.remove();
        overlay.remove();
      }
    });

    if (isMounted) {
      document.body.appendChild(overlay);
      document.body.appendChild(popup);
    }
  };

  if (!places || places.length === 0) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          borderRadius: 2,
        }}
      >
        <Typography color="text.secondary">
          No places to display on map
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

      {/* Places Legend */}
      <Paper
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
          p: 1.5,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, display: "block", mb: 1 }}
        >
          Places Visited:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {places.map((place, index) => (
            <Chip
              key={index}
              icon={<LocationOn />}
              label={place.name}
              size="small"
              variant="outlined"
              sx={{ fontSize: "10px" }}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
