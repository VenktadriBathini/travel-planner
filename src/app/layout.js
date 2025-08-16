import { Inter } from "next/font/google";
import "./globals.css";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { AuthProvider } from "../contexts/AuthContext";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Travel Planner",
  description: "Plan your next adventure with friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
