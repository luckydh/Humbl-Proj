import Big, { BigConstructor } from "big.js";
/**
 * CurrencyValue is immutable and not changed by its methods.
 */
class CurrencyValue {
  // Unformatted or modified string value
  public readonly value: string;
  private bigConstructor: BigConstructor;
  private bigValue: Big;

  constructor(newValue: string) {
    // we create our own Big constructor so we can pass our own rounnding method.
    // we could set it globally as a singleton but that could cause possible issues if
    // anyone implementes big.js at some point somewhere else.
    this.bigConstructor = Big();
    this.bigConstructor.RM = 0;

    const bigValue = this.bigConstructor(newValue);
    this.value = bigValue.toString();
    this.bigValue = bigValue;
  }

  // No setter is needed as this is immutable. Leaving this for comments.
  // private set _value(newValue: string) {
  //   const bigValue = this.bigConstructor(newValue);
  //   this.value = bigValue.toString();
  //   this.bigValue = bigValue;
  // }

  /**
   * Add takes a CurrencyValue and adds another CurrencyValue and returns a new CurrencyValue
   * ! Note: This does NOT modify the existing value.
   * @param addedValue Currency Value to add to the current value
   * @returns a new CurrencyValue
   */
  add(addedValue: CurrencyValue) {
    return new CurrencyValue(this.bigValue.add(addedValue.value).toString());
  }
  /**
   * AddString takes a CurrencyValue and adds another string and returns a new CurrencyValue
   * ! Note: This does NOT modify the existing value.
   * @param addedValue string representing the value to add to the current value
   * @returns a new CurrencyValue
   */
  addString(addedString: string) {
    const addedValue = new CurrencyValue(addedString);
    return new CurrencyValue(this.bigValue.add(addedValue.value).toString());
  }

  /**
   * Multiply takes a CurrencyValue and multiplies it by another Currency value, returns a new CurrencyValue object.
   * @param value Currency value to multiply by
   * @returns a new CurrencyValue
   */
  multiply(value: CurrencyValue) {
    return new CurrencyValue(this.bigValue.times(value.value).toString());
  }

  /**
   * MultiplyString takes a CurrencyValue and multiplies it by a string, returns a new CurrencyValue object.
   * @param value string representing the value to multiply by
   * @returns a new CurrencyValue
   */
  multiplyString(valueString: string) {
    const value = new CurrencyValue(valueString);
    return new CurrencyValue(this.bigValue.times(value.value).toString());
  }

  /**
   * Divide takes a CurrencyValue and divides it by another Currency value, returns a new CurrencyValue object.
   * @param value Currency value to divide by
   * @returns a new CurrencyValue
   */
  divide(value: CurrencyValue) {
    return new CurrencyValue(this.bigValue.div(value.value).toString());
  }

  /**
   * DivideString takes a CurrencyValue and divides it by a string vlaue, returns a new CurrencyValue object.
   * @param value Currency value to divide by
   * @returns a new CurrencyValue
   */
  divideString(valueString: string) {
    const value = new CurrencyValue(valueString);
    return new CurrencyValue(this.bigValue.div(value.value).toString());
  }

  /**
   * Format function formats value to a fixed number of decimals (or to full width). This function does not round will truncate values
   * @param length Optional: Fixed length for values to format to
   * @returns formatted string
   */
  format(length?: number) {
    /**
     * TODO: The use of this regex is VERY U.S. related. Other locales like Germany would show
     * a long number like this: 1.000.123,509. Other libs might be needed to keep the string and not
     * lose accuracy, but correctly replace formatting based on locale (such as globalize.js)
     */
    return this.bigValue.toFixed(length, 0).replace(/\.?0+$/, "");
  }
}

export default CurrencyValue;
