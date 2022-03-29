import React, { Children, createContext, useReducer, useContext, useMemo } from "react";

import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { CloseIcon } from "assets/svgs/CloseIcon";

import { Steps } from "components/Step/Step";
import { BillingAddressInfo } from "components/CardForm/BillingAddressStep";
import { Complete } from "./Complete";
import { GovernmentIdInput } from "generated/graphql";
import { useTranslation } from "react-i18next";

import { useFlow, useFlowActions } from "../Flow";
import { PersonalDetailsPayload } from "./PersonalDetails";
import { useFlowCurrentStep } from "../Flow/Flow";

type IDFileType = {
  src: string;
  binary: string;
};

type Action =
  | {
      type: "PersonalDetails";
      payload: PersonalDetailsPayload;
    }
  | { type: "GovIdType"; payload: GovernmentIdInput }
  | { type: "IsGuideLineAccepted"; payload: boolean }
  | { type: "FrontImage"; payload: IDFileType | null }
  | { type: "BackImage"; payload: IDFileType }
  | { type: "FormSubmitted"; payload?: boolean }
  | { type: "Address"; payload: BillingAddressInfo };

interface KYCFlowState {
  formData: {
    personalDetails?: PersonalDetailsPayload;
    govIdFront?: IDFileType;
    govIdBack?: IDFileType;
    govIdType?: GovernmentIdInput;
    isGuideLineAccepted?: boolean;
    address?: BillingAddressInfo;
    submitted?: boolean;
  };
}

interface Context extends KYCFlowState {
  dispatch: (action: Action) => void;
}

const initialState: KYCFlowState = {
  formData: {},
};

const KYCFlowContext = createContext<Context>({
  ...initialState,
  dispatch() {},
});

export const KYCFlowProvider: React.FC = ({ children }) => {
  const { t } = useTranslation();
  const [{ formData }, dispatch] = useReducer(reducer, initialState);
  const { currentStep, back, exit } = useFlow();

  const onBackClick = () => {
    // this will reset the IsGuideLineAccepted state on press of back button
    if (currentStep === 2) {
      dispatch({
        type: "IsGuideLineAccepted",
        payload: false,
      });
    }
    back();
  };

  const value = useMemo(
    (): Context => ({
      formData,
      dispatch,
    }),
    [dispatch, formData]
  );

  const ActiveStep = useFlowCurrentStep();
  if (!ActiveStep) {
    return null;
  }

  const totalSteps = Children.count(children);

  return (
    <KYCFlowContext.Provider value={value}>
      {formData?.submitted ? (
        <LayoutModal
          background="bg-blue"
          shouldShowLeftButton={false}
          title={t("kyc.complete.layout.title")}
          ariaLabel="KYC_"
        >
          <Complete onExit={exit} />
        </LayoutModal>
      ) : (
        <LayoutModal
          background="bg-blue"
          title={
            <Steps
              step={currentStep}
              totalSteps={totalSteps}
              ariaLabel={`KYC_PROGRESSBAR_SECTION_${currentStep + 1}`}
            />
          }
          overrideBack={onBackClick}
          onRightClick={exit}
          rightClickIcon={<CloseIcon />}
          ariaLabel="KYC_"
        >
          <div className="flex flex-col justify-center items-center flex-grow text-white mb-20">
            <ActiveStep />
          </div>
        </LayoutModal>
      )}
    </KYCFlowContext.Provider>
  );
};

function reducer(state: KYCFlowState, action: Action): KYCFlowState {
  switch (action.type) {
    case "FormSubmitted":
      return {
        ...state,
        formData: {
          ...state.formData,
          submitted: action.payload,
        },
      };
    case "PersonalDetails":
      return {
        ...state,
        formData: {
          ...state.formData,
          personalDetails: action.payload,
        },
      };
    case "GovIdType":
      return {
        ...state,
        formData: {
          ...state.formData,
          govIdType: action.payload,
        },
      };
    case "IsGuideLineAccepted":
      return {
        ...state,
        formData: {
          ...state.formData,
          isGuideLineAccepted: action.payload,
        },
      };
    case "FrontImage":
      return {
        ...state,
        formData: {
          ...state.formData,
          govIdFront: action.payload ?? undefined,
        },
      };
    case "BackImage":
      return {
        ...state,
        formData: {
          ...state.formData,
          govIdBack: action.payload,
        },
      };
    case "Address":
      return {
        ...state,
        formData: {
          ...state.formData,
          address: action.payload,
        },
      };

    default:
      return state;
  }
}

const useKYCContext = (): Context => {
  const context = useContext(KYCFlowContext);

  if (context === undefined) {
    throw new Error("useKYCContext must be used within a KYCContextProvider");
  }

  return context;
};

export const useKYCForm = () => {
  const { formData, dispatch } = useKYCContext();
  const setFormData = dispatch;

  return { formData, setFormData };
};

export const useKYCActions = () => {
  const { forward: next, back } = useFlowActions();

  return { next, back };
};
