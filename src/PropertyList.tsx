import PropTypes from "prop-types";
import { List } from "@mui/material";

type PropertyList = {
  children: JSX.Element | JSX.Element[];
};

export const PropertyList = ({ children }: PropertyList) => {
  return <List disablePadding>{children}</List>;
};
