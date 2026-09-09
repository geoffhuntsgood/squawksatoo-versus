import { Tooltip } from "@mui/material";
import { type JSX } from "react";

export const DKTooltip = ({ helpText }: { helpText: string | JSX.Element }) => (
  <Tooltip title={helpText} arrow placement="left-start">
    <sup>?</sup>
  </Tooltip>
);
