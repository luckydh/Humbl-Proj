import { MockedResponse } from "@apollo/client/testing";
import { MeDocument, MeQuery } from "../../../generated/graphql";

export const MyProfileLoadingStateMock: MockedResponse<MeQuery> = {
  request: { query: MeDocument },
  result: undefined,
};
