import React from "react";

const withPadding = (story: () => React.ReactNode) => (
  <div className="block w-full h-full p-5">{story()}</div>
);
export default withPadding;
