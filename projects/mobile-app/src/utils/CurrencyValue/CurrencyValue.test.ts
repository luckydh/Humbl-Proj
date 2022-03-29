import CurrencyValue from "./CurrencyValue";

describe("CurrencyValue Class Tests", () => {
  it("Create Currency Value returns value", () => {
    const initialValue = new CurrencyValue("10.50");
    expect(initialValue.value).toBe("10.5");
  });
  it("Create Currency Value returns value", () => {
    const initialValue = new CurrencyValue("10.50000");
    expect(initialValue.value).toBe("10.5");
  });

  it("Create Currency Value and format", () => {
    const initialValue = new CurrencyValue("10.5");
    expect(initialValue.format(5)).toBe("10.5");
  });

  it("Create Currency Value with large decimals returns value", () => {
    const initialValue = new CurrencyValue("10.9999599995999959999599995");
    expect(initialValue.value).toBe("10.9999599995999959999599995");
  });
  it("Add Values with long decimals", () => {
    const initialValue = new CurrencyValue("10.9999599995999959999599995");
    const secondValue = new CurrencyValue("10.0000000000000000000000001");
    expect(initialValue.add(secondValue).format()).toBe("20.9999599995999959999599996");
  });
  it("Format decimals without passing param", () => {
    const initialValue = new CurrencyValue("10.500000000000001");
    const secondValue = new CurrencyValue("10.50");
    expect(initialValue.add(secondValue).format()).toBe("21.000000000000001");
  });
  it("Format decimals without passing param", () => {
    const initialValue = new CurrencyValue("10.50000000000000");
    const secondValue = new CurrencyValue("10.50000000000000");
    expect(initialValue.add(secondValue).format()).toBe("21");
  });
  it("Format decimals with 5 decimal param", () => {
    const initialValue = new CurrencyValue("10.50000000000000");
    const secondValue = new CurrencyValue("10.50000000000000");
    expect(initialValue.add(secondValue).format(5)).toBe("21");
  });

  it("AddS string values with long decimals", () => {
    const initialValue = new CurrencyValue("10.9999599995999959999599995");
    const secondValue = "10.0000000000000000000000001";
    expect(initialValue.addString(secondValue).format()).toBe("20.9999599995999959999599996");
  });

  it("Multiply values with long decimals", () => {
    const initialValue = new CurrencyValue("7.0000700007000070000700007");
    const secondVal = new CurrencyValue("3.0000300003000030000300003");
    expect(initialValue.multiply(secondVal).format()).toBe("21.00042000630008400105001260010500084000630004200021");
  });
  it("MultiplyS values with long decimals", () => {
    const initialValue = new CurrencyValue("7.0000700007000070000700007");
    const secondVal = "3.0000300003000030000300003";
    expect(initialValue.multiplyString(secondVal).format()).toBe(
      "21.00042000630008400105001260010500084000630004200021"
    );
  });

  it("Divide values with long decimals", () => {
    const initialValue = new CurrencyValue("14.9999599995999959999599995");
    const secondVal = new CurrencyValue("7");
    expect(initialValue.divide(secondVal).format()).toBe("2.14285142851428514285");
  });
  it("DivideS values with long decimals", () => {
    const initialValue = new CurrencyValue("14.9999599995999959999599995");
    const secondVal = "7";
    expect(initialValue.divideString(secondVal).format()).toBe("2.14285142851428514285");
  });

  it("Format CurrencyValue to a fixed number of decimals and ensure no rounding with long decimals", () => {
    const initialValue = new CurrencyValue("10.9999999999999999999999999999");
    const secondValue = new CurrencyValue("1");
    const added = initialValue.add(secondValue);
    expect(added.format()).toBe("11.9999999999999999999999999999");
  });
  it("Format CurrencyValue to a fixed number of decimals and ensure no rounding with small decimals", () => {
    const initialValue = new CurrencyValue("10.9999999999999999999999999999");
    const secondValue = new CurrencyValue("1");
    const added = initialValue.add(secondValue);
    expect(added.format(3)).toBe("11.999");
  });
  it("Format CurrencyValue to a fixed number of decimals and ensure no rounding with 1 decimal", () => {
    const initialValue = new CurrencyValue("10.9999999999999999999999999999");
    const secondValue = new CurrencyValue("1");
    expect(initialValue.add(secondValue).format(1)).toBe("11.9");
  });
  it("Format CurrencyValue to a fixed number of decimals and ensure no rounding with no decimals", () => {
    const initialValue = new CurrencyValue("10.9999999999999999999999999999");
    const secondValue = new CurrencyValue("1");
    expect(initialValue.add(secondValue).format(0)).toBe("11");
  });
});
