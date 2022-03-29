import React, { useCallback, useState } from "react";
import { RecipientQRScanIcon, SendRecipientIcon } from "assets/icons";
import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";
import { scanCode } from "scanner";
import { useTranslation } from "react-i18next";
import { useStartTransferQuoteMutation } from "generated/graphql";
import { Message } from "components/Message/Message";
import { presentToast } from "utils/toast";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { specialRegEx, StringWithoutEmojiSchema } from "utils/validations";
import Joi from "joi";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { captureException } from "ErrorLogger";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { CloseIcon } from "assets/svgs/CloseIcon";
import { useFlowActions } from "pages/CryptoWallet/Flow";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sendFlowCurrentState } from "../sendFlowUtils";

type SendToRecipientForm = {
  externalAddress: string;
  note: string;
};

const SendToRecipient: React.FC = () => {
  const { t } = useTranslation();
  const { exit, forward, back } = useFlowActions();
  const { payload, code } = useRecoilValue(sendFlowCurrentState);
  const setCurrentState = useSetRecoilState(sendFlowCurrentState);

  const schema = Joi.object<SendToRecipientForm>({
    externalAddress: StringWithoutEmojiSchema.required()
      // If Wyre starts supporting ENS wallet addresses we
      // can use 'walletAddressRegEx' here instead of 'specialRegEx'.
      .pattern(specialRegEx, { invert: true })
      .messages({
        "any.required": t("crypto-wallet.send.send-to-recipient.address-required"),
        "string.empty": t("crypto-wallet.send.send-to-recipient.address-required"),
        "string.pattern.invert.base": t("crypto-wallet.send.send-to-recipient.error.emoji-special-character", {
          crypto: code,
        }),
      }),
    note: StringWithoutEmojiSchema.allow("").messages({
      "string.pattern.invert.base": t("crypto-wallet.send.send-to-recipient.note.error.emoji-character"),
    }),
  });

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, errors, setValue } = useForm<SendToRecipientForm>({
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
    mode: "onSubmit",
    shouldUnregister: false,
  });

  const [startTransferQuoteMutation] = useStartTransferQuoteMutation({
    onCompleted: (data) => {
      if (data?.startExternalTransferQuote?.quoteId) {
        const quoteId = data?.startExternalTransferQuote?.quoteId;
        trackEvent(EVENTS.SEND_CRYPTO, {
          screenName: "Send to Recipient",
          assetName: code,
          assetAmount: payload?.cryptoAmount,
        });

        trackEvent(EVENTS.BUTTON_CLICK, {
          action: "Send",
          type: "Send",
          status: "success",
          screenName: "Order Preview",
          cryptoCode: code,
          quoteId,
        });
        setCurrentState((state) => ({
          ...state,
          quoteId,
        }));
        forward();
      }
      reset(
        {
          externalAddress: "",
          note: "",
        },
        {}
      );
    },
    onError: (error) => {
      trackEvent(EVENTS.SEND_CRYPTO, {
        screenName: "Send to Recipient",
        assetName: code,
        assetAmount: payload?.cryptoAmount,
        status: "Fail",
      });

      trackEvent(EVENTS.BUTTON_CLICK, {
        action: "Send",
        type: "Send",
        status: error?.message,
        screenName: "Send to Recipient",
        cryptoCode: code,
      });
      presentToast(error.message, 2000, "danger");
      captureException(error);
    },
  });

  const onFormSubmit = async ({ externalAddress, note }: SendToRecipientForm) => {
    setLoading(true);
    try {
      if (payload?.cryptoAmount) {
        await startTransferQuoteMutation({
          variables: {
            sourceCurrencyCode: code,
            destinationCurrencyCode: code,
            sourceAmount: payload.cryptoAmount,
            externalAddress,
            notes: note,
          },
        });
      } else {
        back();
        presentToast(t("global.generic.error"), 2000, "danger");
      }
    } catch (error) {
      presentToast(error.message, 2000, "danger");
      captureException(error);
    }
    setLoading(false);
  };

  const openScanner = useCallback(async () => {
    const data = await scanCode("Scan QR Code");
    if (data !== null) {
      setValue("externalAddress", data);
    }
  }, [setValue]);

  const onRightClick = () => {
    exit();
  };

  return (
    <LayoutModal
      ariaLabel="SEND"
      title={t("crypto-wallet.send.send-to-recipient.title")}
      onClickBack={back}
      onRightClick={onRightClick}
      rightClickIcon={
        <div className="m-2 mt-3">
          <CloseIcon />
        </div>
      }
    >
      <div className="flex flex-grow flex-col">
        <OverlayLoading isOpen={loading} />
        <img
          aria-label="SEND_SEND_ICON"
          src={SendRecipientIcon}
          alt="SendRecipient"
          className="self-center"
          style={{
            height: 100,
            width: 100,
          }}
        />
        <div className="flex-1">
          <p aria-label="SEND_SENDTITLE_LABEL" className="text-xl text-center font-bold leading-7 mt-4">
            {t("crypto-wallet.send.send-to-recipient.who-are-you")}
          </p>
          <p aria-label="SEND_SENDBODY_LABEL" className="text-base text-center font-normal leading-5 mt-2.5">
            {t("crypto-wallet.send.send-to-recipient.paste-address")}
          </p>
          <Input
            className="mt-8"
            ariaLabel="SEND_CRYPTOADDRESS"
            placeholder={t("crypto-wallet.send.send-to-recipient.crypto-address", {
              crypto: code,
            })}
            name="externalAddress"
            register={register}
            append={
              <button aria-label="SEND_QRCODE_BUTTON" onClick={openScanner} type="button">
                <img alt="recipient qr scan" src={RecipientQRScanIcon} />
              </button>
            }
          />
          {errors.externalAddress?.message && (
            <div
              aria-label={
                errors.externalAddress.message.includes("required")
                  ? "SEND_CRYPTOADDRESSALERT_LABEL"
                  : "SEND_CRYPTOADDRESSINVALIDALERT_LABEL"
              }
              className="my-2"
            >
              <Message variant="error">{errors.externalAddress?.message}</Message>
            </div>
          )}
          <Input
            ariaLabel="SEND_NOTES"
            className="mt-6"
            placeholder={t("crypto-wallet.send.send-to-recipient.add-note")}
            name="note"
            maxLength={140}
            register={register}
          />
          <div className="inset-x-0 bottom-0 mb-6 mt-8">
            <Button ariaLabel="SEND_PREVIEWTRANSACTION_BUTTON" className="py-4" onClick={handleSubmit(onFormSubmit)}>
              {t("crypto-wallet.send.send-to-recipient.preview-transaction")}
            </Button>
          </div>
        </div>
      </div>
    </LayoutModal>
  );
};

export default SendToRecipient;
