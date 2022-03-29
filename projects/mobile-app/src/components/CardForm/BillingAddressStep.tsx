import React from "react";
import { useForm } from "react-hook-form";
import cx from "classnames";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { Message } from "../Message/Message";
import { useTranslation } from "react-i18next";
import { CountrySelect } from "components/CountrySelect/CountrySelect";
import { GetRegexByPostalCode } from "utils/PostalCode";
import { Select } from "components/Select/Select";
import getStateOptions from "utils/stateOptions";
import { GetCountryByString } from "utils/CountriesMapping";

export type BillingAddressInfo = {
  country: string;
  city: string;
  state: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
};

interface Props {
  initialData?: BillingAddressInfo;
  onComplete: (data: BillingAddressInfo) => Promise<void>;
  submitButton?: JSX.Element;
  variant?: "fill" | "normal";
  ariaLabel?: string;
}

const BillingAddressStep: React.FC<Props> = ({ initialData, onComplete, submitButton, variant, ariaLabel }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, errors, watch, getValues } = useForm<BillingAddressInfo>({
    mode: "onBlur",
    defaultValues: initialData,
  });

  watch("country");
  watch("state");
  const selectedCountry = (getValues("country") as string) || "";
  const stateOptions = getStateOptions(GetCountryByString(selectedCountry));
  const currentCountryHasNoStates = stateOptions.length === 0;

  const submitHandler = () => {
    const values = getValues();
    // currently the form does not return any key for state if there are no states.
    // the backend requires at least an empty string.
    if (currentCountryHasNoStates) {
      values.state = "";
    }
    onComplete(values);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={cx("flex flex-col justify-center h-full", { "w-full": variant === "fill" })}>
      <div className="mb-4">
        <CountrySelect
          label={t("page-billing-address-step.label.country")}
          name="country"
          register={register({
            required: { message: t("add-card-billing-address-country-required"), value: true },
          })}
          ariaLabel={ariaLabel}
        />
        {errors.country?.message && (
          <div className="mt-2">
            <Message
              variant="error"
              ariaLabel={ariaLabel ? `${ariaLabel}_COUNTRY_SELECT_ERROR` : "COUNTRY_SELECT_ERROR"}>
              {errors.country?.message}
            </Message>
          </div>
        )}
      </div>
      <div className="mb-4">
        <Input
          label={t("page-billing-address-step.label.billing-address")}
          name="addressLine1"
          placeholder="Address Line 1"
          className={errors.addressLine1?.message ? "" : "mb-4"}
          register={register({ required: `${t("billing-address-step.address1-error")}` })}
          ariaLabel={ariaLabel ? `${ariaLabel}_ADDRESS_LINE1"` : "ADDRESS_LINE1"}
        />
        {errors.addressLine1?.message && (
          <div className="my-2">
            <Message variant="error" ariaLabel={ariaLabel ? `${ariaLabel}_ADDRESS_LINE1_ERROR` : "ADDRESS_LINE1_ERROR"}>
              {errors.addressLine1?.message}
            </Message>
          </div>
        )}
        <Input
          name="addressLine2"
          placeholder={t("page-billing-address-step.placeholder.address-line-2")}
          register={register}
          ariaLabel={ariaLabel ? `${ariaLabel}_ADDRESS_LINE2` : "ADDRESS_LINE2"}
        />
      </div>
      <div className="mb-4">
        <Input
          label={t("page-billing-address-step.label.city")}
          name="city"
          placeholder={t("page-billing-address-step.label.city")}
          register={register({ required: `${t("billing-address-step.city-error")}` })}
          ariaLabel={ariaLabel ? `${ariaLabel}_CITY_INPUT` : "CITY_INPUT"}
        />
        {errors.city?.message && (
          <div className="mt-2">
            <Message variant="error" ariaLabel={ariaLabel ? `${ariaLabel}_CITY_INPUT_ERROR` : "CITY_INPUT_ERROR"}>
              {errors.city?.message}
            </Message>
          </div>
        )}

        {!currentCountryHasNoStates && (
          <div className="flex-1 mt-4">
            <label className="flex opacity-80 ml-2 mb-1 uppercase text-xs" htmlFor="state">
              {t("page-billing-address-step.label.state-region")}
            </label>
            <div className="flex flex-col">
              <Select
                options={stateOptions}
                name="state"
                register={register({ required: `${t("billing-address-step.state-select-error")}` })}
                placeholder={t("page-billing-address-step.label.state-region")}
              />
              {errors.state?.message && (
                <div className="mt-2">
                  <Message variant="error">{errors?.state?.message}</Message>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mb-8">
        <div>
          <Input
            label={t("page-billing-address-step.label.postal-code")}
            name="postalCode"
            register={
              register({
                required: {
                  value: true,
                  message: t("page-billing-address-step.error.postal-code.required"),
                },
                pattern: {
                  value: watch("country") && GetRegexByPostalCode(watch("country")).Regex,
                  message: t("page-billing-address-step.error.postal-code.invalid"),
                },
              } as any) as any
            }
            placeholder={t("page-billing-address-step.label.postal-code")}
            ariaLabel={ariaLabel ? `${ariaLabel}_POST_CODE` : "POST_CODE"}
          />
          {errors.postalCode?.message && (
            <div className="mt-2">
              <Message variant="error" ariaLabel={ariaLabel ? `${ariaLabel}_POST_CODE_ERROR` : "POST_CODE_ERROR"}>
                {errors.postalCode?.message}
              </Message>
            </div>
          )}
        </div>
        <div className="flex-1" />
      </div>
      <div className="flex justify-center mt-auto">
        {submitButton || (
          <Button type="submit">
            {!initialData
              ? t("page-credit-card-info-step.button.save-changes")
              : t("page-billing-address-step.button.add-billing-address")}
          </Button>
        )}
      </div>
    </form>
  );
};

export default BillingAddressStep;
