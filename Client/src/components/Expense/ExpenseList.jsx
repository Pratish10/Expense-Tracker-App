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
import { deleteExpense, getExpense } from "../../store/Slice/expenseActions";
import DialogBox from "../DialogBox";
import { AnimatePresence, motion } from "framer-motion";
// import EditModal from "../EditModal";

const ExpenseList = () => {
  // const [isEditModalOpen, setEditModalOpen] = React.useState(false);
  // const [selectedExpense, setSelectedExpense] = React.useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [expenseToDelete, setExpenseToDelete] = React.useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.data.user);
  const expenses = useSelector((state) => state.data.expenses);
  const token = localStorage.getItem("jwtToken");
  const listRef = useRef(null);

  // const openEditModal = (expense) => {
  //   setSelectedExpense(expense);
  //   setEditModalOpen(true);
  // };

  useEffect(() => {
    dispatch(getExpense(user._id, token));
  }, [user, dispatch, token]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [expenses]);

  const deleteExpenseHandler = (expenseId) => {
    setExpenseToDelete(expenseId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmation = () => {
    const userId = user._id;
    dispatch(deleteExpense(userId, expenseToDelete, token));

    setDeleteDialogOpen(false);
    setExpenseToDelete(null);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setExpenseToDelete(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (expenses.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{
          color: "grey",
          fontFamily: "Ubuntu",
        }}
      >
        No expense records
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
          Total Expenses
        </Typography>
      </Grid>
      <Grid>
        <AnimatePresence>
          <List className="custom-scrollbar" ref={listRef}>
            {expenses.map(
              (expense) =>
                !deleteDialogOpen && (
                  <motion.div
                    key={expense._id}
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
                        <>
                          {/* <IconButton edge="end" sx={{ marginRight: 1 }}>
                            <EditOutlinedIcon
                              sx={{ color: "#141718" }}
                              // onClick={() => openEditModal(expense)}
                            />
                          </IconButton> */}
                          <IconButton edge="end">
                            <DeleteOutlineOutlinedIcon
                              sx={{ color: "#141718" }}
                              onClick={() => deleteExpenseHandler(expense._id)}
                            />
                          </IconButton>
                        </>
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
                        primary={expense.amount}
                        secondary={formatDate(expense.date)}
                        primaryTypographyProps={{
                          color: "#141718",
                          fontWeight: 550,
                        }}
                        secondaryTypographyProps={{
                          color: "#141718",
                        }}
                      />
                      <ListItemText
                        primary={expense.title}
                        secondary={expense.category}
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
        {/* <EditModal
          open={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          data={selectedExpense}
          type="Expense"
        /> */}
      </Grid>
      <DialogBox
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirmation}
        itemType="Expense"
        token={token}
      />
    </Grid>
  );
};

export default ExpenseList;
