import Cancel from "@mui/icons-material/Cancel";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { colors, Grid, IconButton, Typography } from "@mui/material";
import type { MouseEventHandler } from "react";

export const DKItemRow = ({
  name,
  disabled,
  bgColor,
  onSuccess,
  onFailure
}: {
  name: string;
  disabled: boolean;
  bgColor: string;
  onSuccess: MouseEventHandler;
  onFailure?: MouseEventHandler;
}) => {
  const styles = {
    text: {
      textDecoration: disabled ? "line-through" : "none"
    },
    check: {
      color: bgColor && bgColor !== "#072207" ? "white" : colors.green[900],
      "&:hover": {
        color: bgColor && bgColor !== "#072207" ? "lightgreen" : "green"
      }
    },
    cancel: {
      color: colors.red[900],
      "&:hover": {
        color: "red"
      }
    }
  };

  return (
    <Grid size={12} sx={{ backgroundColor: bgColor }}>
      <Typography color="textPrimary" variant="h3" sx={styles.text}>
        <IconButton sx={styles.check} onClick={onSuccess} disabled={disabled}>
          <CheckCircle />
        </IconButton>
        <span
          style={{
            userSelect: "none",
            cursor: !disabled ? "pointer" : "not-allowed"
          }}
          onClick={!disabled ? onSuccess : () => {}}
        >
          {name}
        </span>
        {onFailure && (
          <IconButton
            sx={styles.cancel}
            onClick={onFailure}
            disabled={disabled}
          >
            <Cancel />
          </IconButton>
        )}
      </Typography>
    </Grid>
  );
};
