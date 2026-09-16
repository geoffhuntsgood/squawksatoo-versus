import { Grid, IconButton, Typography } from "@mui/material";
import type { MouseEventHandler } from "react";

export const DKItemRow = ({
  name,
  disabled,
  shouldBePaused,
  onComplete
}: {
  name: string;
  disabled: boolean;
  shouldBePaused: boolean;
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
        <IconButton
          sx={styles.check}
          onClick={onComplete}
          disabled={disabled || shouldBePaused}
        >
          ✔
        </IconButton>
        <span
          style={{
            userSelect: "none",
            cursor: !disabled && !shouldBePaused ? "pointer" : "not-allowed"
          }}
          onClick={!disabled && !shouldBePaused ? onComplete : () => {}}
        >
          {name}
        </span>
      </Typography>
    </Grid>
  );
};
