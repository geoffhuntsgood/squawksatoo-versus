import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Socket } from "socket.io-client";
import { DKButton } from "../inputs/DKButton";
import { DKTextBox } from "../inputs/DKTextBox";

export const DKRoomDialog = ({
  open,
  setOpen,
  setPlayerName,
  setRoomName,
  socket
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setPlayerName: Dispatch<SetStateAction<string>>;
  setRoomName: Dispatch<SetStateAction<string>>;
  socket: Socket;
}) => {
  const [id, setId] = useState("");
  const [room, setRoom] = useState("");

  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogTitle>Join a Room</DialogTitle>
      <DialogContent>
        <DKTextBox
          required
          label="Player Name"
          value={id}
          handleChange={(val) => setId(String(val).trim())}
        />
        <DKTextBox
          required
          label="Room Name"
          value={room}
          handleChange={(val) => setRoom(String(val).trim())}
        />
      </DialogContent>
      <DialogActions>
        {id && room && (
          <DKButton
            label="Go!"
            handleClick={() => {
              socket.emit("join_room_client", id, room);
              setPlayerName(id);
              setRoomName(room);
              setOpen(false);
            }}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};
