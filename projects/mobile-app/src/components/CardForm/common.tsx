import React, { ChangeEvent } from "react";
import NumberFormat from "react-number-format";
import { useTranslation } from "react-i18next";
import { UseFormMethods, Controller, FieldErrors } from "react-hook-form";
import { Countries } from "utils/Countries";
import { CardValidator } from "utils/cards/CardValidator";
import { BrandId, getCardBrandLogo } from "utils/cards/cardBrand";
import { Message } from "components/Message/Message";
import { MaskedDateInput } from "components/MaskedInput/MaskedDateInput";
import { Input, LabelContainer, wrapperBaseClasses, inputBaseClasses } from "components/Input/Input";

interface CommonProps {
  required: boolean;
  ariaLabel?: string;
  errorMessage?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

interface CardNumberInputProps extends CommonProps {
  cardBrand?: BrandId;
  placeholder?: string;
  control: UseFormMethods["control"];
  initialLastFour?: string;
}

export const CardNumberInput: React.FC<CardNumberInputProps> = ({
  control,
  ariaLabel,
  errorMessage,
  required,
  initialLastFour,
  onFocus,
  cardBrand,
  onChange,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <LabelContainer
        ariaLabel={ariaLabel && `${ariaLabel}_LABEL`}
        label={t("page-credit-card-info-step.label.card-number")}
      />
      <div className={wrapperBaseClasses}>
        <Controller
          name="cardNumber"
          control={control}
          rules={{
            required: {
              value: required,
              message: t("page-credit-card-info-step.error.required.card-number"),
            },
            validate: (value) => {
              if (value !== "") {
                return (
                  CardValidator.cardNumber(value) ||
                  (t("page-credit-card-info-step.error.invalid.card-number") as string)
                );
              }
            },
          }}
          render={(inputProps) => (
            <NumberFormat
              {...inputProps}
              format="#### #### #### ####"
              placeholder={required ? "0000 0000 0000 0000" : `**** **** **** ${initialLastFour}`}
              className={inputBaseClasses}
              onFocus={onFocus}
              pattern="[0-9, \/]*"
              inputMode="numeric"
              style={{ height: 48, fontSize: 20 }}
              aria-label={ariaLabel && `${ariaLabel}_FIELD`}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange?.(event);
                inputProps.onChange(event);
              }}
            />
          )}
        />
        <div className="mr-3">
          <img className="w-12" src={getCardBrandLogo(cardBrand)} alt="" />
        </div>
      </div>
      {errorMessage && (
        <div className="my-2">
          <Message variant="error" ariaLabel={ariaLabel && `${ariaLabel}ALERT_LABEL`}>
            {errorMessage}
          </Message>
        </div>
      )}
    </div>
  );
};

interface CVVInputProps extends CommonProps {
  register: UseFormMethods["register"];
  maxLength?: number;
}

export const CVVInput: React.FC<CVVInputProps> = ({
  register,
  required,
  onFocus,
  ariaLabel,
  errorMessage,
  maxLength = 3,
}) => {
  const { t } = useTranslation();
  return (
    <Input
      name="cvv"
      label={t("page-credit-card-info-step.label.cvv")}
      onFocus={onFocus}
      placeholder={required ? "123" : "***"}
      ariaLabel={ariaLabel}
      ariaLabelValue={ariaLabel}
      errorMessage={errorMessage}
      pattern="[0-9, \/]*"
      inputMode="numeric"
      maxLength={maxLength}
      register={register({
        required: {
          value: required,
          message: t("page-credit-card-info-step.error.required.cvv"),
        },
        validate: (value) => {
          if (value !== "") {
            return CardValidator.cvv(value, maxLength) || (t("page-credit-card-info-step.error.invalid.cvv") as string);
          }
        },
      })}
    />
  );
};

interface ExpirationDateInputProps extends CommonProps {
  errors: FieldErrors;
  control: UseFormMethods["control"];
}

export const ExpirationDateInput: React.FC<ExpirationDateInputProps> = ({ control, errors, ariaLabel }) => {
  const { t } = useTranslation();

  const expDateInputField = {
    ariaLabel,
    name: "expirationDate",
    country: [Countries.US],
    label: t("page-credit-card-info-step.label.expiration"),
  };

  return (
    <MaskedDateInput
      field={expDateInputField}
      control={control}
      errors={errors}
      placeholder="MM/YYYY"
      rules={{
        required: {
          value: true,
          message: t("page-credit-card-info-step.error.required.expiration"),
        },
        validate: (value) =>
          CardValidator.expirationDate(value) || (t("page-credit-card-info-step.error.invalid.expiration") as string),
      }}
    />
  );
};

interface CardholderNameInputProps extends CommonProps {
  register: UseFormMethods["register"];
}

export const CardholderNameInput: React.FC<CardholderNameInputProps> = ({
  register,
  required,
  ariaLabel,
  errorMessage,
}) => {
  const { t } = useTranslation();
  return (
    <Input
      name="cardholderName"
      label={t("page-credit-card-info-step.label.name-on-card")}
      placeholder={t("page-credit-card-info-step.label.name-on-card")}
      ariaLabel={ariaLabel}
      ariaLabelValue={ariaLabel}
      errorMessage={errorMessage}
      register={register({
        required: {
          value: required,
          message: t("page-credit-card-info-step.error.required.name-on-card"),
        },
        validate: (value) =>
          CardValidator.cardholderName(value) || (t("page-credit-card-info-step.error.invalid.name-on-card") as string),
      })}
    />
  );
};
