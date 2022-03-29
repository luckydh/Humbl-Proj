import { useForceUpdate, versionGreaterThan, currAppVersion } from "./update";

let mockedMinAppVersion = currAppVersion;
jest.mock("@apollo/client", () => ({
  makeVar: () => ({}),
  useReactiveVar: () => mockedMinAppVersion,
}));

let currentWithMinorBump = "";
let currentWithMajorBump = "";

function increaseStringIntValue(val: string, increaseBy: number) {
  const int = parseInt(val, 10);
  return `${int + increaseBy}`;
}
currAppVersion.split(".").forEach((val, idx) => {
  if (idx === 0) {
    currentWithMinorBump = val;
    currentWithMajorBump = increaseStringIntValue(val, 1);
  } else {
    currentWithMinorBump += `.${increaseStringIntValue(val, 1)}`;
    currentWithMajorBump += `.${val}`;
  }
});

describe("versionGreaterThan", () => {
  it("properly deals with semver", () => {
    expect(versionGreaterThan("0", "0")).toBe(false);
    expect(versionGreaterThan("100", "1")).toBe(true);
    expect(versionGreaterThan("0.100", "1")).toBe(false);
    expect(versionGreaterThan("1.100", "1.1")).toBe(true);
    expect(versionGreaterThan("1.1", "1.100")).toBe(false);
    expect(versionGreaterThan("2.1", "1.9")).toBe(true);
    expect(versionGreaterThan("2.12", "1.9")).toBe(true);
    expect(versionGreaterThan("1.12", "2.9")).toBe(false);
    expect(versionGreaterThan("2.1", "2.2")).toBe(false);
    expect(versionGreaterThan("2.12", "2.2")).toBe(true);

    // matching app version should fail
    expect(versionGreaterThan(currAppVersion, currAppVersion)).toBe(false);
    // major bump should succeed
    expect(versionGreaterThan(currentWithMajorBump, currAppVersion)).toBe(true);
    // minor bump should succeed
    expect(versionGreaterThan(currentWithMinorBump, currAppVersion)).toBe(true);
  });
});

describe("useForceUpdate", () => {
  it(`declares false when values match ${currAppVersion} => ${mockedMinAppVersion}`, () => {
    expect(useForceUpdate()).toBe(false);
  });

  it("declares false when no minAppVersion set", () => {
    mockedMinAppVersion = "";
    expect(useForceUpdate()).toBe(false);
  });

  it(`declares true when minAppVersion is major bump ${currAppVersion} => ${currentWithMajorBump}`, () => {
    mockedMinAppVersion = currentWithMajorBump;
    expect(useForceUpdate()).toBe(true);
  });

  it(`declares true when minAppVersion is minor bump ${currAppVersion} => ${currentWithMinorBump}`, () => {
    mockedMinAppVersion = currentWithMinorBump;
    expect(useForceUpdate()).toBe(true);
  });
});
