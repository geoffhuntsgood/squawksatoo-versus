import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Rings } from "react-loader-spinner";

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
        <Rings
          visible
          color="#F00"
          wrapperStyle={{
            justifyContent: "center",
            padding: "1rem"
          }}
        />
      </Typography>
    </DialogContent>
  </Dialog>
);
