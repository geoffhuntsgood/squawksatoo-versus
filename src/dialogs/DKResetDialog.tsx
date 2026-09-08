import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";
import { DKButton } from "../inputs/DKButton";

export const DKResetDialog = ({
  open,
  setOpen,
  handleCancelAction
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleCancelAction: () => void;
}) => (
  <Dialog open={open} onClose={setOpen}>
    <DialogTitle>Reconfigure</DialogTitle>
    <DialogContent>
      <Typography color="textPrimary" variant="h3">
        Requesting reconfigure from other players...
      </Typography>
    </DialogContent>
    <DialogActions>
      <DKButton
        label="Cancel"
        handleClick={() => {
          handleCancelAction();
          setOpen(false);
        }}
      />
    </DialogActions>
  </Dialog>
);
