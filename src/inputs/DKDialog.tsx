import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";
import { DKButton } from "./DKButton";

export const DKDialog = ({
  title,
  description,
  open,
  setOpen,
  handleYesAction,
  handleNoAction,
  yesLabel,
  noLabel
}: {
  title: string;
  description: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleYesAction?: () => void;
  handleNoAction?: () => void;
  yesLabel?: string;
  noLabel?: string;
}) => (
  <Dialog open={open} onClose={setOpen}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography color="textPrimary" variant="h3">
        {description}
      </Typography>
    </DialogContent>
    <DialogActions>
      {yesLabel && handleYesAction && (
        <DKButton label={yesLabel} handleClick={() => handleYesAction()} />
      )}
      {noLabel && handleNoAction && (
        <DKButton
          label={noLabel}
          handleClick={() => {
            handleNoAction();
            setOpen(false);
          }}
        />
      )}
    </DialogActions>
  </Dialog>
);
