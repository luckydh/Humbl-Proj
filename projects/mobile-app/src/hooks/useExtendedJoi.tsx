import JoiDefault from "joi";
import JoiDateExtension from "@joi/date";

const Joi = JoiDefault.extend(JoiDateExtension);

export const useExtendedJoiInstance = () => Joi;

export const getExtendedJoiInstance = () => Joi;
