import React from "react";
import { Box, Typography, Button } from "@mui/material";
import hero from "../assets/hero.jpg";
import heroDesign from "../assets/HeroDesign.png";

export default function Hero() {
  return (
    <Box
      id="home"
      sx={{
        height: "90vh", // Controls the height of the hero section
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={hero}
        alt="Background"
        sx={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          filter: "brightness(60%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            left: "10%",
          }}
        >
          <Box
            component="img"
            src={heroDesign}
            alt=""
            sx={{
              height: "70vh",
            }}
          />
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              position: "absolute",
              top: "25vh",
              left: "15vh",
              fontSize: "4.5rem",
            }}
          >
            <Box component="span" sx={{ display: "block", fontSize: "5vw" }}>
              10% OFF
            </Box>
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            right: "10%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "1rem",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#f9c74f",
              fontSize: "4rem",
              letterSpacing: "0.5rem",
            }}
          >
            The Fusion
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#fff",
              width: "60%",
              textAlign: "end",
              fontSize: "1.1rem",
              lineHeight: "2rem",
              letterSpacing: "0.1rem",
            }}
          >
            Thai & Flame
          </Typography>
          <Button
            variant="contained"
            sx={{
              padding: "1rem 2rem",
              fontSize: "1.4rem",
              backgroundColor: "#fc4958",
              color: "#fff",
              fontWeight: "800",
              letterSpacing: "0.2rem",
              "&:hover": {
                backgroundColor: "#f9c74f",
              },
            }}
          >
            ORDER NOW
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
