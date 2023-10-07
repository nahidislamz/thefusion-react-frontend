import React from "react";
import { Box, Typography } from "@mui/material";
import Services1 from "../assets/Services1.png";
import Services2 from "../assets/Services2.png";
import Services3 from "../assets/Services3.png";

export default function Services() {
  return (
    <Box id="about" sx={{ margin: "2rem 4rem" }}>
      <Box className="title" sx={{ marginBottom: "4rem" }}>
        <Typography sx={{ textAlign: "center" }} variant="h3" color="warning.main">
          About US
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "justify", lineHeight: "2rem", fontSize: "1rem" }}
        >
          Welcome to Thai and Flame, where the vibrancy of Thai cuisine and the 
          boldness of flame-grilled delights meet to create a mesmerizing culinary journey! 
          Rooted in the rich traditions of Thai cooking and fused with the smoky, 
          charred nuances of flame-grilled specialties, our restaurant curates an 
          enchanting blend of flavors and aromas that invite your senses to explore the unprecedented.

          Nestled in the heart of Bexley, Thai and Flame is not merely a restaurant; 
          it is a unique intersection where the intricate and aromatic Thai dishes blend 
          seamlessly with the robust and smoky notes of fire-kissed grills. Our expert chefs, 
          hailing from the native lands of traditional Thai flavors, collaborate with seasoned 
          grill masters to artfully intertwine two diverse cooking styles, delivering to your plate 
          a delightful symphony of tastes.
        </Typography>
      </Box>
      <Box
        className="services"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: "10vw",
        }}
      >
        {[
          { src: Services2, text: "Freshly Cooked" },
          { src: Services1, text: "Dine In" },
          { src: Services3, text: "Takeaway" },
        ].map((service, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5vw",
              padding: "0 3vw",
            }}
          >
            <Box component="img" src={service.src} alt="" height="2.8rem" />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", lineHeight: "2rem", fontSize: "1rem" }}
            >
              {service.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
