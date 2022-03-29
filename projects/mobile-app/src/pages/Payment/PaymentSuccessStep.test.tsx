import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { advanceTo, clear } from "jest-date-mock";
import { StaticRouter, MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { useGetAccountByIdQueryMock } from "utils/test-helpers/random-users/randomUserMocks";
import { AccountType } from "generated/graphql";
import i18n from "../../i18n";

import PaymentSuccessStep from "./PaymentSuccessStep";

if (i18n.options) {
  i18n.options.react = {
    useSuspense: false,
  };
}

const testAccount: AccountType = {
  id: "test-12345",
  image: "",
  userName: "test",
  displayName: "Test",
};

const defaultProps = {
  currency: "USD",
  account: testAccount,
  totalAmount: 10000,
  onClickReview: jest.fn(),
};

beforeAll(() => {
  advanceTo(new Date(2021, 0, 1, 0, 0, 0, 0));
});

afterAll(() => {
  clear();
});

describe("PaymentSuccessStep", () => {
  it("should display the total amount with correct currency symbol", () => {
    const Providers: React.FC = ({ children }) => (
      <MockedProvider mocks={[useGetAccountByIdQueryMock(1)]} addTypename={false}>
        <MemoryRouter>{children}</MemoryRouter>
      </MockedProvider>
    );

    const { getByText, asFragment, rerender } = render(<PaymentSuccessStep {...defaultProps} currency="USD" />, {
      wrapper: Providers,
    });

    expect(getByText("$100.00 USD")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();

    rerender(<PaymentSuccessStep {...defaultProps} currency="MXN" />);

    expect(getByText("$100.00 MXN")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();

    rerender(<PaymentSuccessStep {...defaultProps} currency="CAD" />);

    expect(getByText("$100.00 CAD")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call onClickReview when clicking the CTA", async () => {
    const onClickReview = jest.fn();

    const { getByText } = render(
      <StaticRouter>
        <MockedProvider mocks={[useGetAccountByIdQueryMock(1)]} addTypename={false}>
          <PaymentSuccessStep {...defaultProps} onClickReview={onClickReview} />
        </MockedProvider>
      </StaticRouter>
    );

    userEvent.click(getByText("payment-page.action.write-a-review"));

    expect(onClickReview).toBeCalled();
  });
});
