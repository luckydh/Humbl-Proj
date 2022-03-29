import React from "react";

const Location = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.625 7.738c0-3.45 2.883-6.238 6.37-6.238 3.497 0 6.38 2.788 6.38 6.238 0 1.739-.632 3.353-1.673 4.72a16.548 16.548 0 01-4.156 3.856c-.364.239-.693.257-1.093 0a16.23 16.23 0 01-4.155-3.855c-1.042-1.368-1.673-2.982-1.673-4.72zm4.27.195c0 1.155.944 2.064 2.1 2.064 1.157 0 2.11-.909 2.11-2.064 0-1.147-.953-2.1-2.11-2.1a2.11 2.11 0 00-2.1 2.1z"
        fill="currentColor"
      />
    </svg>
  );
export default Location;
