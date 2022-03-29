import React from "react";

import { KYCFlowProvider } from "./KYCFlowContext";
import { LayerComponentProps } from "components/Layers/common";

import { Flow } from "../Flow";
import { PersonalDetails } from "./PersonalDetails";

import { ConfirmDetails } from "./ConfirmDetails";
import { IDUpload } from "./IDUpload";
import { ContactDetails } from "./ContactDetails";

const flow = [ConfirmDetails, PersonalDetails, IDUpload, ContactDetails];

export const KYC: React.FC<LayerComponentProps<"updateKYC">> = ({ onClose }) => (
  <Flow flow={flow} onExit={onClose}>
    <KYCFlowProvider />
  </Flow>
);
