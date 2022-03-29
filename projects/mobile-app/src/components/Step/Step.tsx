import React, { FC } from "react";
import {
  StateFiveOfFive,
  StateFiveOfFour,
  StateFour,
  StateFourOfFive,
  StateOne,
  StateThree,
  StateTwo,
} from "./ProgressBarStates";

export type StepProps = {
  step: number;
  totalSteps: number;
  ariaLabel?: string;
};

const renderState = (step: number, totalSteps: number) => {
  if (step === 0) return <StateOne />;
  if (step === 1) return <StateTwo />;
  if (step === 2) return <StateThree />;
  if (step === 3) {
    if (totalSteps === 4) return <StateFour />;
    if (totalSteps === 5) return <StateFourOfFive />;
  }
  if (step === 4) {
    if (totalSteps === 4) return <StateFiveOfFour />;
    if (totalSteps === 5) return <StateFiveOfFive />;
  }
};

export const Steps: FC<StepProps> = ({ step, totalSteps, ariaLabel }) => (
  <div aria-label={ariaLabel ?? "STEP_INDICATOR"} className="flex justify-center">
    {renderState(step, totalSteps)}
  </div>
);

Steps.displayName = "Steps";
