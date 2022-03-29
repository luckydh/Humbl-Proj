import { render } from "@testing-library/react";

import { Typography } from "./Typography";
import { baseSizes, headingSizes, colors, weights } from "./styles";

describe("Typography component", () => {
  describe("Base", () => {
    it("should render a base text with normal weight, blue text color & extra small size", () => {
      const { getByText } = render(
        <Typography type="base" size="xs" color="blue" weight="normal">
          Base Text
        </Typography>
      );

      const element = getByText(/base/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(baseSizes.xs);
      expect(element).toHaveClass(colors.blue);
      expect(element).toHaveClass(weights.normal);
    });

    it("should render a base text with normal weight, black text color & small size", () => {
      const { getByText } = render(
        <Typography type="base" size="sm" color="black" weight="normal">
          Base Text
        </Typography>
      );

      const element = getByText(/base/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(baseSizes.sm);
      expect(element).toHaveClass(colors.black);
      expect(element).toHaveClass(weights.normal);
    });

    it("should render a base text with medium weight, blue text color & medium size", () => {
      const { getByText } = render(
        <Typography type="base" size="md" color="blue" weight="medium">
          Base Text
        </Typography>
      );

      const element = getByText(/base/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(baseSizes.md);
      expect(element).toHaveClass(colors.blue);
      expect(element).toHaveClass(weights.medium);
    });

    it("should render a base text with medium weight, blue text color & large size", () => {
      const { getByText } = render(
        <Typography type="base" size="lg" color="blue" weight="medium">
          Base Text
        </Typography>
      );

      const element = getByText(/base/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(baseSizes.lg);
      expect(element).toHaveClass(colors.blue);
      expect(element).toHaveClass(weights.medium);
    });

    it("should render a base text with semibold weight, blue text color & xl size", () => {
      const { getByText } = render(
        <Typography type="base" size="xl" color="blue" weight="semibold">
          Base Text
        </Typography>
      );

      const element = getByText(/base/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(baseSizes.xl);
      expect(element).toHaveClass(colors.blue);
      expect(element).toHaveClass(weights.semibold);
    });
  });

  describe("Headline", () => {
    it("should render a headline text with bold weight, blue text color & extra small size", () => {
      const { getByText } = render(
        <Typography type="headline" size="xs" color="blue">
          Headline Text
        </Typography>
      );

      const element = getByText(/headline/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(headingSizes.xs);
      expect(element).toHaveClass(colors.blue);
      expect(element).toHaveClass(weights.bold);
    });

    it("should render a headline text with bold weight, blue text color & small size", () => {
      const { getByText } = render(
        <Typography type="headline" size="sm" color="blue">
          Headline Text
        </Typography>
      );

      const element = getByText(/headline/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(headingSizes.sm);
      expect(element).toHaveClass(colors.blue);
      expect(element).toHaveClass(weights.bold);
    });

    it("should render a headline text with bold weight, blue text color & medium size", () => {
      const { getByText } = render(
        <Typography type="headline" size="md" color="blue">
          Headline Text
        </Typography>
      );

      const element = getByText(/headline/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(headingSizes.md);
      expect(element).toHaveClass(colors.blue);
      expect(element).toHaveClass(weights.bold);
    });

    it("should render a headline text with bold weight, blue text color & large size", () => {
      const { getByText } = render(
        <Typography type="headline" size="lg" color="blue">
          Headline Text
        </Typography>
      );

      const element = getByText(/headline/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(headingSizes.lg);
      expect(element).toHaveClass(colors.blue);
      expect(element).toHaveClass(weights.bold);
    });

    it("should render a headline text with semibold weight, blue text color & extra large size", () => {
      const { getByText } = render(
        <Typography type="headline" size="xl" color="blue">
          Headline Text
        </Typography>
      );

      const element = getByText(/headline/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(headingSizes.xl);
      expect(element).toHaveClass(colors.blue);
      expect(element).toHaveClass(weights.bold);
    });
  });
});
