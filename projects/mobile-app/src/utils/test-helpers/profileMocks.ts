import createApolloMock from "generated/createApolloMock";
import { AccountType, GetAccountByIdDocument } from "generated/graphql";

export const mockProfile = (data: Partial<AccountType>) => createApolloMock(
    GetAccountByIdDocument,
    { id: "undefined" },
    {
      data: {
        accountById: {
          ...data,
        },
      },
    },
    { addTypename: false }
  );
