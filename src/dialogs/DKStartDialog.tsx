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
  requestedOptions,
  onAcceptAction,
  onDenyAction
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  currentGame: GameType;
  requestedOptions: GameOptions | null;
  onAcceptAction: () => void;
  onDenyAction: () => void;
}) => {
  return (
    <>
      {requestedOptions && (
        <Dialog open={open} onClose={setOpen}>
          <DialogTitle>Start with this config?</DialogTitle>
          <DialogContent>
            <Typography color="textPrimary" variant="h3">
              Another player has requested to start! Their config is:
              <ul>
                <li>Count: {requestedOptions.count}</li>
                <li>Timer: {requestedOptions.timer ? "Yes" : "No"}</li>
                <li>
                  Total:{" "}
                  {currentGame === "DKB"
                    ? requestedOptions.dkbTotal
                    : requestedOptions.dk64Total}
                </li>
                <li>Seed: {requestedOptions.seed}</li>
              </ul>
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
