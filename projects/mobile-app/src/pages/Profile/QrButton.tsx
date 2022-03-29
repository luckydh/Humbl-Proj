import { ScanIcon } from "../../assets/svgs/ScanIcon";
import React from "react";

export interface QrButtonProps {
  onClick: () => void;
}

export const QrButton = ({ onClick }: QrButtonProps) => (
  <button
    style={{ boxShadow: "0px 5px 7px -1px rgba(0,0,0,.22)" }}
    className="h-full w-full bg-blue-dark rounded-full text-center flex place-items-center justify-center text-white fill-current border-2 border-white border-solid"
    onClick={() => onClick()}
  >
    <ScanIcon />
  </button>
);
