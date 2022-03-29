import React, { ChangeEvent, useState, useEffect, useLayoutEffect, createRef } from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { PaymentMethodType } from "generated/graphql";
import { CheckBoxCard } from "components/CheckBoxCard/CheckBoxCard";
import { CreditCardBack } from "assets/svgs/CreditCardBack";
import Button from "components/Button/Button";
import { formatExpDate } from "utils/formatExpDate";
import { formatMaskedValue } from "pages/PaymentMethods/common";

export interface CreditCardCheckboxProps {
  card: PaymentMethodType;
  selected?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  onSelect?: (card: PaymentMethodType) => void;
  onCvvChange?: (cvv: string) => void;
  onCvvError?: (hasError: boolean) => void;
  handleClickContinue: () => void;
}

const getCvvLength = (brand?: string) => (brand === "amex" ? 4 : 3);

export const getBrandConfig = (brand?: string) => ({
  cvvLength: getCvvLength(brand),
  cvvImage: <CreditCardBack />,
});

type CardBrandImageProps = {
  image?: string;
  text?: string;
  ariaLabel?: string;
};

const CardBrandImage: React.FC<CardBrandImageProps> = ({ image = "", text = "", ariaLabel }) => (
  <img className="w-8" src={image} alt={text} aria-label={ariaLabel} />
);

export const CreditCardCheckbox: React.FC<CreditCardCheckboxProps> = ({
  card,
  selected,
  onSelect,
  onCvvChange,
  onCvvError,
  disabled = false,
  ariaLabel,
  handleClickContinue,
}) => {
  const { t } = useTranslation();
  const { cvvLength, cvvImage } = getBrandConfig(card.cardBrand?.id);

  const [cvv, setCvv] = useState("");
  const [error, setError] = useState(false);

  const isCvvEmpty = cvv.length === 0;

  const validateCvv = (value: string) => value.length === cvvLength;

  useEffect(() => {
    if (!selected) {
      setError(false);
      setCvv("");
    }
  }, [selected]);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setCvv(value);
    onCvvChange?.(value);

    setError(false);
    onCvvError?.(false);
  };

  const inputRef = createRef<HTMLInputElement>();

  useLayoutEffect(() => {
    const input = inputRef.current;
    if (input && selected) {
      input.focus();
    }
  }, [selected, inputRef]);

  const handleOnContinue = () => {
    if (isCvvEmpty || error) {
      const isValid = validateCvv(cvv);
      setError(!isValid);
      onCvvError?.(!isValid);
    } else {
      handleClickContinue();
    }
  };

  return (
    <CheckBoxCard
      ariaLabel={ariaLabel}
      title={<span aria-label={ariaLabel && `${ariaLabel}_CARDNAME_LABEL`}>{card.cardBrand?.display}</span>}
      subtitle={
        <span aria-label={ariaLabel && `${ariaLabel}_CARDNUMBER_LABEL`}>{formatMaskedValue(card.lastFour)}</span>
      }
      onClick={() => onSelect?.(card)}
      selected={selected && !disabled}
      disabled={disabled}
      icon={
        <CardBrandImage
          image={card.cardBrand?.image}
          text={card.cardBrand?.display}
          ariaLabel={ariaLabel && `${ariaLabel}_CARD_LOGO`}
        />
      }
      middleColumnContent={
        <div className="text-sm text-blue-dark" aria-label={ariaLabel && `${ariaLabel}_CARDEXPIRATION_LABEL`}>
          {t("crypto-wallet.buy.payment-method.exp-date")}{" "}
          <span className="tabular-nums">{formatExpDate(card.expirationDate!)}</span>
        </div>
      }
      bottomLineContent={
        selected &&
        !disabled && (
          <>
            <div className="py-3 flex items-center justify-center">
              <div className="flex flex-col">
                <span className="text-blue-dark text-sm mb-2" aria-label={ariaLabel && `${ariaLabel}_CVV_LABEL`}>
                  {t("crypto-wallet.buy.payment-method.enter-cvv")}
                </span>
                <div className="flex items-center">
                  <input
                    type="tel"
                    inputMode="numeric"
                    ref={inputRef}
                    className={cx(
                      "w-20 bg-white border-2 rounded-sm p-2 text-lg text-blue-dark font-medium mr-2 placeholder-blue-dark placeholder-opacity-50 outline-none focus:outline-none focus:ring-0",
                      {
                        "border-[red] focus:border-[red]": error && selected,
                        "border-blue-dark focus:border-blue-dark": !error,
                      }
                    )}
                    value={cvv}
                    placeholder="CVV"
                    maxLength={cvvLength}
                    minLength={cvvLength}
                    onChange={handleChange}
                    aria-label={ariaLabel && `${ariaLabel}_CVV_FIELD`}
                  />
                  {cvvImage}
                </div>
              </div>
            </div>
            <Button
              className="my-2"
              onClick={handleOnContinue}
              ariaLabel={ariaLabel && `${ariaLabel}_CREDITCARDCONTINUE_BUTTON`}>
              {t("global.continue")}
            </Button>
          </>
        )
      }
    />
  );
};

export default CreditCardCheckbox;
