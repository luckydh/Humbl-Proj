import Joi from "joi";
import emojiRegex from "emoji-regex/RGI_Emoji";

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// recreate RegExp to remove all flags
// which are not allowed by Joi.pattern()
const allEmojisRegex = new RegExp(emojiRegex(), "");

export const StringWithoutEmojiSchema = Joi.string()
  // use the type "string.pattern.invert.base"
  // to override the default message
  .pattern(allEmojisRegex, { invert: true });

export const lowerCaseRegEx = new RegExp("[a-z]+");
export const upperCaseRegEx = new RegExp("[A-Z]+");
export const numberRegEx = new RegExp("[0-9]+");
export const specialRegEx = new RegExp(/(!|@|#|\$|%|\^|&|\*|\(|\)|\/|\?|\+|=|'|~|\.)+/);
export const postalCodeRegEx = /^[\w\- ]+$/;

// basically the same as "specialRegEx" but allows dot, since
// wallet addresses can be something like "address.eth"
export const walletAddressRegEx = new RegExp(/(!|@|#|\$|%|\^|&|\*|\(|\)|\/|\?|\+|=|'|~)+/);
