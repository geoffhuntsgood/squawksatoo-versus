import { TextField } from "@mui/material";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";

export const DKTextBox = ({
  label,
  value,
  handleChange,
  required
}: {
  label: string;
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
  required?: boolean;
}) => (
  <TextField
    slotProps={{
      htmlInput: {
        maxLength: "10"
      }
    }}
    required={required}
    variant="outlined"
    label={label}
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>) =>
      handleChange(event.target.value)
    }
  />
);
