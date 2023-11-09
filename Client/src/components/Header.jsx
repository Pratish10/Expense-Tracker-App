import * as React from "react";
import {
  Box,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Container,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/Slice/userActions";
import toast from "react-hot-toast";
import { getIncome } from "../store/Slice/incomeActions";
import { getExpense } from "../store/Slice/expenseActions";

const pages = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Income", path: "/incomes" },
  { name: "Expense", path: "/expenses" },
];

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showNavLinks, setShowNavLinks] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.data.user);
  const token = localStorage.getItem("jwtToken");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileNavLinkOpen = Boolean(showNavLinks);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileNavLinksClose = () => {
    setShowNavLinks(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileNavLinksClose();
  };

  const profileHandler = () => {
    navigate("/userprofile");
    handleMenuClose();
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
    handleMenuClose();
  };

  const handleMobileNavLinkOpen = (event) => {
    setShowNavLinks(event.currentTarget);
  };

  React.useEffect(() => {
    if (!token) {
      dispatch(logoutUser());
      toast("Logged Out");
      navigate("/");
    } else {
      dispatch(getIncome(user._id, token));
      dispatch(getExpense(user._id, token));
    }
  }, [user, token, navigate, dispatch]);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={profileHandler}>User Profile</MenuItem>
      <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
    </Menu>
  );

  const renderMobileNavLink = (
    <Drawer
      anchor="left"
      open={isMobileNavLinkOpen}
      onClose={handleMobileNavLinksClose}
    >
      <div
        style={{
          width: 250,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page.name} sx={{ textAlign: "center" }}>
            <NavLink
              to={page.path}
              style={{
                textDecoration: "none",
                width: "100%",
              }}
            >
              <Typography
                variant="body1"
                style={{
                  fontFamily: "Ubuntu",
                  color: "#141718",
                  fontWeight: "bold",
                }}
              >
                {page.name}
              </Typography>
            </NavLink>
          </MenuItem>
        ))}
      </div>
    </Drawer>
  );

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleMobileNavLinkOpen}
              sx={{ color: "#141718" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: "#141718",
                fontFamily: "Pixelify Sans",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
            >
              Expense Tracker App
            </Typography>
          </Link>
          {user ? (
            <>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <NavLink
                    key={page.name}
                    to={page.path}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Typography
                      sx={{
                        ml: 5,
                        fontFamily: "Ubuntu",
                        color: "#141718",
                        fontWeight: "bold",
                      }}
                    >
                      {page.name}
                    </Typography>
                  </NavLink>
                ))}
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Ubuntu",
                    color: "#141718",
                    fontWeight: "bold",
                    paddingTop: "7px",
                  }}
                >
                  {user.name}
                </Typography>
                <Avatar
                  alt={user.name}
                  onClick={handleProfileMenuOpen}
                  src={user.avatar}
                />
              </Box>
            </>
          ) : null}
        </Toolbar>
        {renderMenu}
        {renderMobileNavLink}
      </Box>
    </Container>
  );
};

export default Header;
