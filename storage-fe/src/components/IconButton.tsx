import { styled } from "@nextui-org/react";

export const IconButton = styled("button", {
  // reset button styles
  background: "transparent",
  border: "none",
  padding: 5,
  // styles
  dflex: "center",
  bg: "$primary",
  borderRadius: "$rounded",
  cursor: "pointer",
  transition: "opacity 0.25s ease 0s, transform 0.25s ease 0s",
  "&:hover": {
    opacity: 0.8,
  },
});
