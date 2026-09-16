import { Button } from "@mui/material";
import type { MouseEventHandler } from "react";

export const DKButton = ({
  label,
  handleClick,
  disabled,
  infoText
}: {
  label: string;
  handleClick: MouseEventHandler;
  disabled?: boolean;
  infoText?: string;
}) => (
  <Button
    sx={{ "&.Mui-disabled": { backgroundColor: "gray", color: "black" } }}
    variant="contained"
    onClick={handleClick}
    disabled={disabled}
  >
    {infoText && disabled ? infoText : label}
  </Button>
);
