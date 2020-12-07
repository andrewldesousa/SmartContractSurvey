import React from "react";
import CheckIcon from '@material-ui/icons/Check';
import LinkIcon from '@material-ui/icons/Link';
import useCopyToClipboard from "./copyToClipboard";
import { Icon } from "@material-ui/core";

export function copyButton( code ) {
  const [isCopied, handleCopy] = useCopyToClipboard(1000);

  return (
    <Icon onClick={() => handleCopy(code)}>
      {isCopied ? <CheckIcon /> : <LinkIcon />}
    </Icon>
  );
}
