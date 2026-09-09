import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";
import { GameOptions } from "../classes";
import { DKButton } from "../inputs/DKButton";
import { GameType } from "../utils/types";

export const DKStartDialog = ({
  open,
  setOpen,
  currentGame,
  requested,
  onAcceptAction,
  onDenyAction
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  currentGame: GameType;
  requested: GameOptions | null;
  onAcceptAction: () => void;
  onDenyAction: () => void;
}) => {
  return (
    <>
      {requested && (
        <Dialog open={open} onClose={setOpen}>
          <DialogTitle>Start with this config?</DialogTitle>
          <DialogContent>
            <Typography color="textPrimary" variant="h3">
              Another player has requested to start!
            </Typography>
            <Typography color="textPrimary" variant="h3">
              Their config is:
            </Typography>
            <Typography color="textPrimary" variant="h3">
              Count: {requested.count}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              Timer: {requested.timer ? "Yes" : "No"}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              Total:{" "}
              {currentGame === "DKB" ? requested.dkbTotal : requested.dk64Total}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              Seed: {requested.seed}
            </Typography>
          </DialogContent>
          <DialogActions>
            <DKButton
              label="This is ok!"
              handleClick={() => {
                onAcceptAction();
                setOpen(false);
              }}
            />
            <DKButton
              label="No!"
              handleClick={() => {
                onDenyAction();
                setOpen(false);
              }}
            />
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
