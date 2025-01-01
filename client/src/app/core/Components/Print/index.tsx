import React, { forwardRef } from "react";

const ComponentPrint = forwardRef<HTMLDivElement>((props, ref) => {

   


  return <div ref={ref}>ComponentPrint</div>;
});
ComponentPrint.displayName = "ComponentPrint";

export default ComponentPrint;
