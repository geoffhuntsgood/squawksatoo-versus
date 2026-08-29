import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent
} from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

export const DKMultiSelect = ({
  label,
  values,
  handleChange,
  selectItems,
  mini
}: {
  label: string;
  values: string[];
  handleChange: Dispatch<SetStateAction<string[]>>;
  selectItems: string[];
  mini?: boolean;
}) => {
  const handle = (event: SelectChangeEvent<typeof values>) => {
    const {
      target: { value }
    } = event;
    if (value.includes("all")) {
      handleChange(values.length > 0 ? [] : selectItems);
    } else {
      handleChange(typeof value === "string" ? value.split(",") : value);
    }
  };

  return (
    <FormControl fullWidth sx={{ width: mini ? "50%" : "100%" }}>
      <InputLabel id={`multi-${label}-label`} htmlFor={`multi-${label}`}>
        {label}
      </InputLabel>
      <Select
        slotProps={{
          input: {
            id: `multi-${label}`
          }
        }}
        multiple
        value={values}
        label={label}
        labelId={`multi-${label}-label`}
        onChange={handle}
        renderValue={(selected) => selected.join(", ")}
      >
        <MenuItem value="all">Select/Unselect All (default: all)</MenuItem>
        {selectItems.map((item: string) => (
          <MenuItem value={item}>
            <Checkbox checked={values.includes(item)} />
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
