import { experimentalStyled as styled } from "@mui/material/styles";
import { Typography, Grid, Paper, Box, Container, Alert } from "@mui/material";
import ExpenseLine from "../components/Expense/ExpenseLine";
import ExpensePie from "../components/Expense/ExpensePie";
import IncomeLine from "../components/Income/IncomeLine";
import IncomePie from "../components/Income/IncomePie";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#141718" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#141718",
    borderRadius: "10px",
    border: "1px solid #141718",
    fontFamily: "Ubuntu",
    fontSize: "1.5rem",
  }));

  const incomeData = useSelector((state) => state.data.incomes);
  const expenseData = useSelector((state) => state.data.expenses);

  const totalIncome = incomeData.reduce(
    (total, income) => total + parseFloat(income.amount || 0),
    0
  );

  const totalExpense = expenseData.reduce(
    (total, expense) => total + parseFloat(expense.amount || 0),
    0
  );

  const currBalance = totalIncome - totalExpense;

  return (
    <Container>
      {incomeData.length > 0 || expenseData.lenght > 0 ? (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ p: 1 }}
            >
              <Grid item xs={4} sm={4} md={4}>
                <Item>
                  <Typography sx={{ color: "#141718", fontFamily: "Ubuntu" }}>
                    Total Income
                  </Typography>
                  {totalIncome}
                </Item>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <Item>
                  <Typography sx={{ color: "#141718", fontFamily: "Ubuntu" }}>
                    Total Expense
                  </Typography>
                  {totalExpense}
                </Item>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <Item>
                  <Typography sx={{ color: "#141718", fontFamily: "Ubuntu" }}>
                    Current Balance
                  </Typography>
                  {currBalance > 0 ? currBalance : 0}
                </Item>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12} md={6}>
              <Item sx={{ height: { xs: "auto", md: "100%" } }}>
                <ExpenseLine />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item sx={{ height: { xs: "auto", md: "100%" } }}>
                <ExpensePie />
              </Item>
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12} md={6}>
              <Item sx={{ height: { xs: "auto", md: "100%" } }}>
                <IncomeLine />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item sx={{ height: { xs: "auto", md: "100%" } }}>
                <IncomePie />
              </Item>
            </Grid>
          </Grid>
        </>
      ) : (
        <Alert severity="error">
          <Typography sx={{ fontFamily: "Ubuntu" }}>
            No Income and Expense Data Found. You have to add atleast One Income
            and Expense data to visualize in dashboard!
          </Typography>
        </Alert>
      )}
    </Container>
  );
};

export default Dashboard;
