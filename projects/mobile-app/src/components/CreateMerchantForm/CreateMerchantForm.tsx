import React, { useEffect } from "react";
import { Controller, UseFormMethods } from "react-hook-form";
import Input, { LabelContainer } from "../Input/Input";
import { Message } from "../Message/Message";
import { AddressInput } from "generated/graphql";
import { useTranslation } from "react-i18next";
import currencyOptions from "utils/currencyOptions";
import { PhoneInput } from "components/PhoneInput/PhoneInput";
import UsernameInput from "components/UsernameInput/UsernameInput";
import { CountrySelect } from "components/CountrySelect/CountrySelect";
import { Checkbox } from "components/Checkbox/Checkbox";
import { MerchantTypeSelect } from "components/CountrySelect/MerchantTypeSelect";
import _ from "lodash";
import { Select } from "components/Select/Select";
import getStateOptions from "utils/stateOptions";
import { GetCountryByString } from "pages/MerchantOnboarding/CountriesMapping";

export interface IMerchantFormInputs {
  displayName: string;
  currency: string | undefined;
  phoneNumber: string;
  merchantType: string;
  userName: string;
  hasAddress?: boolean;
  location: AddressInput;
}

type FormMode = "create" | "edit";

export type MerchantFormProps = {
  form: UseFormMethods<IMerchantFormInputs>;
  mode?: FormMode;
  onValidateUserName?: (isValid: boolean) => void;
};

export const MerchantForm: React.FC<MerchantFormProps> = ({ form, mode = "create", onValidateUserName }) => {
  const { t } = useTranslation();

  const { register, control, formState, errors, trigger, getValues, setValue, watch } = form;

  watch("location.country");
  const hasAddress = getValues("hasAddress");
  const selectedCountry = (getValues("location.country") as string) || "";
  const stateOptions = getStateOptions(GetCountryByString(selectedCountry));
  useEffect(() => {
    if (hasAddress) {
      setValue("location", { region: "" });
    }
  }, [selectedCountry, hasAddress, setValue]);

  // we need this trigger in order to force a field update, otherwise
  // it would cause a weird bug of having the property set as undefined,
  // thus causing the screen not to render properly on first mount.
  useEffect(() => {
    trigger("hasAddress");
  }, [trigger]);

  return (
    <>
      <div className="mb-4">
        <Input
          label={t("merchant-create-page.label.merchant-name")}
          placeholder={t("merchant-create-page.place-holder.merchant-name")}
          name="displayName"
          type="text"
          register={register}
          errorMessage={errors.displayName?.message}
        />
      </div>
      <div className="mb-4">
        <MerchantTypeSelect label={t("profile-edit-page.input.type.label")} name="merchantType" register={register} />
        {errors.merchantType?.message && (
          <div className="mb-2">
            <Message variant="error">{errors.merchantType?.message}</Message>
          </div>
        )}
      </div>
      <div className="mb-4">
        <Controller
          control={control}
          name="phoneNumber"
          render={({ onChange, onBlur, value, name }) => (
            <PhoneInput
              label={t("merchant-create-page.label.phone-number")}
              onBlur={onBlur}
              onChange={onChange}
              defaultCountry="US"
              onCountryChange={() => {}}
              value={value}
              name={name}
              placeholder={t("merchant-create-page.placeholder.phone-number")}
            />
          )}
        />
        {formState.isSubmitted && errors.phoneNumber?.message && (
          <div className="mb-2">
            <Message variant="error">{errors.phoneNumber.message}</Message>
          </div>
        )}
      </div>
      <div className="mb-6">
        <LabelContainer label={t("merchant-create-page.label.currency")} />

        <select
          name="currency"
          ref={register}
          style={{ height: 52, fontSize: 20 }}
          className="
              py-2 px-4 w-full rounded-lg bg-blue border-white border-2 outline-none text-white placeholder-white-faded
               text-xl block focus:ring-indigo-500 focus:border-white focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder-transparent">
          <option value="" key="">
            {t("merchant-create-page.message.select-currency")}
          </option>
          {_.sortBy(currencyOptions, ["code"]).map((option) => (
            <option key={option.code} value={option.code}>
              {option.code} - {option.name}
            </option>
          ))}
        </select>
        {(errors.currency as any)?.message && (
          <div className="mt-2">
            <Message variant="error">{(errors.currency as any)?.message}</Message>
          </div>
        )}
      </div>
      <div className="mb-4">
        <CountrySelect label={t("profile-edit-page.input.country.label")} name="location.country" register={register} />
        {errors.location?.country?.message && (
          <div className="mb-2">
            <Message variant="error">{errors.location?.country?.message}</Message>
          </div>
        )}
      </div>
      {mode === "create" && (
        <UsernameInput trigger={trigger} register={register} errors={errors} onValidate={onValidateUserName} />
      )}
      <div className="mt-2 mb-6 flex items-center justify-between">
        <label htmlFor="business-address" className="text-white text-lg">
          {t("merchant-create-page.text.business-address")}
        </label>
        <Checkbox id="business-address" name="hasAddress" control={control} size="large" />
      </div>
      {hasAddress && (
        <div className="address">
          <div className="mb-6">
            <Input
              label={t("merchant-create-page.label.address")}
              name="location.street"
              placeholder={t("merchant-create-page.placeholder.address-line-1")}
              className={errors.location?.street?.message ? "" : "mb-4"}
              register={register}
              errorMessage={errors.location?.street?.message}
            />
            <Input
              name="location.additional"
              placeholder={t("merchant-create-page.placeholder.address-line-2")}
              register={register}
              errorMessage={errors.location?.additional?.message}
            />
          </div>
          <div className="mb-6">
            <Input
              label={t("merchant-create-page.label.city")}
              name="location.city"
              placeholder={t("merchant-create-page.placeholder.city")}
              register={register}
              errorMessage={errors.location?.city?.message}
            />
          </div>
          {stateOptions.length > 0 && (
            <div className="flex flex-col mb-4">
              <label htmlFor="state-region" className="flex opacity-80 ml-2 mb-1 uppercase text-xs">
                {t("merchant-create-page.label.state-region")}
              </label>
              <div className="flex flex-col">
                <Select
                  id="state-region"
                  options={stateOptions}
                  name="location.region"
                  register={register}
                  placeholder={t("merchant-create-page.label.state-region")}
                />
                {errors.location?.region?.message && (
                  <div className="my-2">
                    <Message variant="error">{errors.location?.region?.message}</Message>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex">
            <div className="flex-1 mb-6">
              <Input
                label={t("merchant-create-page.label.postal-code")}
                name="location.postal"
                register={register}
                placeholder={t("merchant-create-page.placeholder.postal-code")}
                errorMessage={errors.location?.postal?.message}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
