import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { getIncome, deleteIncome } from "../../store/Slice/incomeActions";
import DialogBox from "../DialogBox";
import { AnimatePresence, motion } from "framer-motion";

const IncomeList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.data.user);
  const incomes = useSelector((state) => state.data.incomes);
  const token = localStorage.getItem("jwtToken");
  const listRef = useRef(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [incomeToDelete, setIncomeToDelete] = React.useState(null);

  useEffect(() => {
    dispatch(getIncome(user._id, token));
  }, [user, dispatch, token]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [incomes]);

  const deleteIncomeHandler = (incomeId) => {
    setIncomeToDelete(incomeId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmation = () => {
    const userId = user._id;
    dispatch(deleteIncome(userId, incomeToDelete, token));

    setDeleteDialogOpen(false);
    setIncomeToDelete(null);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setIncomeToDelete(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (incomes.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{
          color: "grey",
          fontFamily: "Ubuntu",
        }}
      >
        No income records
      </Typography>
    );
  }

  return (
    <Grid align="center">
      <Grid item xs={12} md={6}>
        <Typography
          variant="h6"
          sx={{
            color: "#141718",
            fontFamily: "Ubuntu",
            marginBottom: 2,
          }}
        >
          Total Incomes
        </Typography>
      </Grid>
      <Grid>
        <AnimatePresence>
          <List className="custom-scrollbar" ref={listRef}>
            {incomes.map(
              (income) =>
                !deleteDialogOpen && (
                  <motion.div
                    key={income._id}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ListItem
                      sx={{
                        background: "#f8f9fa",
                        mt: 1,
                        border: "1px solid #141718",
                        borderRadius: "10px",
                      }}
                      secondaryAction={
                        <React.Fragment>
                          {/* <IconButton edge="end" sx={{ marginRight: 1 }}>
                            <EditOutlinedIcon sx={{ color: "#141718" }} />
                          </IconButton> */}
                          <IconButton edge="end">
                            <DeleteOutlineOutlinedIcon
                              sx={{ color: "#141718" }}
                              onClick={() => deleteIncomeHandler(income._id)}
                            />
                          </IconButton>
                        </React.Fragment>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            backgroundColor: "#141718",
                            width: 30,
                            height: 30,
                          }}
                        >
                          <CurrencyRupeeRoundedIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={income.amount}
                        secondary={formatDate(income.date)}
                        primaryTypographyProps={{
                          color: "#141718",
                          fontWeight: 550,
                        }}
                        secondaryTypographyProps={{
                          color: "#141718",
                        }}
                      />
                      <ListItemText
                        primary={income.title}
                        secondary={income.source}
                        primaryTypographyProps={{
                          color: "#141718",
                          fontWeight: 550,
                        }}
                        secondaryTypographyProps={{
                          color: "#141718",
                        }}
                      />
                    </ListItem>
                  </motion.div>
                )
            )}
          </List>
        </AnimatePresence>
      </Grid>
      <DialogBox
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirmation}
        itemType="Income"
      />
    </Grid>
  );
};

export default IncomeList;
