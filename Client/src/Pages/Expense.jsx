import { Container, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpenseForm from "../components/Expense/ExpenseForm";
import ExpenseList from "../components/Expense/ExpenseList";

const Expense = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#141718" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "10px",
    border: "1px solid #141718",
    display: "flex",
    flexDirection: "column",
    height: "80vh",
  }));

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Item>
            <ExpenseForm />
          </Item>
        </Grid>
        <Grid item xs={12} md={8}>
          <Item>
            <ExpenseList />
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Expense;
