import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import { Flow, useFlow } from "./Flow";

const StepA = () => <div>Step A</div>;
const StepB = () => <div>Step B</div>;
const StepC = () => <div>Step C</div>;
const StepD = () => <div>Step D</div>;

const flow = [StepA, StepB, StepC, StepD];
const firstStep = 0;
const lastStep = flow.length - 1;

describe("<Flow />", () => {
  describe("useFlow() hook", () => {
    describe("Initial render", () => {
      it("should default currentStep to 0 on the initial render", () => {
        const onExit = jest.fn();
        const wrapper: React.FC = ({ children }) => (
          <Flow flow={flow} onExit={onExit}>
            {children}
          </Flow>
        );

        const { result } = renderHook(() => useFlow(), { wrapper });

        expect(result.current.currentStep).toBe(firstStep);
      });
    });

    describe("Stepping 1 step forward with forward()", () => {
      it("should move the currentStep by 1 on forward() to = 1", () => {
        const onExit = jest.fn();
        const wrapper: React.FC = ({ children }) => (
          <Flow flow={flow} onExit={onExit}>
            {children}
          </Flow>
        );

        const { result } = renderHook(() => useFlow(), { wrapper });

        expect(result.current.currentStep).toBe(firstStep);

        act(() => {
          result.current.forward();
        });

        expect(result.current.currentStep).toBe(1);
      });

      it("should move the currentStep by 1 for each forward() call to = 2", () => {
        const onExit = jest.fn();
        const wrapper: React.FC = ({ children }) => (
          <Flow flow={flow} onExit={onExit}>
            {children}
          </Flow>
        );

        const { result } = renderHook(() => useFlow(), { wrapper });

        expect(result.current.currentStep).toBe(firstStep);

        act(() => {
          result.current.forward();
        });

        expect(result.current.currentStep).toBe(1);

        act(() => {
          result.current.forward();
        });

        expect(result.current.currentStep).toBe(2);
      });

      it("should move the currentStep by 1 for each forward() call to = 3", () => {
        const onExit = jest.fn();
        const wrapper: React.FC = ({ children }) => (
          <Flow flow={flow} onExit={onExit}>
            {children}
          </Flow>
        );

        const { result } = renderHook(() => useFlow(), { wrapper });

        expect(result.current.currentStep).toBe(firstStep);

        act(() => {
          result.current.forward();
        });

        act(() => {
          result.current.forward();
        });

        act(() => {
          result.current.forward();
        });

        expect(result.current.currentStep).toBe(lastStep);
      });

      it("should not move the currentStep beyond the last step of the flow regardless of how many time forward() is called", () => {
        const onExit = jest.fn();
        const wrapper: React.FC = ({ children }) => (
          <Flow flow={flow} onExit={onExit}>
            {children}
          </Flow>
        );

        const { result } = renderHook(() => useFlow(), { wrapper });

        expect(result.current.currentStep).toBe(firstStep);

        act(() => {
          result.current.forward();
        });

        act(() => {
          result.current.forward();
        });

        act(() => {
          result.current.forward();
        });

        act(() => {
          result.current.forward();
        });

        expect(result.current.currentStep).toBe(lastStep);
      });
    });

    describe("Stepping 1 step  backward with back()", () => {
      it("should not move the currentStep when calling back() on the initial render", () => {
        const onExit = jest.fn();
        const wrapper: React.FC = ({ children }) => (
          <Flow flow={flow} onExit={onExit}>
            {children}
          </Flow>
        );

        const { result } = renderHook(() => useFlow(), { wrapper });

        expect(result.current.currentStep).toBe(firstStep);

        act(() => {
          result.current.back();
        });

        expect(result.current.currentStep).toBe(firstStep);
      });

      it("should move the currentStep by 1 for each forward() call & move back currentStep by 1 after calling back()", () => {
        const onExit = jest.fn();
        const wrapper: React.FC = ({ children }) => (
          <Flow flow={flow} onExit={onExit}>
            {children}
          </Flow>
        );

        const { result } = renderHook(() => useFlow(), { wrapper });

        expect(result.current.currentStep).toBe(firstStep);

        act(() => {
          result.current.forward();
          result.current.forward();
        });

        act(() => {
          result.current.back();
        });

        expect(result.current.currentStep).toBe(1);
      });

      it("should move the currentStep by 1 for each forward() call & move currentStep to 0 on each back() call", () => {
        const onExit = jest.fn();
        const wrapper: React.FC = ({ children }) => (
          <Flow flow={flow} onExit={onExit}>
            {children}
          </Flow>
        );

        const { result } = renderHook(() => useFlow(), { wrapper });

        expect(result.current.currentStep).toBe(firstStep);

        act(() => {
          result.current.forward();
          result.current.forward();
          result.current.forward();
        });

        expect(result.current.currentStep).toBe(lastStep);

        act(() => {
          result.current.back();
          result.current.back();
          result.current.back();
        });

        expect(result.current.currentStep).toBe(firstStep);
      });

      it("should not move the currentStep beyond the first step of the flow regardless of how many times back() is called", () => {
        const onExit = jest.fn();
        const wrapper: React.FC = ({ children }) => (
          <Flow flow={flow} onExit={onExit}>
            {children}
          </Flow>
        );

        const { result } = renderHook(() => useFlow(), { wrapper });

        expect(result.current.currentStep).toBe(firstStep);

        act(() => {
          result.current.forward();
          result.current.forward();
          result.current.forward();
        });

        expect(result.current.currentStep).toBe(lastStep);
        expect(result.current.flowCurrentStep).toEqual(StepD);

        act(() => {
          result.current.back();
          result.current.back();
          result.current.back();
        });

        expect(result.current.currentStep).toBe(firstStep);

        act(() => {
          result.current.back();
        });

        expect(onExit).toBeCalledTimes(1);
        expect(result.current.currentStep).toBe(firstStep);
        expect(result.current.flowCurrentStep).toEqual(StepA);
      });
    });

    describe("Exiting the flow with exit()", () => {
      it("should reset the the flow when the exit() is called", () => {
        const onExit = jest.fn();
        const wrapper: React.FC = ({ children }) => (
          <Flow flow={flow} onExit={onExit}>
            {children}
          </Flow>
        );

        const { result } = renderHook(() => useFlow(), { wrapper });

        expect(result.current.currentStep).toBe(firstStep);

        act(() => {
          result.current.forward();
          result.current.forward();
          result.current.forward();
        });

        expect(result.current.currentStep).toBe(lastStep);
        expect(result.current.flowCurrentStep).toEqual(StepD);

        act(() => {
          result.current.exit();
        });

        expect(onExit).toBeCalledTimes(1);
        expect(result.current.currentStep).toBe(firstStep);
        expect(result.current.flowCurrentStep).toEqual(StepA);
      });
    });
  });
});
