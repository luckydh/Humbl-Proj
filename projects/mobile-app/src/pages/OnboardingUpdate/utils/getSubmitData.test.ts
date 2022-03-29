import { getSubmitData } from "./getSubmitData";
import { PersonRelationshipStatus, MissingStripeRequirementsType } from "generated/graphql";
import { Countries } from "utils/Countries";

describe("getSubmitData", () => {
  it("should parse the form values and make the submit data structure for individual business", () => {
    const stripeData: MissingStripeRequirementsType = {
      business: {
        id: "acct_12345",
        type: "individual",
        missingFields: [
          { fieldName: "id_number", properties: ["firstName", "lastName", "govId"] },
          { fieldName: "dob", properties: ["day", "month", "year"] },
          { fieldName: "address", properties: ["street", "postal"] },
        ],
      },
      persons: [],
    };

    const formData = {
      firstName: "Test",
      lastName: "Individual",
      govId: "000000000",
      dob: "20/12/2001",
      addressLine1: "Line 1",
      addressPostalCode: "123321",
    };

    const result = getSubmitData({ stripeData, formData, selectedCountry: Countries.NZ });

    expect(result).toEqual({
      business: {
        id: "acct_12345",
        type: "INDIVIDUAL",
        govId: "000000000",
        fields: [
          { fieldName: "firstName", value: "Test" },
          { fieldName: "lastName", value: "Individual" },
          { fieldName: "day", value: "20" },
          { fieldName: "month", value: "12" },
          { fieldName: "year", value: "2001" },
          { fieldName: "street", value: "Line 1" },
          { fieldName: "postal", value: "123321" },
        ],
      },
      persons: [],
    });
  });

  it("should parse the form values and make the submit data structure for company business", () => {
    const stripeData: MissingStripeRequirementsType = {
      business: {
        id: "acct_12345",
        type: "company",
        missingFields: [{ fieldName: "id_number", properties: ["legalName", "taxId"] }],
      },
      persons: [
        {
          id: "person_12345",
          relationships: [PersonRelationshipStatus.Owner],
          missingFields: [
            { fieldName: "email" },
            { fieldName: "govId" },
            { fieldName: "dob", properties: ["day", "month", "year"] },
          ],
        },
        {
          id: "person_67890",
          relationships: [PersonRelationshipStatus.Representative],
          missingFields: [{ fieldName: "address", properties: ["street", "postal"] }, { fieldName: "govId" }],
        },
      ],
    };

    const formData = {
      businessName: "Test Business",
      businessTaxId: "12345678912",
      person_person_12345_dob: "12/20/2001",
      person_person_12345_email: "test@test.com",
      person_person_12345_govId: "000000000",
      person_person_67890_govId: "111111111",
      person_person_67890_addressLine1: "Line 1",
      person_person_67890_addressPostalCode: "123321",
      accountNumber: "000123456789",
      routingNumber: "110000000",
    };

    const result = getSubmitData({
      stripeData,
      formData,
      requireBanking: true,
      selectedCountry: Countries.US,
    });

    expect(result).toEqual({
      banking: {
        accountNumber: "000123456789",
        routingNumber: "110000000",
      },
      business: {
        id: "acct_12345",
        type: "COMPANY",
        fields: [
          { fieldName: "legalName", value: "Test Business" },
          { fieldName: "taxId", value: "12345678912" },
        ],
      },
      persons: [
        {
          id: "person_12345",
          govId: "000000000",
          relationships: [PersonRelationshipStatus.Owner],
          fields: [
            { fieldName: "email", value: "test@test.com" },
            { fieldName: "day", value: "20" },
            { fieldName: "month", value: "12" },
            { fieldName: "year", value: "2001" },
          ],
        },
        {
          id: "person_67890",
          govId: "111111111",
          relationships: [PersonRelationshipStatus.Representative],
          fields: [
            { fieldName: "street", value: "Line 1" },
            { fieldName: "postal", value: "123321" },
          ],
        },
      ],
    });
  });
});
