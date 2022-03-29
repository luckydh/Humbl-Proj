import React, { useState, useEffect } from "react";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import "./style.scss";
import { Button } from "components/Button/Button";
import { CopyIcon } from "assets/icons";
import shareImage from "assets/images/share.png";
import { Share } from "@capacitor/share";
import { Clipboard } from "@capacitor/clipboard";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { NetworkStatus } from "@apollo/client";
import { useGetMyAssetAddressQuery, QrType } from "generated/graphql";
import { Loading } from "components/Loading";
import { useHistory, useLocation } from "react-router";

interface RouteParams {
  cryptoId: string;
}

export const Receive: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { cryptoId } = useParams<RouteParams>();
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [assetAddress, setAssetAddress] = useState<QrType>({});
  const [startAddressPart, setStartAddressPart] = useState("");
  const [endAddressPart, setEndAddressPart] = useState("");
  const location = useLocation();

  useEffect(() => {
    trackEvent(EVENTS.RECEIVE_CRYPTO, {
      screenName: "Receive",
      pathName: location.pathname,
      assetName: cryptoId,
    });
  }, [cryptoId, location.pathname]);

  const onShare = async () => {
    await Share.share({
      text: assetAddress?.code,
    });
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Share Crypto Address",
      screenName: "Receive",
      type: "Receive",
      pathName: window.location.pathname,
    });
  };

  const handleBackToWallet = () => {
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Back To Wallet",
      pathName: window.location.pathname,
    });
    history.go(-2);
  };

  const writeToClipboard = async () => {
    await Clipboard.write({
      string: assetAddress?.code,
    });
    setIsCopied(true);
    trackEvent(EVENTS.BUTTON_CLICK, {
      action: "Copy Crypto Address",
      screenName: "Receive",
      type: "Receive",
      pathName: window.location.pathname,
    });
  };

  const { data, networkStatus } = useGetMyAssetAddressQuery({
    fetchPolicy: "network-only",
    variables: {
      asset: cryptoId,
    },
  });

  useEffect(() => {
    function fetchNewsData() {
      const myAssetAddress = data?.myAssetAddress;
      if (networkStatus === NetworkStatus.ready && myAssetAddress) {
        setAssetAddress(myAssetAddress);
        if (myAssetAddress.code) {
          setStartAddressPart(myAssetAddress.code.slice(0, -4));
          setEndAddressPart(myAssetAddress.code.slice(-4));
        }
      }
      setIsLoading(false);
    }
    fetchNewsData();
  }, [data?.myAssetAddress, networkStatus]);

  return (
    <LayoutModal
      ariaLabel="RECEIVE"
      title={`${t("crypto-wallet.receive.receive")} ${cryptoId?.toUpperCase()}`}
      horizontalPadding={false}>
      {isLoading ? (
        <div className="flex justify-center pt-24">
          <Loading loading />
        </div>
      ) : (
        <>
          <p aria-label="RECEIVE_SHARETITLE_LABEL" className="text-xl font-bold text-center">
            {t("crypto-wallet.receive.share.your.code")}
          </p>
          <p aria-label="RECEIVE_SHAREBODY_LABEL" className="text-base text-center leading-light mt-1.5 mb-6 px-6">
            {t("crypto-wallet.receive.let-others-to-scan")}
          </p>
          <img
            aria-label="RECEIVE_QRCODE_IMAGE"
            className="w-48 h-48 border p-3 m-auto"
            alt={`HUMBL -${cryptoId} @ QR Code}`}
            src={assetAddress.image}
          />
          <h1 className="flex-row flex mt-7 mb-7 line-separator">{t("crypto-wallet.receive.or")}</h1>
          <p aria-label="RECEIVE_SHARECURRENCYTITLE_LABEL" className="text-xl font-bold text-center">{`${t(
            "crypto-wallet.receive.share"
          )} ${t("crypto-wallet.receive.your")} ${cryptoId?.toUpperCase()} ${t("crypto-wallet.receive.address")}`}</p>
          <p aria-label="RECEIVE_SHARECURRENCYBODY_LABEL" className="text-base text-center leading-light mt-1.5 mb-6">
            {t("crypto-wallet.receive.copy-your-address-to-share")}
          </p>
          <div className="px-6">
            <div className="flex flex-row">
              <div className="border rounded-lg bg-blue-lightest px-3 pt-3" style={{ width: "60%" }}>
                <p
                  aria-label="RECEIVE_YOURCURRENCY_LABEL"
                  className="text-xs font-semibold text-blue-dark opacity-75 capitalize">
                  {`${t("crypto-wallet.receive.your")} ${cryptoId?.toUpperCase()} ${t(
                    "crypto-wallet.receive.address"
                  )}`}
                </p>
                <p aria-label="RECEIVE_YOURCURRENCYVALUE_LABEL" className="text-lg font-semibold text-blue-dark flex">
                  <span className="truncate">{startAddressPart}</span>
                  <span>{endAddressPart}</span>
                </p>
              </div>
              <Button
                ariaLabel={isCopied ? "RECEIVE_COPIED_BUTTON" : "RECEIVE_COPY_BUTTON"}
                size="small"
                className="ml-1.5"
                style={{ width: "20%" }}
                onClick={writeToClipboard}>
                <div className="flex flex-col items-center">
                  <img src={CopyIcon} alt="Copy Icon" className="img-responsive" />
                  <span className="text-sm font-semibold">
                    {isCopied ? t("crypto-wallet.receive.copied") : t("crypto-wallet.receive.copy")}
                  </span>
                </div>
              </Button>
              <Button
                size="small"
                ariaLabel="RECEIVE_SHARE_BUTTON"
                className="ml-1.5 items-center justify-items-center flex"
                onClick={onShare}
                style={{ width: "20%" }}>
                <div className="flex flex-col items-center">
                  <img src={shareImage} alt="share" className="w-3.5 h-4" />
                  <span className="text-sm font-semibold">{t("crypto-wallet.receive.share")}</span>
                </div>
              </Button>
            </div>
            <div className="flex mt-8 mb-4">
              <Button
                ariaLabel="RECEIVE_BACKTOWALLET_BUTTON"
                onClick={() => handleBackToWallet()}
                className="self-auto justify-self-auto rounded-lg">
                <span className="text-lg">{t("crypto-wallet.receive.back-to-wallet")}</span>
              </Button>
            </div>
          </div>
        </>
      )}
    </LayoutModal>
  );
};

export default Receive;
