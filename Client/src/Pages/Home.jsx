import AuthForm from "../components/AuthForm";
import { Box, Container, Typography } from "@mui/material";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Home = () => {
  const codeString = `Guest Credentials = {
    email: "guest@gmail.com",
    password: "guest123",
  };`;

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontFamily: "Pixelify Sans",
              fontSize: { xs: "24px", sm: "36px" },
            }}
          >
            Welcome to Expense Tracker App
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "20px" },
              fontFamily: "Ubuntu",
            }}
          >
            Sign in to your account
          </Typography>
        </Box>
        <Box>
          <SyntaxHighlighter language="json" style={atomOneDark}>
            {codeString}
          </SyntaxHighlighter>
        </Box>
        <Box>
          <AuthForm />
        </Box>
      </div>
    </Container>
  );
};

export default Home;
