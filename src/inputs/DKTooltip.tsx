import { QuestionMarkOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { type JSX } from "react";

export const DKTooltip = ({ helpText }: { helpText: string | JSX.Element }) => (
  <Tooltip title={helpText} arrow placement="left-start">
    <sup>
      <QuestionMarkOutlined data-testid="question" sx={{ fontSize: 15 }} />
    </sup>
  </Tooltip>
);
