import React from "react";
import { Link } from "react-router-dom";

const ForwardedLink = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Link {...props} ref={ref}>
      {children}
    </Link>
  );
});

ForwardedLink.displayName = "ForwardedLink";
export default ForwardedLink;
