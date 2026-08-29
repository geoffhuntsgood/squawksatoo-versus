import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography
} from "@mui/material";
import type { ChangeEvent, Dispatch, JSX, SetStateAction } from "react";
import { DKTooltip } from "./DKTooltip";

export const DKCheckbox = ({
  label,
  checked,
  handleChange,
  helpText
}: {
  label: string;
  checked: boolean;
  handleChange: Dispatch<SetStateAction<boolean>>;
  helpText?: string | JSX.Element;
}) => (
  <FormControl fullWidth>
    <FormControlLabel
      label={
        <Typography color="textPrimary" variant="h2">
          {label}
          {helpText && <DKTooltip helpText={helpText} />}
        </Typography>
      }
      control={
        <Checkbox
          checked={checked}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange(event.target.checked)
          }
        />
      }
    />
  </FormControl>
);
