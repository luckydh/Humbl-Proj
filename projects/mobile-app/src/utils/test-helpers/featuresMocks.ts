import createApolloMock from "generated/createApolloMock";
import { GetFeaturesDocument } from "generated/graphql";

export const getFeaturesQueryMock = (name: string, enabled = false) =>
  createApolloMock(
    GetFeaturesDocument,
    {},
    {
      data: {
        features: {
          features: [{ name, id: "1", description: "hello", enabled }],
        },
      },
    }
  );
