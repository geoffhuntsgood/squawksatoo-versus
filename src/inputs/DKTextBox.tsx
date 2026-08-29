import { TextField } from "@mui/material";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";

export const DKTextBox = ({
  label,
  value,
  handleChange
}: {
  label: string;
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
}) => (
  <TextField
    slotProps={{
      htmlInput: {
        maxLength: "10"
      }
    }}
    variant="outlined"
    label={label}
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>) =>
      handleChange(event.target.value)
    }
  />
);
