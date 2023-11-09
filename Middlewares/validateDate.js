const moment = require("moment");

module.exports = (value, { req }) => {
  if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new Error("Date must be in YYYY-MM-DD format");
  }
  if (!moment(value, "YYYY-MM-DD", true).isValid()) {
    throw new Error("Invalid date format");
  }
  return true;
};
