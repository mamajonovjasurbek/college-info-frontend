import { Checkbox } from "@mui/material";
import React, { HTMLProps } from "react";

export default function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate , rest.checked]);

  return (
    <Checkbox 
    ref={ref}
    className={className + " cursor-pointer"}
    {...rest}
    />
   
);
}
