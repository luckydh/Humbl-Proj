import React from "react";

export const withPadding = (story: () => React.ReactNode) => <div className="block w-full h-full p-5">{story()}</div>;
