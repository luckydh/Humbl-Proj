import React from "react";
import { render, act } from "@testing-library/react";
import { VenueTitle } from "./VenueTitle";
import { mockIsIntersecting } from "react-intersection-observer/test-utils";

const testProps = {
  title: "Test Venue",
  address: {
    city: "Test City",
    postal: "123123",
    region: "Test Region",
    street: "123 Test Avenue",
  },
};

describe("VenueTitle", () => {
  it("should have the full header shown on first render", () => {
    const { getByTestId, queryByText } = render(<VenueTitle {...testProps} />);

    act(() => {
      mockIsIntersecting(getByTestId("venue-title-full"), true);
    });

    expect(queryByText("Test Venue")).toBeInTheDocument();
    expect(queryByText(/123 Test Avenue/)).toBeInTheDocument();
    expect(queryByText(/Test City, Test Region 123123/)).toBeInTheDocument();
  });

  it("should have the fixed header shown when the full header is not visible", () => {
    const { getByTestId, queryAllByText } = render(<VenueTitle {...testProps} />);

    act(() => {
      mockIsIntersecting(getByTestId("venue-title-full"), false);
    });

    const venueTitleFixed = getByTestId("venue-title-fixed");

    expect(venueTitleFixed).toBeInTheDocument();
    expect(queryAllByText("Test Venue")[1]).toBeInTheDocument();
  });
});
