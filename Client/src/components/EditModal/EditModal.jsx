import {
  Modal,
  Backdrop,
  Fade,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CustomButton from "../CustomButton";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateExpense } from "../../store/Slice/expenseActions";
import { useDispatch } from "react-redux";

const EditModal = ({ open, onClose, data, type }) => {
  console.log(data);
  const [formData, setFormData] = useState({
    title: data.title,
    amount: data.amount,
    date: data.date,
    category: data.category,
    description: data.description,
  });

  const dispatch = useDispatch();
  const token = localStorage.getItem("jwtToken");
  if (!data) {
    onClose();
    return null;
  }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onUpdateExpense = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.title ||
        !formData.amount ||
        !formData.date ||
        !formData.category ||
        !formData.description
      ) {
        throw new Error("All fields are required.");
      }
      console.log(data.user, data._id, formData, token);
      const success = await dispatch(
        updateExpense(data.user, data._id, formData, token)
      );
      if (success) {
        toast.success("Expense Updated");
      } else {
        throw new Error("Failed to update Expense");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={`${type}-edit-modal`}
      aria-describedby={`${type}-edit-modal-description`}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Grid
          container
          sx={{
            backgroundColor: "white",
            padding: 3,
            borderRadius: 4,
            width: 400,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit {data._id}
          </Typography>
          <form onSubmit={onUpdateExpense}>
            <Grid item xs={12} style={grid}>
              <FormControl xs={12} sm={6} fullWidth style={textField}>
                <TextField
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={formData.title}
                  onChange={handleInputChange}
                  sx={inputStyles}
                />
              </FormControl>
              <FormControl xs={12} sm={6} fullWidth style={textField}>
                <TextField
                  name="amount"
                  label="Amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
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
                  value={formData.date}
                  onChange={handleInputChange}
                  sx={inputStyles}
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
                  value={formData.category}
                  onChange={handleInputChange}
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
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </FormControl>
              <CustomButton startIcon={<EditRoundedIcon />} type="submit">
                Edit Expense
              </CustomButton>
            </Grid>
          </form>
        </Grid>
      </Fade>
    </Modal>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default EditModal;
