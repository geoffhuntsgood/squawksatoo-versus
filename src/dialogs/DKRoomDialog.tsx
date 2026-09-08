import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";
import { DKButton } from "../inputs/DKButton";
import { DKTextBox } from "../inputs/DKTextBox";

export const DKRoomDialog = ({
  open,
  setOpen,
  playerName,
  setPlayerName,
  roomName,
  setRoomName,
  onCloseAction
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  playerName: string;
  setPlayerName: Dispatch<SetStateAction<string>>;
  roomName: string;
  setRoomName: Dispatch<SetStateAction<string>>;
  onCloseAction: () => void;
}) => (
  <Dialog open={open} onClose={setOpen}>
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
            onCloseAction();
            setOpen(false);
          }}
        />
      )}
    </DialogActions>
  </Dialog>
);
