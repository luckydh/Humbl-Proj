import { getMissingFields } from "./missingFields";

describe("getMissingFields", () => {
  it("should return a list of fields that match the names in the list exactly", () => {
    const allFields = [{ name: "firstName" }, { name: "email" }, { name: "lastName" }];
    const missingFields = [{ fieldName: "email" }, { fieldName: "firstName" }];

    const result = getMissingFields(allFields as any, missingFields);
    expect(result).toEqual([{ name: "firstName" }, { name: "email" }]);
  });

  it("should return a list of fields that match the names in the list partially", () => {
    const allFields = [
      { name: "person_12345_firstName" },
      { name: "person_12345_lastName" },
      { name: "person_12345_email" },
      { name: "person_12345_govId" },
    ];

    const missingFields = [{ fieldName: "govId" }, { fieldName: "email" }];

    const result = getMissingFields(allFields as any, missingFields);
    expect(result).toEqual([
      { name: "person_12345_email" },
      { name: "person_12345_govId" },
    ]);
  });

  it("should return a list of fields that match the names in the list based on the dictionary", () => {
    const allFields = [
      { name: "addressLine1" },
      { name: "addressLine2" },
      { name: "addressPostalCode" },
    ];

    const missingFields = [{ fieldName: "street" }, { fieldName: "streetAdditional" }];

    const result = getMissingFields(allFields as any, missingFields);
    expect(result).toEqual([{ name: "addressLine1" }, { name: "addressLine2" }]);
  });

  it("should return a list of fields that match the names in the list based on the dictionary partially", () => {
    const allFields = [
      { name: "person_12345_addressLine1" },
      { name: "person_12345_addressLine2" },
      { name: "person_12345_addressPostalCode" },
    ];

    const missingFields = [{ fieldName: "street" }, { fieldName: "streetAdditional" }];

    const result = getMissingFields(allFields as any, missingFields);
    expect(result).toEqual([
      { name: "person_12345_addressLine1" },
      { name: "person_12345_addressLine2" },
    ]);
  });

  it("should return a list of fields where the properties match the names in the list", () => {
    const allFields = [
      { name: "firstName" },
      { name: "lastName" },
      { name: "email" },
      { name: "businessName" },
      { name: "businessTaxId" },
      { name: "addressLine1" },
      { name: "addressLine2" },
      { name: "addressPostalCode" },
    ];

    const missingFields = [
      { fieldName: "address", properties: ["street", "postal"] },
      { fieldName: "id_number", properties: ["legalName", "taxId"] },
    ];

    const result = getMissingFields(allFields as any, missingFields);
    expect(result).toEqual([
      { name: "businessName" },
      { name: "businessTaxId" },
      { name: "addressLine1" },
      { name: "addressPostalCode" },
    ]);
  });
});
