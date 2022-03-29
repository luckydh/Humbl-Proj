import React from 'react';

interface Props {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export const ModalContent: React.FC<Props> = ({ title, message, icon, children }) => (
  <div className="px-6 flex flex-col items-center">
    <div className="mb-4">{icon}</div>
    <h1 className="text-white text-3xl text-center font-medium leading-none tracking-tight mb-4">
      {title}
    </h1>
    <p className="text-white text-base text-center leading-tight mb-6">{message}</p>
    {children}
  </div>
);
