import { Container, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import IncomeForm from "../components/Income/IncomeForm";
import IncomeList from "../components/Income/IncomeList";

const Income = () => {
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
            <IncomeForm />
          </Item>
        </Grid>
        <Grid item xs={12} md={8}>
          <Item>
            <IncomeList />
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Income;
