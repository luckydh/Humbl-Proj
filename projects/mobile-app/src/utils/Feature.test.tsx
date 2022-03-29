import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import createApolloMock from "generated/createApolloMock";
import { GetFeaturesDocument } from "generated/graphql";
import React from "react";
import { Feature } from "./Feature";

describe("Feature Flags", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("Render Feature when available and enabled", () => {
    // Set Feature Flag
    const mockedProfile = createApolloMock(
      GetFeaturesDocument,
      {},
      {
        data: {
          features: {
            features: [{ name: "test", id: "1", description: "hello", enabled: true }],
          },
        },
      }
    );
    const output = render(
      <MockedProvider mocks={[mockedProfile]}>
        <Feature name="test" fallback={<h1>This is a fallback</h1>}>
          <h1>Feature is available</h1>
        </Feature>
      </MockedProvider>
    );
    waitFor(() => {
      expect(output.getByText("Feature is available")).toBeInTheDocument();
    });
  });

  it("Render Feature when multiple features exist and feature available and enabled", () => {
    const mockedProfile = createApolloMock(
      GetFeaturesDocument,
      {},
      {
        data: {
          features: {
            features: [
              { name: "testOld", id: "1", description: "hello", enabled: true },
              { name: "test", id: "1", description: "hello", enabled: true },
            ],
          },
        },
      }
    );

    const output = render(
      <MockedProvider mocks={[mockedProfile]}>
        <Feature name="test" fallback={<h1>This is a fallback</h1>}>
          <h1>Feature is available</h1>
        </Feature>
      </MockedProvider>
    );
    waitFor(() => {
      expect(output.getByText("Feature is available")).toBeInTheDocument();
    });
  });

  it("Render Fallback when feature is not enabled", () => {
    const mockedProfile = createApolloMock(
      GetFeaturesDocument,
      {},
      {
        data: {
          features: {
            features: [{ name: "test", id: "1", description: "hello", enabled: false }],
          },
        },
      }
    );
    const output = render(
      <MockedProvider mocks={[mockedProfile]}>
        <Feature name="test" fallback={<h1>This is a fallback</h1>}>
          <h1>Feature is available</h1>
        </Feature>
      </MockedProvider>
    );
    waitFor(() => {
      expect(output.getByText("This is a fallback")).toBeInTheDocument();
    });
  });

  it("Render Feature when not enabled without fallback", () => {
    const mockedProfile = createApolloMock(
      GetFeaturesDocument,
      {},
      {
        data: {
          features: {
            features: [{ name: "test", id: "1", description: "hello", enabled: false }],
          },
        },
      }
    );
    const output = render(
      <MockedProvider mocks={[mockedProfile]}>
        <Feature name="test">
          <h1>Feature is available</h1>
        </Feature>
      </MockedProvider>
    );
    waitFor(() => {
      expect(output.container).toBeEmpty();
    });
  });

  it("Render warning when in dev when feature does not exist", async () => {
    const mockedProfile = createApolloMock(
      GetFeaturesDocument,
      {},
      {
        data: {
          features: {
            features: [{ name: "test", id: "1", description: "hello", enabled: false }],
          },
        },
      }
    );
    // Set process env to development
    const output = render(
      <MockedProvider mocks={[mockedProfile]}>
        <Feature name="nonExistantFeature" fallback={<h1>This is a fallback</h1>}>
          <h1>Feature is available</h1>
        </Feature>
      </MockedProvider>
    );
    waitFor(() => {
      expect(output.container.firstChild?.childNodes[0]?.textContent).toEqual("No feature named");
      expect(output.container.firstChild?.childNodes[1]?.textContent).toEqual("nonExistantFeature");
    });

    // reset process env
    process.env = { ...process.env, NODE_ENV: "test" };
  });

  it("Render nothing when feature does not exist", () => {
    const mockedProfile = createApolloMock(
      GetFeaturesDocument,
      {},
      {
        data: {
          features: {
            features: [{ name: "test", id: "1", description: "hello", enabled: false }],
          },
        },
      }
    );
    const output = render(
      <MockedProvider mocks={[mockedProfile]}>
        <Feature name="nonExistantFeature" fallback={<h1>This is a fallback</h1>}>
          <h1>Feature is available</h1>
        </Feature>
      </MockedProvider>
    );
    waitFor(() => {
      expect(output.container).toBeEmpty();
    });
  });
});
