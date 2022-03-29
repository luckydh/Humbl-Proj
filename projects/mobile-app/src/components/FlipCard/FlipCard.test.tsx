import React from "react";
import { render, screen, act } from "@testing-library/react";
import user from "@testing-library/user-event";
import { FlipCard } from "./FlipCard";

describe("FlipCard", () => {
  it('should render <FlipCard /> with defaults speed = "default" & direction = "y"', () => {
    render(<FlipCard front={<p>front</p>} back={<p>back</p>} />);

    const flipper = screen.getByTestId("flipper");
    const front = screen.getByTestId("front");
    const back = screen.getByTestId("back");

    expect(front.classList.contains("duration-500")).toBe(true);
    expect(back.classList.contains("duration-500")).toBe(true);

    expect(flipper.classList.contains("vertical")).toBe(true);
  });

  it('should flip <FlipCard /> on click with speed = "default" & direction = "y"', () => {
    const handleOnFlip = jest.fn();
    render(<FlipCard front={<p>front</p>} back={<p>back</p>} onFlip={handleOnFlip} />);

    const flipCard = screen.getByTestId("flip-card");
    const flipper = screen.getByTestId("flipper");

    act(() => {
      user.click(flipCard);
    });

    expect(handleOnFlip).toBeCalledTimes(1);
    expect(flipper.classList.contains("vertical")).toBe(true);
    expect(flipper.classList.contains("flip-y")).toBe(true);
  });

  it('should flip <FlipCard /> on click & return back to its original position & flip back with speed = "default" & direction = "y"', () => {
    const handleOnFlip = jest.fn();
    render(<FlipCard front={<p>front</p>} back={<p>back</p>} onFlip={handleOnFlip} />);

    const flipCard = screen.getByTestId("flip-card");
    const flipper = screen.getByTestId("flipper");

    act(() => {
      user.click(flipCard);
    });

    expect(handleOnFlip).toBeCalledTimes(1);
    expect(flipper.classList.contains("vertical")).toBe(true);
    expect(flipper.classList.contains("flip-y")).toBe(true);

    act(() => {
      user.click(flipCard);
    });

    expect(handleOnFlip).toBeCalledTimes(2);
    expect(flipper.classList.contains("vertical")).toBe(true);
    expect(flipper.classList.contains("flip-y")).toBe(false);

    act(() => {
      user.click(flipCard);
    });

    expect(handleOnFlip).toBeCalledTimes(3);
    expect(flipper.classList.contains("vertical")).toBe(true);
    expect(flipper.classList.contains("flip-y")).toBe(true);
  });

  it('should render <FlipCard /> with speed = "fastest" & direction = "x" ', () => {
    render(<FlipCard front={<p>front</p>} back={<p>back</p>} direction="x" speed="fastest" />);

    const flipper = screen.getByTestId("flipper");
    const front = screen.getByTestId("front");
    const back = screen.getByTestId("back");

    expect(front.classList.contains("duration-200")).toBe(true);
    expect(back.classList.contains("duration-200")).toBe(true);

    expect(flipper.classList.contains("horizontal")).toBe(true);
  });

  it('should flip <FlipCard /> on click & return back to its original position & flip back with speed = "slow" & direction = "x"', () => {
    const handleOnFlip = jest.fn();
    render(<FlipCard front={<p>front</p>} back={<p>back</p>} onFlip={handleOnFlip} direction="x" speed="slowest" />);

    const flipCard = screen.getByTestId("flip-card");
    const flipper = screen.getByTestId("flipper");
    const front = screen.getByTestId("front");
    const back = screen.getByTestId("back");

    act(() => {
      user.click(flipCard);
    });

    expect(front.classList.contains("duration-1000")).toBe(true);
    expect(back.classList.contains("duration-1000")).toBe(true);

    expect(handleOnFlip).toBeCalledTimes(1);
    expect(flipper.classList.contains("horizontal")).toBe(true);
    expect(flipper.classList.contains("flip-x")).toBe(true);

    act(() => {
      user.click(flipCard);
    });

    expect(handleOnFlip).toBeCalledTimes(2);
    expect(flipper.classList.contains("horizontal")).toBe(true);
    expect(flipper.classList.contains("flip-x")).toBe(false);

    act(() => {
      user.click(flipCard);
    });

    expect(flipper.classList.contains("horizontal")).toBe(true);
    expect(flipper.classList.contains("flip-x")).toBe(true);
  });
});
