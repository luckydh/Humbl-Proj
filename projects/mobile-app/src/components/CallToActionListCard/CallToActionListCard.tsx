import React from "react";

export interface CallToActionListCardProps {
  cta?: { onClick: () => void; text: string };
  children: JSX.Element | JSX.Element[];
  ariaLabel?: string;
}

export const CallToActionListCard = ({ cta, children, ariaLabel }: CallToActionListCardProps) => (
  <div aria-label={ariaLabel && `${ariaLabel}_TRANSACTIONSLIST_SECTION`}>
    <ul className="divide-y divide-white">{children}</ul>
    {cta && (
      <button
        aria-label={ariaLabel && `${ariaLabel}_TRANSACTIONSSEEALL_BUTTON`}
        className="block w-full bg-blue-dark py-4 text-white text-center"
        onClick={cta.onClick}>
        {cta.text}
      </button>
    )}
  </div>
);
