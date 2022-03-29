import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { IsUsernameAvailableDocument } from "generated/graphql";
import UsernameInput, { UsernameSchema } from "./UsernameInput";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => ({
      t: (string: string) => string,
    }),
}));

const LABEL = "merchant-create-page.label.user-name";
const PLACEHOLDER = "merchant-create-page.placeholder.user-name";
const CONSTRAINTS = "merchant-create-page.info.usernames-can-only-be-letters-numbers-hyphens";
const LOADING = "merchant-create-page.message.username-check";
const AVAILABLE = "user-name.success.this-username-is-available";
const UNAVAILABLE = "user-name.failure.this-username-is-not-available";

describe("UsernameInput", () => {
  it("should render the default input", () => {
    const { queryByText, queryByPlaceholderText, asFragment } = render(
      <MockedProvider>
        <UsernameInput errors={{}} register={() => null} />
      </MockedProvider>
    );

    expect(queryByText(LABEL)).toBeInTheDocument();
    expect(queryByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
    expect(queryByText(CONSTRAINTS)).toBeInTheDocument();

    expect(queryByText(LOADING)).not.toBeInTheDocument();
    expect(queryByText(AVAILABLE)).not.toBeInTheDocument();
    expect(queryByText(UNAVAILABLE)).not.toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should display the success message if username is available", async () => {
    const usernameMock = {
      request: {
        query: IsUsernameAvailableDocument,
        variables: { keyword: "test" },
      },
      result: {
        data: { isUsernameAvailable: true },
      },
    };

    const onValidate = jest.fn();

    const { findByText, getByPlaceholderText, asFragment } = render(
      <MockedProvider mocks={[usernameMock]}>
        <UsernameInput errors={{}} register={() => null} trigger={async () => true} onValidate={onValidate} />
      </MockedProvider>
    );

    userEvent.type(getByPlaceholderText(PLACEHOLDER), "test");

    expect(await findByText(AVAILABLE)).toBeInTheDocument();
    expect(onValidate).toBeCalledWith(true);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display the error message if the username is not available", async () => {
    const usernameMock = {
      request: {
        query: IsUsernameAvailableDocument,
        variables: { keyword: "test" },
      },
      result: {
        data: { isUsernameAvailable: false },
      },
    };

    const onValidate = jest.fn();

    const { findByText, getByPlaceholderText, asFragment } = render(
      <MockedProvider mocks={[usernameMock]}>
        <UsernameInput errors={{}} register={() => null} trigger={async () => true} onValidate={onValidate} />
      </MockedProvider>
    );

    userEvent.type(getByPlaceholderText(PLACEHOLDER), "test");

    expect(await findByText(UNAVAILABLE)).toBeInTheDocument();
    expect(onValidate).toBeCalledWith(false);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display the error message if validation fails", () => {
    const errors = {
      userName: {
        message: "validation error",
      },
    };

    const { queryByText, asFragment } = render(
      <MockedProvider>
        <UsernameInput errors={errors} register={() => null} />
      </MockedProvider>
    );

    expect(queryByText("validation error")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not display other messages if it has validation errors", () => {
    const errors = {
      userName: {
        message: "validation error",
      },
    };

    const usernameMock = {
      request: {
        query: IsUsernameAvailableDocument,
        variables: { keyword: "test" },
      },
      result: {
        data: { isUsernameAvailable: true },
      },
    };

    const { queryByText, getByPlaceholderText } = render(
      <MockedProvider mocks={[usernameMock]}>
        <UsernameInput errors={errors} register={() => null} trigger={async () => true} />
      </MockedProvider>
    );

    userEvent.type(getByPlaceholderText(PLACEHOLDER), "test");

    expect(queryByText("validation error")).toBeInTheDocument();

    expect(queryByText(LOADING)).not.toBeInTheDocument();
    expect(queryByText(AVAILABLE)).not.toBeInTheDocument();
    expect(queryByText(UNAVAILABLE)).not.toBeInTheDocument();
  });
});

describe("UsernameSchema", () => {
  test.each([
    // [input, expected result (true for valid, false for invalid)]
    ["username", true],
    ["username123", true],
    ["user_name", false],
    ["user-name", true],
    ["user.name", false],
    ["user_name.123", false],
    ["user_name-123", false],
    ["user-name.123", false],
    ["user-name_123", false],
    ["user.name-123", false],
    ["user.name_123", false],
    ["u.s.e.r.n.a.m.e", false],
    ["u-s-e-r-n-a-m-e", true],
    ["u_s_e_r_n_a_m_e", false],
    ["user__name", false],
    ["user--name", false],
    ["user..name", false],
    ["user-._name", false],
    [".username", false],
    ["-username", false],
    ["_username", false],
    ["username.", false],
    ["username-", false],
    ["username_", false],
    ["", false],
    ["u", false],
    ["us", false],
    ["with-24-char-should-pass", true],
    ["usernames-with-more-than-24-characters-shouldnt-be-allowed", false],
  ])('should validate "%s" to %s', (username, expected) => {
    const result = UsernameSchema.validate(username);
    expect(!result?.error).toEqual(expected);
  });
});
