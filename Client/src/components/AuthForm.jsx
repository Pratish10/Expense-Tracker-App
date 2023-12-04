import React from "react";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomButton from "./CustomButton";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../store/Slice/userActions";
import generateAvatar from "../Utils/generateAvatar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';

const AuthForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [variant, setVariant] = React.useState("LOGIN");
  const [showPassword, setShowPassword] = React.useState(false);

  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const commonStyles = {
    fullWidth: { fullWidth: true },
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const toggleVariantHandler = React.useCallback(() => {
    setVariant((prevVariant) =>
      prevVariant === "LOGIN" ? "REGISTER" : "LOGIN"
    );
  }, []);

  const validateForm = () => {
    let isValid = true;

    if (variant === "REGISTER") {
      if (name.trim().length < 4) {
        setNameError("Name should be at least 4 characters");
        isValid = false;
      } else {
        setNameError("");
      }
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (validateForm()) {
    setLoading(true);
      if (variant === "LOGIN") {
        try {
          const loginData = {
            email,
            password,
          };
          const success = await dispatch(loginUser(loginData));
          if (success) {
            toast.success("Login Successfull!");
            navigate("/dashboard");
          } else {
            throw new Error("Login Failed!");
          }
        } catch (error) {
          toast.error(error.message);
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      }

      if (variant === "REGISTER") {
        try {
          const avatar = await generateAvatar(name);
          if (avatar === null) {
            return;
          } else {
            const registerData = {
              name,
              email,
              password,
              avatar,
            };
            const success = await dispatch(registerUser(registerData));
            if (success) {
              toast.success("Registration Successfull!");
              navigate("/dashboard");
            } else {
              throw new Error("Registration Failed!");
            }
          }
        } catch (error) {
          console.log(error.message);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{
        margin: "0 auto",
        maxWidth: "400px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "10px",
        border: "1px solid #414345",
      }}
    >
      <Box sx={{ px: 3, py: 4, mt: 3 }}>
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {variant === "REGISTER" && (
              <Grid item xs={12} sx={{ py: 1 }}>
                <TextField
                  variant="outlined"
                  label="Username"
                  type="text"
                  id="username"
                  onChange={(e) => setName(e.target.value)}
                  {...commonStyles.fullWidth}
                  sx={{
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#414345",
                        fontFamily: "Ubuntu",
                      },
                    "& .MuiFormLabel-root": {
                      color: "#414345",
                      fontFamily: "Ubuntu",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#414345",
                        fontFamily: "Ubuntu",
                      },
                  }}
                />
                <Typography variant="caption" sx={{ color: "red" }}>
                  {nameError}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} sx={{ py: 1 }}>
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                {...commonStyles.fullWidth}
                sx={{
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#414345",
                      fontFamily: "Ubuntu",
                    },
                  "& .MuiFormLabel-root": {
                    color: "#414345",
                    fontFamily: "Ubuntu",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#414345",
                      fontFamily: "Ubuntu",
                    },
                }}
              />
              <Typography variant="caption" sx={{ color: "red" }}>
                {emailError}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ py: 1 }}>
              <FormControl
                variant="outlined"
                {...commonStyles.fullWidth}
                sx={{
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#414345",
                      fontFamily: "Ubuntu",
                    },
                  "& .MuiFormLabel-root": {
                    color: "#414345",
                    fontFamily: "Ubuntu",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#414345",
                      fontFamily: "Ubuntu",
                    },
                }}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Typography variant="caption" sx={{ color: "red" }}>
                {passwordError}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <CustomButton type="submit">
                {loading ? <CircularProgress /> : variant === "LOGIN" ? "Sign In" : "Register"}
                
              </CustomButton>
            </Grid>
          </Grid>
        </form>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              py: 2,
              mx: 1,
              fontSize: { xs: "10px", sm: "14px" },
              fontFamily: "Ubuntu",
            }}
          >
            {variant === "LOGIN"
              ? "New to Chatty App?"
              : "Already have an account?"}
          </Typography>
          <Typography
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
              py: 2,
              fontSize: { xs: "10px", sm: "14px" },
              fontFamily: "Ubuntu",
              fontWeight: 600,
            }}
            onClick={toggleVariantHandler}
          >
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </Typography>
        </div>
      </Box>
    </Paper>
  );
};

export default AuthForm;
