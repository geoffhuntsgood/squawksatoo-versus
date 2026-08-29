import { Button } from "@mui/material";
import type { MouseEventHandler } from "react";

export const DKButton = ({
  label,
  handleClick
}: {
  label: string;
  handleClick: MouseEventHandler;
}) => (
  <Button variant="contained" onClick={handleClick}>
    {label}
  </Button>
);
