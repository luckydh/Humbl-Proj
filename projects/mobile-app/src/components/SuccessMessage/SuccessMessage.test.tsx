import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { StaticRouter, Router } from "react-router-dom";

import SuccessMessage from "./SuccessMessage";

describe("SuccessMessage", () => {
  it("renders the given message if a merchant is passed through route state", () => {
    const locationState = {
      state: {
        merchant: {},
      },
    };

    const { queryByText, container } = render(
      <StaticRouter location={locationState}>
        <SuccessMessage message="Success message" />
      </StaticRouter>
    );

    expect(queryByText("Success message")).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it("returns to /home when the Home button is pressed", () => {
    const history = createMemoryHistory();

    history.push("/", {
      merchant: {},
    });

    const { getByTestId } = render(
      <Router history={history}>
        <SuccessMessage message="Success message" />
      </Router>
    );

    userEvent.click(getByTestId("return_home"));

    expect(history.location.pathname).toBe("/home");
  });
});
