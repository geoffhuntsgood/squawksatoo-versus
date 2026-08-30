import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";
import { DKButton } from "./DKButton";
import { DKTextBox } from "./DKTextBox";

export const DKRoomDialog = ({
  open,
  setOpen,
  playerName,
  setPlayerName,
  roomName,
  setRoomName,
  setupAction
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  playerName: string;
  setPlayerName: Dispatch<SetStateAction<string>>;
  roomName: string;
  setRoomName: Dispatch<SetStateAction<string>>;
  setupAction: () => void;
}) => (
  <Dialog open={open} onClose={() => setOpen(false)}>
    <DialogTitle>Join a Room</DialogTitle>
    <DialogContent>
      <DKTextBox
        label="Player Name"
        value={playerName}
        handleChange={setPlayerName}
      />
      <DKTextBox
        label="Room Name"
        value={roomName}
        handleChange={setRoomName}
      />
    </DialogContent>
    <DialogActions>
      {playerName && roomName && (
        <DKButton
          label="Go!"
          handleClick={() => {
            setupAction();
            setOpen(false);
          }}
        />
      )}
    </DialogActions>
  </Dialog>
);
