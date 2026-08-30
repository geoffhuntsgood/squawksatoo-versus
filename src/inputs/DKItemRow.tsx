import CheckCircle from "@mui/icons-material/CheckCircle";
import { Grid, IconButton, Typography } from "@mui/material";
import type { MouseEventHandler } from "react";

export const DKItemRow = ({
  name,
  disabled,
  onComplete
}: {
  name: string;
  disabled: boolean;
  onComplete: MouseEventHandler;
}) => {
  const styles = {
    text: {
      textDecoration: disabled ? "line-through" : "none"
    },
    check: {
      color: "green",
      "&:hover": {
        color: "lightgreen"
      }
    }
  };

  return (
    <Grid size={12}>
      <Typography color="textPrimary" variant="h3" sx={styles.text}>
        <IconButton sx={styles.check} onClick={onComplete} disabled={disabled}>
          <CheckCircle />
        </IconButton>
        <span
          style={{
            userSelect: "none",
            cursor: !disabled ? "pointer" : "not-allowed"
          }}
          onClick={!disabled ? onComplete : () => {}}
        >
          {name}
        </span>
      </Typography>
    </Grid>
  );
};
