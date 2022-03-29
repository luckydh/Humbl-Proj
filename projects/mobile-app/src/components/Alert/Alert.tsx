import React from "react";
import cx from "classnames";
import { IonIcon } from "@ionic/react";

export interface AlertProps {
  icon?: string | React.ReactNode;
  title?: string;
  message?: string;
  children?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ icon, title, message, children }) => {
  const classes = cx(
    "flex flex-col items-center bg-white bg-opacity-10 text-center rounded-md border border-white px-6 pb-4",
    {
      "pt-4": !icon,
      "pt-5": !!icon,
    }
  );

  if (!message && !title) {
    return <div className={classes}>{children}</div>;
  }

  return (
    <div className={classes}>
      {typeof icon === "string" ? (
        <IonIcon className="text-3xl mb-3" icon={icon} />
      ) : (
        <div className="w-full flex justify-center mb-3">{icon}</div>
      )}
      <h1 className="text-white text-lg mb-2 leading-tight">{title}</h1>
      <p className="text-white text-base leading-tight">{message}</p>
      {children}
    </div>
  );
};

export default Alert;
