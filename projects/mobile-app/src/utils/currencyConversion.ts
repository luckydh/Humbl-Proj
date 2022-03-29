export const FIAT_MAX_SCALE = 2;
export const CRYPTO_MAX_SCALE = 8;

/**
 * Converts a Fiat amount to Crypto.
 *
 * @param value The value in Fiat to be converted.
 * @param assetPrice The asset price.
 *
 * @returns {number} The converted value in Crypto.
 */
export const cryptoToFiat = (value: string, assetPrice: number): number => parseFloat(value) * assetPrice;

/**
 * Converts a Crypto amount to Fiat.
 *
 * @param value The value in Crypto to be converted.
 * @param assetPrice The asset price.
 *
 * @returns {number} The converted value in Fiat.
 */
export const fiatToCrypto = (value: string, assetPrice: number): number => parseFloat(value) / assetPrice;
