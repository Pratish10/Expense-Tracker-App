import {
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../CustomButton";
import { addIncome } from "../../store/Slice/incomeActions";
import toast from "react-hot-toast";
// import { addIncome } from "../../store/Slice/Income/incomeActions";

const IncomeForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.data.user);
  const token = localStorage.getItem("jwtToken");

  const grid = {
    padding: "20px 20px",
    margin: "20px auto",
  };
  const textField = {
    margin: "8px auto",
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

  const addIncomeHandler = async (event) => {
    event.preventDefault();

    try {
      if (!title || !amount || !date || !source || !description) {
        throw new Error("All fields are required.");
      }
      const incomeData = {
        title,
        amount,
        date,
        source,
        description,
      };
      const success = await dispatch(addIncome(user._id, incomeData, token));
      if (success) {
        setTitle("");
        setAmount("");
        setDate("");
        setSource("");
        setDescription("");
      } else {
        throw new Error("Failed to Add Income");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid align="center">
            <Typography
              sx={{ color: "#141718", fontFamily: "Ubuntu" }}
              variant="h6"
            >
              Incomes
            </Typography>
          </Grid>
          <form>
            <Grid item xs={12} style={grid}>
              <FormControl xs={12} sm={6} fullWidth style={textField}>
                <TextField
                  name="title"
                  label="Title"
                  variant="outlined"
                  required
                  value={title}
                  sx={inputStyles}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl xs={12} sm={6} fullWidth style={textField}>
                <TextField
                  name="amount"
                  label="Amount"
                  type="number"
                  required
                  value={amount}
                  sx={inputStyles}
                  onChange={(e) => setAmount(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyRupeeRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl xs={12} sm={6} fullWidth style={textField}>
                <TextField
                  name="date"
                  type="date"
                  required
                  value={date}
                  sx={inputStyles}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormControl>
              <FormControl
                xs={12}
                sm={6}
                fullWidth
                style={textField}
                sx={inputStyles}
              >
                <InputLabel id="source">Source of Income</InputLabel>
                <Select
                  labelId="source"
                  name="source"
                  label="Source of Income"
                  required
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                >
                  <MenuItem value="Job">Job</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                  <MenuItem value="Freelance">Freelance</MenuItem>
                  <MenuItem value="Social Media">Social Media</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                xs={12}
                sm={6}
                required
                fullWidth
                style={textField}
                sx={inputStyles}
              >
                <TextField
                  name="description"
                  label="Description"
                  multiline
                  value={description}
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <CustomButton
                startIcon={<AddCircleRoundedIcon />}
                type="submit"
                onClick={addIncomeHandler}
              >
                Add Income
              </CustomButton>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IncomeForm;
