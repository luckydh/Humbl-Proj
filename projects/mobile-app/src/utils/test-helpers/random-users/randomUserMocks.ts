import { getRandomTestUser, useRandomTestUser } from "./useRandomTestUser";
import createApolloMock from "../../../generated/createApolloMock";
import {
  GetAccountByIdDocument,
  MeDocument,
  MyAccountsDocument,
  MyUserProfileDocument,
} from "../../../generated/graphql";

export const useGetAccountByIdQueryMock = (userArrayPosition?: number, options?: Record<string, any>) => {
  const { user } = useRandomTestUser(userArrayPosition);

  return createApolloMock(
    GetAccountByIdDocument,
    { id: `${userArrayPosition}` },
    {
      data: {
        accountById: {
          userName: user.login.username,
          hasMultipleAccounts: false,
          hasMerchantAccount: false,
          isMerchant: false,
          displayName: user.login.username,
          image: user.picture.large,
          id: user.login.uuid,
          city: user.location.city,
          isPrivate: false,
          phone: user.phone,
          country: {
            name: user.location.country,
            alpha2: user.nat.toLowerCase(),
          },
          ...options,
        },
      },
    },
    { addTypename: false }
  );
};

export const useMyUserProfileQueryMock = (userArrayPosition?: number) => {
  const { user } = useRandomTestUser(userArrayPosition);
  return createApolloMock(
    MyUserProfileDocument,
    {},
    {
      data: {
        myUserProfile: {
          firstName: user.name.first,
          lastName: user.name.last,
          fullName: `${user.name.first} ${user.name.last}`,
          createdOn: new Date(),
        },
      },
    },
    { addTypename: false }
  );
};

export const useMeQueryMock = (userArrayPosition?: number) => {
  const { user } = useRandomTestUser(userArrayPosition);
  return createApolloMock(
    MeDocument,
    {},
    {
      data: {
        me: {
          userName: user.login.username,
          hasMultipleAccounts: false,
          hasMerchantAccount: false,
          isMerchant: false,
          displayName: user.login.username,
          image: user.picture.large,
          id: user.login.uuid,
          city: user.location.city,
          isPrivate: false,
          phone: user.phone,
          country: {
            name: user.location.country,
            alpha2: user.nat.toLowerCase(),
          },
        },
      },
    },
    { addTypename: false }
  );
};

export const useMyAccountQueryMock = (userPositions: Array<number>) => {
  const accounts = userPositions
    .map((position) => getRandomTestUser(position))
    .map(({ user }) => ({
      image: user.picture.large,
      displayName: user.login.username,
      userName: user.login.username,
      id: user.login.uuid,
    }));
  return createApolloMock(
    MyAccountsDocument,
    {},
    {
      data: {
        accounts,
      },
    },
    { addTypename: false }
  );
};
