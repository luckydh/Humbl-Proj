import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  getByText,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { CreateMerchantDocument, IsUsernameAvailableDocument } from "generated/graphql";
import CreateMerchantProfile from "./MerchantProfileCreate";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
      t: (string: string) => string,
    }),
}));

const mocks = [
  {
    request: {
      query: IsUsernameAvailableDocument,
      variables: { keyword: "laareperia" },
    },
    result: {
      data: { isUsernameAvailable: true },
    },
  },
  {
    request: {
      query: CreateMerchantDocument,
      variables: {
        displayName: "La areperia",
        merchantType: "RESTAURANTS",
        currency: "USD",
        location: {
          country: "us",
        },
        userName: "laareperia",
        phoneNumber: "+18008778339",
        hasAddress: false,
      },
    },
    result: {
      data: { createMerchant: { userName: "laareperia" } },
    },
  },
];

describe("Merchant Create flow", () => {
  it.skip("Should create merchant a redirect to success page", async () => {
    const mockHistory = createMemoryHistory();

    render(
      <Router history={mockHistory}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <CreateMerchantProfile />
        </MockedProvider>
      </Router>
    );

    const button = screen.getByText("merchant-create-page.button.create-merchant-profile");
    const displayName = screen.getByPlaceholderText(
      "merchant-create-page.place-holder.merchant-name"
    );
    const merchantType = document.getElementsByName("merchantType")[0];
    const country = document.getElementsByName("location.country")[0];
    const currency = screen.getByText("merchant-create-page.message.select-currency");
    const userName = screen.getByPlaceholderText(
      "merchant-create-page.placeholder.user-name"
    );
    const phoneNumber = screen.getByPlaceholderText(
      "merchant-create-page.placeholder.phone-number"
    );

    userEvent.type(displayName, "La areperia");
    fireEvent.change(phoneNumber, { target: { value: "+18008778339" } });

    const merchantTypeOptionToSelect = getByText(
      merchantType,
      "merchant-dropdown.typeof.restaurants"
    ) as HTMLOptionElement;
    userEvent.selectOptions(merchantType, [merchantTypeOptionToSelect.value]);

    fireEvent.change(currency, { target: { value: "USD" } });

    const countryOptionToSelect = getByText(
      country,
      "United States of America"
    ) as HTMLOptionElement;

    act(() => userEvent.selectOptions(country, [countryOptionToSelect.value]));

    await userEvent.type(userName, "laareperia");

    await waitFor(() =>
      expect(
        screen.getByText("user-name.success.this-username-is-available")
      ).toBeInTheDocument()
    );

    fireEvent.click(button);

    await waitFor(() =>
      expect(mockHistory.location.pathname).toBe("/merchantcreatesuccess")
    );
  });

  it("Should show error messages if form is submited empty", async () => {
    const mockHistory = createMemoryHistory();

    render(
      <Router history={mockHistory}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <CreateMerchantProfile />
        </MockedProvider>
      </Router>
    );

    const button = screen.getByText("merchant-create-page.button.create-merchant-profile");

    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("merchant-create-page.message.merchant-name-is-required")
      ).toBeInTheDocument();

      expect(
        screen.getByText("merchant-create-page.message.merchant-type-is-required")
      ).toBeInTheDocument();

      expect(
        screen.getByText("merchant-create-page.message.country-is-required")
      ).toBeInTheDocument();

      expect(
        screen.getByText("merchant-create-page.message.phone-number-is-required")
      ).toBeInTheDocument();

      expect(
        screen.getByText("merchant-create-page.message.currency-is-required")
      ).toBeInTheDocument();

      expect(
        screen.getByText("merchant-create-page.message.user-name-is-required")
      ).toBeInTheDocument();
    });
  });

  it("Should NOT display address fields if business address is NOT checked", async () => {
    const mockHistory = createMemoryHistory();

    render(
      <Router history={mockHistory}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <CreateMerchantProfile />
        </MockedProvider>
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.queryByPlaceholderText("merchant-create-page.placeholder.address-line-1")
      ).toBeNull();

      expect(
        screen.queryByPlaceholderText("merchant-create-page.placeholder.address-line-2")
      ).toBeNull();

      expect(
        screen.queryByPlaceholderText("merchant-create-page.placeholder.city")
      ).toBeNull();

      expect(screen.queryByText("merchant-create-page.label.state-region")).toBeNull();

      expect(
        screen.queryByPlaceholderText("merchant-create-page.placeholder.postal-code")
      ).toBeNull();
    });
  });

  it("Should display address fields if business address is checked", async () => {
    const mockHistory = createMemoryHistory();

    render(
      <Router history={mockHistory}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <CreateMerchantProfile />
        </MockedProvider>
      </Router>
    );

    const hasAddressCheckbox = document.getElementsByName("hasAddress")[0];

    fireEvent.click(hasAddressCheckbox);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("merchant-create-page.placeholder.address-line-1")
      ).toBeInTheDocument();

      expect(
        screen.getByPlaceholderText("merchant-create-page.placeholder.address-line-2")
      ).toBeInTheDocument();

      expect(
        screen.getByPlaceholderText("merchant-create-page.placeholder.city")
      ).toBeInTheDocument();

      expect(
        screen.getAllByText("merchant-create-page.label.state-region")[1]
      ).toBeInTheDocument();

      expect(
        screen.getByPlaceholderText("merchant-create-page.placeholder.postal-code")
      ).toBeInTheDocument();
    });
  });

  it("City or state should not be required when cereating a Singapore located merchant", async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <CreateMerchantProfile />
        </MockedProvider>
      </Router>
    );

    const createButton = screen.getByText(
      "merchant-create-page.button.create-merchant-profile"
    );
    const displayName = screen.getByPlaceholderText(
      "merchant-create-page.place-holder.merchant-name"
    );
    const merchantType = document.getElementsByName("merchantType")[0];
    const country = document.getElementsByName("location.country")[0];
    const currency = screen.getByText("merchant-create-page.message.select-currency");
    const phoneNumber = screen.getByPlaceholderText(
      "merchant-create-page.placeholder.phone-number"
    );
    const hasAddressCheckbox = document.getElementsByName("hasAddress")[0];

    userEvent.type(displayName, "La areperia");
    fireEvent.change(phoneNumber, { target: { value: "+18008778339" } });

    const merchantTypeOptionToSelect = getByText(
      merchantType,
      "merchant-dropdown.typeof.restaurants"
    ) as HTMLOptionElement;
    userEvent.selectOptions(merchantType, [merchantTypeOptionToSelect.value]);

    fireEvent.change(currency, { target: { value: "SGD" } });

    const countryOptionToSelect = getByText(country, "Singapore") as HTMLOptionElement;

    act(() => userEvent.selectOptions(country, [countryOptionToSelect.value]));

    fireEvent.click(hasAddressCheckbox);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("merchant-create-page.placeholder.address-line-1")
      ).toBeInTheDocument();

      expect(
        screen.getByPlaceholderText("merchant-create-page.placeholder.city")
      ).toBeInTheDocument();
    });

    fireEvent.click(createButton);

    await waitFor(() =>
      expect(
        screen.queryByText("merchant-create-page.message.city-is-required")
      ).toBeNull()
    );
  });
});
