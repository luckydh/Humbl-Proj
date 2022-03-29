import { MeDocument } from "../../../generated/graphql";

export const ConsumerProfileStateMock = {
  request: { query: MeDocument },
  result: {
    data: {
      me: {
        userName: "consumer-username",
        hasMultipleAccounts: false,
        hasMerchantAccount: false,
        isMerchant: false,
        displayName: "Consumer Example",
        image: "https://via.placeholder.com/150?text=Placeholder+image",
        id: "2b4db081-8a79-4b7d-9e6c-0230b0e15884",
        city: null,
        isPrivate: false,
        phone: "+111111111111",
        country: {
          name: "United States of America",
          alpha2: "us",
          __typename: "CountryType",
        },
        qr: {
          image:
            "data:image/png;base64,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",
          code: "",
          __typename: "QRType",
        },
        merchantProfileDetails: {
          acceptsPayments: false,
          id: "df534e72-7f0b-4745-9372-89d2e311d42e",
          merchantType: "SHOPPING",
          displayName: "jbrandao2807-6-merchant",
          address: {
            street: null,
            streetAdditional: null,
            city: null,
            region: null,
            postal: null,
            __typename: "AddressType",
          },
          status: "NOT_VERIFIED",
          currency: "USD",
          countryCode: "us",
          __typename: "MerchantProfileType",
        },
        __typename: "AccountType",
      },
    },
  },
};
