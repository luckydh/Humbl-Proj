import { IonContent } from "@ionic/react";
import Button from "components/Button/Button";
import { OfferItemSkeleton } from "components/Offers/OfferItem";
import { useGetBlocksQuery } from "generated/graphql";

import React from "react";
import { useTranslation } from "react-i18next";

type BlocksItemProps = {
  name: string;
  percentage: number;
  link: string;
};
const BlocksItems: React.FC<BlocksItemProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-center p-2 my-5">
      <div className="text-left my-1">
        <div className="text-white pb-2 text-3xl font-medium uppercase leading-4 my-2">{props.name}</div>
        <Button
          size="small"
          className="inline-block max-w-max px-7 mb-3"
          onClick={() => { window.location.href = props.link as string }}>
          {t("blocks.buy-now")}
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <button
            className="rounded-full h-24 w-24 bg-blue-dark p-1 border-4 border-solid border-white text-white"
            onClick={() => { window.location.href = props.link as string }}>
            <div className="text-lg leading-5 font-semibold mt-2">{props.percentage.toFixed(0)}%</div>
            <div className="text-xs leading-4 font-extralight">6M</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const Blocks: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useGetBlocksQuery({
    fetchPolicy: "cache-and-network",
  });
  return (
    <IonContent forceOverscroll={false}>
      <div className="pb-6">
        <div className="text-white text-base text-center mt-8 mb-6 mx-6">{t("pages.offers.etx-description")}</div>
        <ul>
          {loading && (
            <>
              <li>
                <OfferItemSkeleton />
              </li>
              <li>
                <OfferItemSkeleton />
              </li>
              <li>
                <OfferItemSkeleton />
              </li>
            </>
          )}
          {(error || (!loading && !data)) && (
            <div className="text-center my-12 border-2 border-white p-6 rounded-xl">
              {t("pages.offers.no-offers-available")}
            </div>
          )}
          {!loading &&
            data?.getBlocks?.blocks?.map((card, index) => (
                <li key={index}>
                  <BlocksItems name={card.name!} link={card.link!} percentage={card.sixMonth!} />
                </li>
              ))}
        </ul>
      </div>
    </IonContent>
  );
};
export default Blocks;
