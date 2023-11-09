import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const NotFound = () => {
  return (
    <Container>
      <div style={{ paddingTop: "64px", position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "80vh",
          }}
        >
          <Typography
            variant="h1"
            sx={{ color: "black", fontFamily: "Pixelify Sans" }}
          >
            404
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "black", fontFamily: "Ubuntu" }}
          >
            The page you’re looking for doesn’t exist.
          </Typography>
          <Link to=".." sx={{ textDecoration: "none" }}>
            <CustomButton>Back</CustomButton>
          </Link>
        </Box>
      </div>
    </Container>
  );
};

export default NotFound;
