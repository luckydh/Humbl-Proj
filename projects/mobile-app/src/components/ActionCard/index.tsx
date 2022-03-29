import { IonIcon } from "@ionic/react";
import Chevron from "assets/svgs/Chevron";
import React from "react";

interface ActionCardProps {
  text: string;
  icon?: string;
  onClick: () => void;
}
const ActionCard: React.FC<ActionCardProps> = (props) => (
    <button onClick={props.onClick} className="block w-full">
      <div className="flex flex-col rounded-lg px-4 py-4 bg-banner bg-cover justify-between items-cgenter w-full">
        <div className="flex w-full text-5xl mb-4">
          <IonIcon icon={props.icon} />
        </div>
        <div className="flex flex-row justify-between w-full items-center">
          <div className="text-white text-3xl font-semibold">{props.text}</div>
          <div className="">
            <Chevron width={32} height={32} />
          </div>
        </div>
      </div>
    </button>
  );

export default ActionCard;
