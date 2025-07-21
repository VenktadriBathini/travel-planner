"use client";
import Image from "next/image";
import Link from "next/link";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Box } from "@mui/material";
import theme from "../theme";
import { usePathname } from "next/navigation";

// Add a style tag for globe rotation
const globeSpinStyle = `
@keyframes globe-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.globe-rotate {
  animation: globe-spin 3s linear infinite;
}
`;

export default function RootLayout({ children }) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <html lang="en">
      <head>
        <style>{globeSpinStyle}</style>
      </head>
      <body
        style={{
          minHeight: "100vh",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        {/* Globe SVG background, only show if not on /main */}
        {pathname !== "/main" && (
          <svg
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
              width: "80vw",
              height: "80vh",
              opacity: 0.1,
              pointerEvents: "none",
            }}
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="#1976d2"
                stroke="#fff"
                strokeWidth="4"
              />
              <ellipse
                cx="200"
                cy="200"
                rx="140"
                ry="180"
                fill="none"
                stroke="#90caf9"
                strokeWidth="3"
              />
              <ellipse
                cx="200"
                cy="200"
                rx="180"
                ry="80"
                fill="none"
                stroke="#90caf9"
                strokeWidth="3"
              />
              <path
                d="M200 20 A180 180 0 0 1 380 200"
                stroke="#fff"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M200 380 A180 180 0 0 1 20 200"
                stroke="#fff"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M100 200 Q200 100 300 200 Q200 300 100 200 Z"
                fill="#64b5f6"
                fillOpacity="0.7"
              />
              <path
                d="M150 150 Q200 120 250 150 Q220 180 150 150 Z"
                fill="#fff"
                fillOpacity="0.5"
              />
            </g>
          </svg>
        )}
        {/* Header with logo and app name on the left, nav on the right */}
        {pathname !== "/main" && (
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "1rem 2rem 0.5rem 2rem",
              background: "rgba(255,255,255,0.18)",
              borderBottom: "1px solid #e0e0e0",
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}
          >
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Image
                src="/logo.svg"
                alt="Worldwise Logo"
                width={40}
                height={40}
                className="globe-rotate"
              />
              <span
                style={{
                  fontWeight: 900,
                  fontSize: "2.2rem",
                  letterSpacing: "2px",
                  color: "#1976d2",
                  textShadow: "0 2px 8px rgba(0,0,0,0.18)",
                  fontFamily: "Montserrat, Verdana, Arial, sans-serif",
                  marginLeft: "0.5rem",
                }}
              >
                Worldwise
              </span>
            </Link>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Button
                component={Link}
                href="/"
                color="primary"
                sx={{ fontWeight: 600 }}
              >
                Home
              </Button>
              <Button
                component={Link}
                href="/plan"
                color="primary"
                sx={{ fontWeight: 600 }}
              >
                Plan
              </Button>
              <Button
                component={Link}
                href="/explore"
                color="primary"
                sx={{ fontWeight: 600 }}
              >
                Explore
              </Button>
              <Button
                component={Link}
                href="/auth/login"
                color="primary"
                sx={{ fontWeight: 600 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                href="/auth/signup"
                color="primary"
                sx={{ fontWeight: 600 }}
              >
                Sign Up
              </Button>
            </Box>
          </header>
        )}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
