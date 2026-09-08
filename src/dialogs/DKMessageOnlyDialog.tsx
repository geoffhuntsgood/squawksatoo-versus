import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Puff } from "react-loader-spinner";

export const DKMessageOnlyDialog = ({
  open,
  setOpen,
  title,
  message
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  message: string;
}) => (
  <Dialog open={open} onClose={setOpen}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography color="textPrimary" variant="h3">
        {message}
      </Typography>
      <Puff
        visible
        color="#F00"
        wrapperStyle={{ margin: "0 auto", padding: "1rem" }}
      />
    </DialogContent>
  </Dialog>
);
