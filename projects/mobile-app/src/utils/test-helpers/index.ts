import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export * from "./rendering";

/**
 * This is an helper function you can use with Apollo MockedProvider to test
 * your loading and success/error states.
 *
 * When you first render something with MockedProvider, the load state is shown.
 * Once you call this function, the assertions are delayed to the next tick of
 * event loop, giving MockedProvider enough time to populate the mocks. So the
 * next state is displayed.
 *
 * It is wrapped in act(...) to prevent related warnings.
 *
 * @example
 * ```typescript
 *const { getByText } = render(<MockedProvider mocks={[]}><Page /></MockedProvider>);

 *expect(getByText("loading")).toBeInTheDocument(); // loading state

 *await actNextTick(); // call this function

 *expect(getByText("success")).toBeInTheDocument(); // result state
 * ```
 */
export const actNextTick = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

/**
 * Enters the given value in the Calculator component of a test screen one by one, as if
 * the user was clicking. Should only be used with screens that use the Calculator component.
 *
 * @param value Value to be entered.
 */
export const enterValueInCalculator = (value: string) => {
  value.split("").forEach((char) => userEvent.click(screen.getByTestId(`calculator-button-${char}`)));
};
