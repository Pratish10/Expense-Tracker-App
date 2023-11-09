import { Button } from "@mui/material";
import PropTypes from "prop-types";

const CustomButton = ({ type, children, startIcon, onClick }) => {
  return (
    <Button
      fullWidth
      type={type}
      startIcon={startIcon}
      style={{
        backgroundColor: "#141718",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        fontFamily: "Ubuntu",
        textTransform: "none",
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  startIcon: PropTypes.node,
  onClick: PropTypes.func,
};

export default CustomButton;
