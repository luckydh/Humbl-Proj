import React, { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { getCardBrand, BrandId } from "utils/cards/cardBrand";
import Button from "components/Button/Button";
import { useTranslation } from "react-i18next";
import { PaymentMethodType } from "generated/graphql";
import { SupportedCardProviders } from "components/SupportedCardProviders/SupportedCardProviders";
import { CVVInput, CardNumberInput, CardholderNameInput, ExpirationDateInput } from "./common";

export interface CreditCardFields {
  cvv: string;
  lastFour: string;
  cardBrand: string;
  cardNumber: string;
  cardholderName: string;
  expirationDate: string;
}

interface Props {
  initialData?: PaymentMethodType;
  onComplete: (data: CreditCardFields) => void;
}

export const CreditCardInfoStep: React.FC<Props> = ({ initialData, onComplete }) => {
  const { t } = useTranslation();
  const [requireNumberFields, setRequireNumberFields] = useState(!initialData);
  const [cardBrand, setCardBrand] = useState<BrandId | undefined>(initialData?.cardBrand?.id as BrandId);

  const handleFocusNumberField = () => {
    if (!requireNumberFields) {
      setCardBrand(undefined);
      setRequireNumberFields(true);
    }
  };

  const handleChangeCardNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const brand = getCardBrand(event.target.value);
    setCardBrand(brand);
  };

  const { register, errors, control, handleSubmit } = useForm<CreditCardFields>({
    shouldFocusError: false,
    defaultValues: {
      cvv: "",
      cardNumber: "",
      cardholderName: initialData?.name ?? "",
      expirationDate: initialData?.expirationDate ?? "",
    },
  });

  const submitForm = (values: CreditCardFields) => {
    onComplete({
      ...values,
      cardBrand: cardBrand ?? "",
      lastFour: values.cardNumber.slice(-4),
      cardNumber: values.cardNumber.replace(/\s/g, ""),
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col flex-grow">
      <div className="flex-grow">
        <div className="mb-6">
          <CardholderNameInput
            required
            register={register}
            errorMessage={errors.cardholderName?.message}
            ariaLabel="ADDCARD_NAMEONCARD"
          />
        </div>
        <div className="mb-6">
          <CardNumberInput
            control={control}
            cardBrand={cardBrand}
            onFocus={handleFocusNumberField}
            onChange={handleChangeCardNumber}
            required={requireNumberFields}
            errorMessage={errors.cardNumber?.message}
            initialLastFour={initialData?.lastFour}
            ariaLabel="ADDCARD_CARDNUMBER"
          />
        </div>
        <div className="flex mb-6">
          <div className="flex-1 mr-3">
            <ExpirationDateInput required errors={errors} control={control} ariaLabel="ADDCARD_EXPIRATIONDATE" />
          </div>
          <div className="flex-1">
            <CVVInput
              register={register}
              onFocus={handleFocusNumberField}
              required={requireNumberFields}
              errorMessage={errors.cvv?.message}
              maxLength={cardBrand === "amex" ? 4 : 3}
              ariaLabel="ADDCARD_CVV"
            />
          </div>
        </div>
      </div>
      <div>
        <SupportedCardProviders />
        <div className="mt-4">
          <Button type="submit" ariaLabel="ADDCARD_ADDCARD_BUTTON">
            {t("page-credit-card-info-step.button.add-card")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreditCardInfoStep;
