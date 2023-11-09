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
import { addExpense } from "../../store/Slice/expenseActions";
import toast from "react-hot-toast";

const ExpenseForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
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

  const addExpenseHandler = async (event) => {
    event.preventDefault();

    try {
      if (!title || !amount || !date || !category || !description) {
        throw new Error("All fields are required.");
      }
      const expenseData = {
        title,
        amount,
        date,
        category,
        description,
      };
      const success = await dispatch(addExpense(user._id, expenseData, token));
      if (success) {
        setTitle("");
        setAmount("");
        setDate("");
        setCategory("");
        setDescription("");
      } else {
        throw new Error("Failed to Add expense");
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
              Expenses
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
                  onChange={(e) => setTitle(e.target.value)}
                  sx={inputStyles}
                />
              </FormControl>
              <FormControl xs={12} sm={6} fullWidth style={textField}>
                <TextField
                  name="amount"
                  label="Amount"
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  sx={inputStyles}
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
                <InputLabel id="category">Category of Expense</InputLabel>
                <Select
                  labelId="category"
                  name="category"
                  label="Category of Income"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Entertainment">Entertainment</MenuItem>
                  <MenuItem value="Garments">Garments</MenuItem>
                  <MenuItem value="Grocery">Grocery</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                </Select>
              </FormControl>
              <FormControl xs={12} sm={6} required fullWidth style={textField}>
                <TextField
                  name="description"
                  label="Description"
                  multiline
                  sx={inputStyles}
                  value={description}
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <CustomButton
                startIcon={<AddCircleRoundedIcon />}
                type="submit"
                onClick={addExpenseHandler}
              >
                Add Expense
              </CustomButton>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpenseForm;
