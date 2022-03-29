import { poBoxRegex } from "./regexPatterns";

const detectableScenarios = [
  "Po Box",
  "PO Box",
  "po box",
  "P0 box",
  "P0 B0X",
  "p0 b0x",
  "i have a po box",
  "P.O. box address",
  "P.O box address",
  "PO. B0x address",
];

const indetectableScenarios = [
  "1836  Melody Lane",
  "342  Parkview Drive",
  "2498  Montreal Road",
  "124  Clasper Way",
  "3661  Pride Avenue",
  "Street 2123",
  "Rua teste, 25",
  "2141  Stiles Street",
  "Dalamal Towers, 478956 Nariman Point, Singapore",
  "401 Macpherson Road #02-11 Hotel Windsor, 368125, Singapore",
];

detectableScenarios.forEach((testValue) => {
  it(`PO BOX should be detected for ${testValue}`, () => {
    const matchResult = testValue.match(poBoxRegex);
    expect(matchResult).not.toBeNull();
  });
});

indetectableScenarios.forEach((testValue) => {
  it(`PO BOX should not be detected for ${testValue}`, () => {
    const matchResult = testValue.match(poBoxRegex);
    expect(matchResult).toBeNull();
  });
});
