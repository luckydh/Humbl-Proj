import OfferItem, { OfferItemSkeleton } from "components/Offers/OfferItem";
import { useGetMatchingEngineLendersQuery } from "generated/graphql";
import React from "react";
import { useTranslation } from "react-i18next";

const PersonalLoansOffer: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useGetMatchingEngineLendersQuery({
    fetchPolicy: "cache-and-network",
  });
  return (
    <div className="pb-6">
      <div className="text-white text-base text-center mt-8 mb-6 mx-6">{t("pages.matching-engine.lenders")}</div>
      <p className="text-gray-50 text-xs text-center my-6 mx-6">{t("pages.matching-engine.disclaimer-us-only")}</p>
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
          data?.matchingEngineLenders?.map((lender, index) => (
              <li key={index}>
                <OfferItem image={lender.image} link={lender.link} name={lender.name} />
              </li>
            ))}
      </ul>
    </div>
  );
};
export default PersonalLoansOffer;
