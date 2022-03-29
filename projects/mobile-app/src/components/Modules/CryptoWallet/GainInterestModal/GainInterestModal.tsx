import React, { FC } from "react";
import "./style.scss";
import { IonModal } from "@ionic/react";
import cx from "classnames";
import { closeBankIcon } from "assets/icons";
import { AdvertisementList } from "../Portfolio/AdvertisementList";
import { ScrollableView } from "../../../ScrollableView/ScrollableView";
import { mapAssetsToAdvertisementItems } from "utils/hooks/useAssetInterestRates";
import { useGetMyAssetInterestRatesQuery } from "generated/graphql";
import useRefreshFetch from "utils/hooks/useRefreshFetch";
import { IconsType } from "assets/icons2";

export type ModalVariant = "default" | "secondary" | "secondary-faded";

export interface ActionModalProps {
  title?: string;
  background?: string;
  setShowGainInterestModal: (showModal: boolean) => void;
  showGainInterestModal: boolean;
  showCloseButton?: boolean;
  isRefreshing?: boolean;
  infoModal?: boolean;
  modalData?: string[];
  infoModalImage?: IconsType;
  infoModalTitle?: string;
  infoModalDescription?: string;
}

export const GainInterestModal: FC<ActionModalProps> = ({
  setShowGainInterestModal,
  showGainInterestModal,
  title,
  background = "bg-unauthed",
  showCloseButton,
  isRefreshing = false,
  infoModal = false,
  modalData,
  infoModalImage,
  infoModalTitle,
  infoModalDescription,
}) => {
  const { data, refetch } = useGetMyAssetInterestRatesQuery({
    fetchPolicy: "cache-and-network",
  });

  const items = mapAssetsToAdvertisementItems(data?.myAssetInterestRates);

  useRefreshFetch(isRefreshing, refetch);

  const handleClose = () => {
    setShowGainInterestModal(false);
  };

  return (
    <IonModal
      isOpen={showGainInterestModal}
      backdropDismiss
      showBackdrop
      onDidDismiss={handleClose}
      cssClass="gain-interest-modal">
      <div className="flex items-center h-full w-full pointer-events-auto px-6">
        <div className={`rounded-2xl overflow-hidden relative w-full ${background}`}>
          <div className={cx("flex flex-col w-full pt-0", { "pt-2": showCloseButton, "pt-6": !showCloseButton })}>
            {!!title && <h1 className="flex items-center m-auto text-xl font-medium">{title}</h1>}
            <ScrollableView>
              <div className="mt-6 mx-4">
                {showCloseButton && (
                  <div className="absolute right-2 top-4">
                    <button
                      aria-label="EARNINTEREST_CLOSE_BUTTON"
                      type="button"
                      className="text-blue text-lg tracking-tight font-medium p-2"
                      onClick={handleClose}>
                      <img src={closeBankIcon} alt="close" />
                    </button>
                  </div>
                )}
                <AdvertisementList
                  hasGain={false}
                  isLoading={false}
                  showGainingPopUp
                  interestAssets={{}}
                  ariaLabel="EARNINTEREST"
                  items={items}
                  infoModal={infoModal}
                  modalData={modalData}
                  infoModalImage={infoModalImage}
                  infoModalTitle={infoModalTitle}
                  infoModalDescription={infoModalDescription}
                  onClick={handleClose}
                />
              </div>
            </ScrollableView>
          </div>
        </div>
      </div>
    </IonModal>
  );
};

export default GainInterestModal;
