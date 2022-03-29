import React from "react";
import { render, screen } from "@testing-library/react";
import { Pill } from "./Pill";

describe("Pill component", () => {
  it('should render <Pill /> with "10% APY" text', () => {
    render(<Pill>10% APY</Pill>);

    const elementWithText = screen.getByText("10% APY");
    expect(elementWithText).toBeInTheDocument();
  });

  it("should render <Pill /> with the default state if no color is passed", () => {
    render(<Pill />);

    const element = screen.getByTestId("pill-container");
    expect(element).toBeInTheDocument();
    expect(element.classList.contains("bg-gray-400")).toBe(true);
    expect(element.classList.contains("text-gray-800")).toBe(true);
  });

  it("should render <Pill color='default' /> in the default state", () => {
    render(<Pill color="default">10% APY</Pill>);

    const element = screen.getByTestId("pill-container");
    expect(element).toBeInTheDocument();
    expect(element.classList.contains("bg-gray-400")).toBe(true);
    expect(element.classList.contains("text-gray-800")).toBe(true);
  });

  it("should render <Pill color='default' /> in the outlined default state", () => {
    render(
      <Pill outline color="default">
        10% APY
      </Pill>
    );

    const element = screen.getByTestId("pill-container");
    expect(element).toBeInTheDocument();
    expect(element.classList.contains("border-gray-800")).toBe(true);
    expect(element.classList.contains("text-gray-800")).toBe(true);
  });

  it("should render <Pill color='green' /> in the green state", () => {
    render(<Pill color="green">10% APY</Pill>);

    const element = screen.getByTestId("pill-container");
    expect(element).toBeInTheDocument();
    expect(element.classList.contains("bg-green-positive")).toBe(true);
    expect(element.classList.contains("text-white")).toBe(true);
  });

  it("should render <Pill outline color='green' /> in the outlined green state", () => {
    render(
      <Pill outline color="green">
        10% APY
      </Pill>
    );

    const element = screen.getByTestId("pill-container");
    expect(element).toBeInTheDocument();
    expect(element.classList.contains("border-green-positive")).toBe(true);
    expect(element.classList.contains("text-green-positive")).toBe(true);
  });

  it("should render <Pill color='red' /> in the red state", () => {
    render(<Pill color="red">10% APY</Pill>);

    const element = screen.getByTestId("pill-container");
    expect(element).toBeInTheDocument();
    expect(element.classList.contains("bg-red")).toBe(true);
    expect(element.classList.contains("text-white")).toBe(true);
  });

  it("should render <Pill outline color='red' /> in the outlined red state", () => {
    render(
      <Pill outline color="red">
        10% APY
      </Pill>
    );

    const element = screen.getByTestId("pill-container");
    expect(element).toBeInTheDocument();
    expect(element.classList.contains("border-red")).toBe(true);
    expect(element.classList.contains("text-red")).toBe(true);
  });

  it("should render <Pill outline /> in the blue state", () => {
    render(<Pill color="blue">10% APY</Pill>);

    const element = screen.getByTestId("pill-container");
    expect(element).toBeInTheDocument();
    expect(element.classList.contains("bg-blue")).toBe(true);
    expect(element.classList.contains("text-white")).toBe(true);
  });

  it("should render <Pill outline color='blue' /> in the outlined blue state", () => {
    render(
      <Pill outline color="blue">
        10% APY
      </Pill>
    );

    const element = screen.getByTestId("pill-container");
    expect(element).toBeInTheDocument();
    expect(element.classList.contains("border-blue")).toBe(true);
    expect(element.classList.contains("text-blue")).toBe(true);
  });

  it("should render <Pill color='yellow' /> in the yellow state", () => {
    render(<Pill color="yellow">10% APY</Pill>);

    const element = screen.getByTestId("pill-container");
    expect(element).toBeInTheDocument();
    expect(element.classList.contains("bg-yellow")).toBe(true);
    expect(element.classList.contains("text-white")).toBe(true);
  });

  it("should render <Pill outline color='yellow' /> in the outlined yellow state", () => {
    render(
      <Pill outline color="yellow">
        10% APY
      </Pill>
    );

    const element = screen.getByTestId("pill-container");
    expect(element).toBeInTheDocument();
    expect(element.classList.contains("border-yellow")).toBe(true);
    expect(element.classList.contains("text-yellow")).toBe(true);
  });
});
