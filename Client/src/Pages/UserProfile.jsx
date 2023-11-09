import { Avatar, Grid, Paper, TextField, Typography } from "@mui/material";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUser } from "../store/Slice/userActions";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.data.user);
  const token = localStorage.getItem("jwtToken");

  const paper = {
    padding: 20,
    width: "60%",
    margin: "50px auto",
    marginTop: "20px",
    border: "1px solid #141718",
    borderRadius: "10px",
  };

  const inputStyles = {
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#141718",
      fontFamily: "Ubuntu",
    },
    "& .MuiFormLabel-root": {
      color: "#141718",
      fontFamily: "Ubuntu",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#141718",
      fontFamily: "Ubuntu",
    },
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const updateUserData = {
      name,
      email,
      phoneNumber,
      address,
      city,
      country,
      postalCode,
    };
    const userId = user._id;
    dispatch(updateUser(userId, updateUserData, token));
    setName("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setCity("");
    setCountry("");
    setPostalCode("");
  };

  return (
    <form onSubmit={submitHandler}>
      <Grid container spacing={2}>
        <Paper elevation={10} style={paper}>
          <Grid item xs={12} align="center">
            <Avatar
              src={user.avatar}
              style={{ height: "100px", width: "100px" }}
            />
            <Typography component="h1" variant="h5">
              Welcome! <strong>{user.name}</strong>
            </Typography>
          </Grid>
          <br />
          <Grid align="center">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  autoComplete="name"
                  variant="outlined"
                  fullWidth
                  label="Name"
                  name="name"
                  autoFocus
                  required
                  defaultValue={user.name}
                  onChange={(e) => setName(e.target.value)}
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled
                  type="email"
                  autoComplete="email"
                  variant="outlined"
                  fullWidth
                  label="Email"
                  name="email"
                  required
                  defaultValue={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={inputStyles}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="number"
                  fullWidth
                  label="Phone Number"
                  autoComplete="phoneNumber"
                  name="phoneNumber"
                  defaultValue={user.phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  sx={inputStyles}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="address"
                  label="Address"
                  multiline
                  fullWidth
                  rows={4}
                  defaultValue={user.address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="text"
                  fullWidth
                  label="City"
                  autoComplete="City"
                  name="city"
                  defaultValue={user.city}
                  onChange={(e) => setCity(e.target.value)}
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="text"
                  fullWidth
                  label="Country"
                  autoComplete="Country"
                  name="country"
                  defaultValue={user.country}
                  onChange={(e) => setCountry(e.target.value)}
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="number"
                  fullWidth
                  label="Postal Code"
                  autoComplete="postal-code"
                  name="postalCode"
                  defaultValue={user.postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  sx={inputStyles}
                />
              </Grid>
            </Grid>
            <br />
            <Grid item xs={12}>
              <CustomButton type="submit">Update Account details</CustomButton>
            </Grid>
            <br />
          </Grid>
        </Paper>
      </Grid>
    </form>
  );
};

export default UserProfile;
