/* eslint-disable no-case-declarations */
import React, { useReducer, useCallback, useContext, createContext, useMemo } from "react";

type FlowState = {
  currentStep: number;
  flowCurrentStep: Step;
  flow: FlowContextProps;
};

type ContextValue = Omit<FlowState, "flow"> & {
  forward: () => void;
  back: () => void;
  exit: () => void;
};

type FlowActionType = "Back" | "Forward" | "Exit";

type FlowAction = {
  type: FlowActionType;
};

const FlowContext = createContext<ContextValue>({
  currentStep: 0,
  flowCurrentStep: null,
  back() {},
  forward() {},
  exit() {},
});

export type Step = React.FC<unknown> | null;

type FlowContextProps = Step[];

interface FlowProviderProps {
  flow: FlowContextProps;
  onExit: () => void;
}

type Reducer = (state: FlowState, action: FlowAction) => FlowState;

function reducer(state: FlowState, action: FlowAction) {
  const first = 0;
  const last = state.flow.length - 1;

  switch (action.type) {
    case "Forward":
      const nextStep = incrementByOne(state.currentStep);
      const step = Math.min(last, nextStep);

      return {
        ...state,
        currentStep: step,
        flowCurrentStep: state.flow[step],
      };

    case "Back":
      const currentStep = Math.max(first, decrementByOne(state.currentStep));

      return {
        ...state,
        currentStep,
        flowCurrentStep: state.flow[currentStep],
      };

    case "Exit":
      return {
        ...state,
        currentStep: first,
        flowCurrentStep: state.flow[first],
      };

    default:
      return state;
  }
}

const FlowProvider: React.FC<FlowProviderProps> = ({ flow, onExit, children }) => {
  const first = 0;
  const [{ currentStep, flowCurrentStep }, dispatch] = useReducer<Reducer>(reducer, {
    currentStep: first,
    flowCurrentStep: flow[first],
    flow,
  });

  const exit = useCallback(() => {
    dispatch({ type: "Exit" });
    onExit();
  }, [onExit]);

  const back = useCallback(() => {
    const previousStep = decrementByOne(currentStep);

    if (previousStep < first) {
      exit();
      return;
    }

    dispatch({
      type: "Back",
    });
  }, [currentStep, exit]);

  const forward = useCallback(() => {
    dispatch({
      type: "Forward",
    });
  }, []);

  const value = useMemo(
    () => ({
      currentStep,
      flowCurrentStep,
      back,
      forward,
      exit,
    }),
    [back, currentStep, flowCurrentStep, forward, exit]
  );

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
};

type FlowProps = FlowProviderProps;

export const Flow: React.FC<FlowProps> = ({ flow, onExit, children }) => (
  <FlowProvider flow={flow} onExit={onExit}>
    {children}
  </FlowProvider>
);

function useFlowContext() {
  const context = useContext(FlowContext);

  if (context === undefined) {
    throw new Error("FlowContext must be used within a FlowProvider");
  }

  return context;
}

export function useFlow() {
  const { currentStep, flowCurrentStep, back, forward, exit } = useFlowContext();

  return { flowCurrentStep, currentStep, back, forward, exit };
}

export function useFlowActions() {
  const { back, forward, exit } = useFlow();

  return { back, forward, exit };
}

export function useFlowCurrentStep() {
  const { flowCurrentStep } = useFlow();

  return flowCurrentStep;
}

// Utils
function decrementByOne(num: number) {
  return num - 1;
}

function incrementByOne(num: number) {
  return num + 1;
}
