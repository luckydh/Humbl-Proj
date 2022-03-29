import { render } from "@testing-library/react";

import { Button } from "./Button";
import { styles, sizes, FULL_WIDTH } from "./styles";

describe("Button component", () => {
  describe("Primary", () => {
    it("should render a primary button", () => {
      const { getByText } = render(<Button>Primary</Button>);

      const element = getByText(/primary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.primary);
      expect(element).toHaveClass(sizes.sm);
    });

    it("should render a large primary button", () => {
      const { getByText } = render(<Button size="md">Primary</Button>);

      const element = getByText(/primary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.primary);
      expect(element).toHaveClass(sizes.md);
    });

    it("should render a large primary button", () => {
      const { getByText } = render(<Button size="lg">Primary</Button>);

      const element = getByText(/primary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.primary);
      expect(element).toHaveClass(sizes.lg);
    });

    it("should render a small block level primary button", () => {
      const { getByText } = render(<Button block>Primary</Button>);

      const element = getByText(/primary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.primary);
      expect(element).toHaveClass(sizes.sm);
      expect(element).toHaveClass(FULL_WIDTH);
    });

    it("should render a medium block level primary button", () => {
      const { getByText } = render(
        <Button block size="md">
          Primary
        </Button>
      );

      const element = getByText(/primary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.primary);
      expect(element).toHaveClass(sizes.md);
      expect(element).toHaveClass(FULL_WIDTH);
    });

    it("should render a large block level primary button", () => {
      const { getByText } = render(
        <Button block size="lg">
          Primary
        </Button>
      );

      const element = getByText(/primary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.primary);
      expect(element).toHaveClass(sizes.lg);
      expect(element).toHaveClass(FULL_WIDTH);
    });

    it("should render a disabled small primary button", () => {
      const { getByText } = render(<Button disabled>Primary</Button>);

      const element = getByText(/primary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.primary);
      expect(element).toHaveClass(sizes.sm);
      expect(element).toBeDisabled();
    });

    it('should render a disabled medium primary button with size="md"', () => {
      const { getByText } = render(
        <Button disabled size="md">
          Primary
        </Button>
      );

      const element = getByText(/primary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.primary);
      expect(element).toHaveClass(sizes.md);
      expect(element).toBeDisabled();
    });

    it('should render a disabled large primary button with size="lg"', () => {
      const { getByText } = render(
        <Button disabled size="lg">
          Primary
        </Button>
      );

      const element = getByText(/primary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.primary);
      expect(element).toHaveClass(sizes.lg);
      expect(element).toBeDisabled();
    });
  });

  describe("Secondary", () => {
    it("should render a secondary button", () => {
      const { getByText } = render(<Button type="secondary">Secondary</Button>);

      const element = getByText(/secondary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.secondary);
      expect(element).toHaveClass(sizes.sm);
    });

    it("should render a large secondary button", () => {
      const { getByText } = render(
        <Button type="secondary" size="md">
          Secondary
        </Button>
      );

      const element = getByText(/secondary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.secondary);
      expect(element).toHaveClass(sizes.md);
    });

    it("should render a large secondary button", () => {
      const { getByText } = render(
        <Button type="secondary" size="lg">
          Secondary
        </Button>
      );

      const element = getByText(/secondary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.secondary);
      expect(element).toHaveClass(sizes.lg);
    });

    it("should render a small block level secondary button", () => {
      const { getByText } = render(
        <Button type="secondary" block>
          Secondary
        </Button>
      );

      const element = getByText(/secondary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.secondary);
      expect(element).toHaveClass(sizes.sm);
      expect(element).toHaveClass(FULL_WIDTH);
    });

    it("should render a medium block level secondary button", () => {
      const { getByText } = render(
        <Button type="secondary" block size="md">
          Secondary
        </Button>
      );

      const element = getByText(/secondary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.secondary);
      expect(element).toHaveClass(sizes.md);
      expect(element).toHaveClass(FULL_WIDTH);
    });

    it("should render a large block level secondary button", () => {
      const { getByText } = render(
        <Button type="secondary" block size="lg">
          Secondary
        </Button>
      );

      const element = getByText(/secondary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.secondary);
      expect(element).toHaveClass(sizes.lg);
      expect(element).toHaveClass(FULL_WIDTH);
    });

    it("should render a disabled small secondary button", () => {
      const { getByText } = render(
        <Button type="secondary" disabled>
          Secondary
        </Button>
      );

      const element = getByText(/secondary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.secondary);
      expect(element).toHaveClass(sizes.sm);
      expect(element).toBeDisabled();
    });

    it('should render a disabled medium secondary button with size="md"', () => {
      const { getByText } = render(
        <Button type="secondary" disabled size="md">
          Secondary
        </Button>
      );

      const element = getByText(/secondary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.secondary);
      expect(element).toHaveClass(sizes.md);
      expect(element).toBeDisabled();
    });

    it('should render a disabled large secondary button with size="lg"', () => {
      const { getByText } = render(
        <Button disabled size="lg" type="secondary">
          Secondary
        </Button>
      );

      const element = getByText(/secondary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.secondary);
      expect(element).toHaveClass(sizes.lg);
      expect(element).toBeDisabled();
    });
  });

  describe("Tertiary", () => {
    it("should render a tertiary button", () => {
      const { getByText } = render(<Button type="tertiary">Tertiary</Button>);

      const element = getByText(/tertiary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.tertiary);
      expect(element).toHaveClass(sizes.sm);
    });

    it("should render a large tertiary button", () => {
      const { getByText } = render(
        <Button type="tertiary" size="md">
          Tertiary
        </Button>
      );

      const element = getByText(/tertiary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.tertiary);
      expect(element).toHaveClass(sizes.md);
    });

    it("should render a large tertiary button", () => {
      const { getByText } = render(
        <Button type="tertiary" size="lg">
          Tertiary
        </Button>
      );

      const element = getByText(/tertiary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.tertiary);
      expect(element).toHaveClass(sizes.lg);
    });

    it("should render a small block level tertiary button", () => {
      const { getByText } = render(
        <Button type="tertiary" block>
          Tertiary
        </Button>
      );

      const element = getByText(/tertiary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.tertiary);
      expect(element).toHaveClass(sizes.sm);
      expect(element).toHaveClass(FULL_WIDTH);
    });

    it("should render a medium block level tertiary button", () => {
      const { getByText } = render(
        <Button type="tertiary" block size="md">
          Tertiary
        </Button>
      );

      const element = getByText(/tertiary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.tertiary);
      expect(element).toHaveClass(sizes.md);
      expect(element).toHaveClass(FULL_WIDTH);
    });

    it("should render a large block level tertiary button", () => {
      const { getByText } = render(
        <Button type="tertiary" block size="lg">
          Tertiary
        </Button>
      );

      const element = getByText(/tertiary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.tertiary);
      expect(element).toHaveClass(sizes.lg);
      expect(element).toHaveClass(FULL_WIDTH);
    });

    it("should render a disabled small tertiary button", () => {
      const { getByText } = render(
        <Button type="tertiary" disabled>
          Tertiary
        </Button>
      );

      const element = getByText(/tertiary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.tertiary);
      expect(element).toHaveClass(sizes.sm);
      expect(element).toBeDisabled();
    });

    it('should render a disabled medium tertiary button with size="md"', () => {
      const { getByText } = render(
        <Button type="tertiary" disabled size="md">
          Tertiary
        </Button>
      );

      const element = getByText(/tertiary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.tertiary);
      expect(element).toHaveClass(sizes.md);
      expect(element).toBeDisabled();
    });

    it('should render a disabled large tertiary button with size="lg"', () => {
      const { getByText } = render(
        <Button disabled size="lg" type="tertiary">
          Tertiary
        </Button>
      );

      const element = getByText(/tertiary/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.tertiary);
      expect(element).toHaveClass(sizes.lg);
      expect(element).toBeDisabled();
    });
  });

  describe("Link", () => {
    it("should render a link button", () => {
      const { getByText } = render(<Button type="link">Link</Button>);

      const element = getByText(/link/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.link);
      expect(element).toHaveClass(sizes.sm);
    });

    it("should render a large link button", () => {
      const { getByText } = render(
        <Button type="link" size="md">
          Link
        </Button>
      );

      const element = getByText(/link/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.link);
      expect(element).toHaveClass(sizes.md);
    });

    it("should render a large link button", () => {
      const { getByText } = render(
        <Button type="link" size="lg">
          Link
        </Button>
      );

      const element = getByText(/link/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.link);
      expect(element).toHaveClass(sizes.lg);
    });

    it("should render a small block level link button", () => {
      const { getByText } = render(
        <Button type="link" block>
          Link
        </Button>
      );

      const element = getByText(/link/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.link);
      expect(element).toHaveClass(sizes.sm);
      expect(element).toHaveClass(FULL_WIDTH);
    });

    it("should render a medium block level link button", () => {
      const { getByText } = render(
        <Button type="link" block size="md">
          Link
        </Button>
      );

      const element = getByText(/link/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.link);
      expect(element).toHaveClass(sizes.md);
      expect(element).toHaveClass(FULL_WIDTH);
    });

    it("should render a large block level link button", () => {
      const { getByText } = render(
        <Button type="link" block size="lg">
          Link
        </Button>
      );

      const element = getByText(/link/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.link);
      expect(element).toHaveClass(sizes.lg);
      expect(element).toHaveClass(FULL_WIDTH);
    });

    it("should render a disabled small link button", () => {
      const { getByText } = render(
        <Button type="link" disabled>
          Link
        </Button>
      );

      const element = getByText(/link/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.link);
      expect(element).toHaveClass(sizes.sm);
      expect(element).toBeDisabled();
    });

    it('should render a disabled medium link button with size="md"', () => {
      const { getByText } = render(
        <Button type="link" disabled size="md">
          Link
        </Button>
      );

      const element = getByText(/link/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.link);
      expect(element).toHaveClass(sizes.md);
      expect(element).toBeDisabled();
    });

    it('should render a disabled large link button with size="lg"', () => {
      const { getByText } = render(
        <Button disabled size="lg" type="link">
          Link
        </Button>
      );

      const element = getByText(/link/gi);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(styles.link);
      expect(element).toHaveClass(sizes.lg);
      expect(element).toBeDisabled();
    });
  });
});
